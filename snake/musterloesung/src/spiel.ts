// Die reine Spiellogik – ohne Grafik und ohne Eingabe.
import type { Feld, Richtung, Spielzustand } from './typen';

interface SpielEinstellungen {
  hoehe: number;
  breite: number;
  minMuenzen: number;
  maxMuenzen: number;
  anzahlHindernisse: number;
}

/** Zufällige ganze Zahl von min bis max (beide eingeschlossen) */
function zufallsZahl(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function gleichesFeld(a: Feld, b: Feld): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

/** Liegt das Feld innerhalb der Spielwelt? */
export function imSpielfeld(z: Spielzustand, feld: Feld): boolean {
  const [zeile, spalte] = feld;
  return zeile >= 0 && zeile < z.hoehe && spalte >= 0 && spalte < z.breite;
}

/** Ein Feld ist frei, wenn dort keine Mauer, keine Schlange und keine Münze ist. */
export function istFrei(z: Spielzustand, feld: Feld): boolean {
  if (!imSpielfeld(z, feld)) return false;
  if (z.mauern[feld[0]][feld[1]] === 1) return false;
  if (z.schlange.some((teil) => gleichesFeld(teil, feld))) return false;
  if (z.muenzen.some((muenze) => gleichesFeld(muenze, feld))) return false;
  return true;
}

/** Sucht ein zufälliges freies Feld. Gibt null zurück, wenn alles belegt ist. */
function zufaelligesFreiesFeld(z: Spielzustand): Feld | null {
  const freie: Feld[] = [];
  for (let zeile = 0; zeile < z.hoehe; zeile++) {
    for (let spalte = 0; spalte < z.breite; spalte++) {
      if (istFrei(z, [zeile, spalte])) freie.push([zeile, spalte]);
    }
  }
  if (freie.length === 0) return null;
  return freie[zufallsZahl(0, freie.length - 1)];
}

/** Erzeugt die Mauern: ein geschlossener Rand und einige zufällige Hindernisse. */
function erzeugeMauern(hoehe: number, breite: number, anzahlHindernisse: number): number[][] {
  const mauern: number[][] = [];
  for (let zeile = 0; zeile < hoehe; zeile++) {
    const reihe: number[] = [];
    for (let spalte = 0; spalte < breite; spalte++) {
      const amRand = zeile === 0 || zeile === hoehe - 1 || spalte === 0 || spalte === breite - 1;
      reihe.push(amRand ? 1 : 0);
    }
    mauern.push(reihe);
  }

  for (let i = 0; i < anzahlHindernisse; i++) {
    const zeile = zufallsZahl(1, hoehe - 2);
    const spalte = zufallsZahl(1, breite - 2);
    mauern[zeile][spalte] = 1;
  }
  return mauern;
}

/** Erstellt einen neuen Spielzustand. */
export function neuesSpiel(e: SpielEinstellungen): Spielzustand {
  if (e.hoehe < 5 || e.breite < 8) {
    throw new Error('Die Spielwelt muss mindestens 5 hoch und 8 breit sein.');
  }

  const mauern = erzeugeMauern(e.hoehe, e.breite, e.anzahlHindernisse);

  // Schlange startet in der Mitte und schaut nach rechts.
  const mitteZeile = Math.floor(e.hoehe / 2);
  const mitteSpalte = Math.floor(e.breite / 2);
  const schlange: Feld[] = [
    [mitteZeile, mitteSpalte],
    [mitteZeile, mitteSpalte - 1],
    [mitteZeile, mitteSpalte - 2],
  ];

  // Startbereich (Schlange + ein paar Felder davor) von Hindernissen befreien
  for (let spalte = mitteSpalte - 2; spalte <= mitteSpalte + 3; spalte++) {
    if (spalte > 0 && spalte < e.breite - 1) mauern[mitteZeile][spalte] = 0;
  }

  const z: Spielzustand = {
    hoehe: e.hoehe,
    breite: e.breite,
    schlange,
    mauern,
    muenzen: [],
    richtung: 'rechts',
    eingabePuffer: [],
    gestartet: false,
    gameOver: false,
    punkte: 0,
  };

  // Zufällige Anzahl Münzen verteilen
  const anzahl = zufallsZahl(e.minMuenzen, e.maxMuenzen);
  for (let i = 0; i < anzahl; i++) {
    const feld = zufaelligesFreiesFeld(z);
    if (feld) z.muenzen.push(feld);
  }

  return z;
}

const GEGENTEIL: Record<Richtung, Richtung> = {
  hoch: 'runter',
  runter: 'hoch',
  links: 'rechts',
  rechts: 'links',
};

/** Nimmt eine neue Richtung entgegen (von Tastatur oder Wischgeste). */
export function richtungEingeben(z: Spielzustand, neu: Richtung): void {
  // Vergleich mit der zuletzt gewünschten Richtung
  const letzte = z.eingabePuffer.length > 0 ? z.eingabePuffer[z.eingabePuffer.length - 1] : z.richtung;

  // Umdrehen auf der Stelle ist nicht erlaubt, doppelte Eingaben sind unnötig.
  if (neu === letzte || neu === GEGENTEIL[letzte]) return;
  if (z.eingabePuffer.length < 3) z.eingabePuffer.push(neu);
}

/** Berechnet das Nachbarfeld in einer Richtung. */
function naechstesFeld(feld: Feld, richtung: Richtung): Feld {
  const [zeile, spalte] = feld;
  switch (richtung) {
    case 'hoch':
      return [zeile - 1, spalte];
    case 'runter':
      return [zeile + 1, spalte];
    case 'links':
      return [zeile, spalte - 1];
    case 'rechts':
      return [zeile, spalte + 1];
  }
}

/** Führt einen Spielschritt aus: Die Schlange bewegt sich um ein Feld. */
export function schritt(z: Spielzustand): void {
  if (!z.gestartet || z.gameOver) return;

  const eingabe = z.eingabePuffer.shift();
  if (eingabe) z.richtung = eingabe;

  const kopf = z.schlange[0];
  const neuerKopf = naechstesFeld(kopf, z.richtung);

  // Außerhalb der Welt? (Nur möglich, wenn der Rand keine Mauer ist.)
  if (!imSpielfeld(z, neuerKopf)) {
    z.gameOver = true;
    return;
  }

  // Mauer getroffen?
  if (z.mauern[neuerKopf[0]][neuerKopf[1]] === 1) {
    z.gameOver = true;
    return;
  }

  const muenzIndex = z.muenzen.findIndex((m) => gleichesFeld(m, neuerKopf));
  const waechst = muenzIndex >= 0;

  // Eigenen Schwanz getroffen? Das letzte Schwanzstück bewegt sich weiter,
  // außer die Schlange wächst gerade – dann bleibt es liegen.
  const zuPruefen = waechst ? z.schlange : z.schlange.slice(0, -1);
  if (zuPruefen.some((teil) => gleichesFeld(teil, neuerKopf))) {
    z.gameOver = true;
    return;
  }

  // Bewegen: neuen Kopf vorne anfügen ...
  z.schlange.unshift(neuerKopf);

  if (waechst) {
    // ... Münze entfernen, Punkte zählen, neue Münze auf ein freies Feld legen
    z.muenzen.splice(muenzIndex, 1);
    z.punkte++;
    const feld = zufaelligesFreiesFeld(z);
    if (feld) z.muenzen.push(feld);
  } else {
    // ... und hinten ein Stück entfernen (Länge bleibt gleich)
    z.schlange.pop();
  }
}
