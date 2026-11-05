// =====================================================================
//  SNAKE – Spiellogik
//  Diese Datei bearbeitest du. Grafik und Steuerung sind schon fertig.
//
//  Ein Feld ist ein Array mit zwei Zahlen: [zeile, spalte]
//  Zeile 0 ist oben, Spalte 0 ist links.
// =====================================================================

// ---------------------------------------------------------------------
//  Einstellungen
// ---------------------------------------------------------------------

/** Anzahl der Zeilen der Spielwelt */
export let hoehe = 15;
/** Anzahl der Spalten der Spielwelt */
export let breite = 20;
/** Zeit zwischen zwei Schritten der Schlange in Millisekunden */
export let schrittDauerMs = 150;
/** Kleinste und größte Anzahl an Münzen (zufällig dazwischen) */
export let minMuenzen = 1;
export let maxMuenzen = 5;

// ---------------------------------------------------------------------
//  Spielzustand
// ---------------------------------------------------------------------

/** Erster Eintrag = Kopf (rot), alle weiteren = Schwanz */
export let schlange: number[][] = [];
/** mauern[zeile][spalte]: 1 = Mauer, 0 = frei */
export let mauern: number[][] = [];
export let muenzen: number[][] = [];
/** 'hoch', 'runter', 'links' oder 'rechts' */
export let richtung = 'rechts';
export let gestartet = false;
export let gameOver = false;
export let punkte = 0;

// ---------------------------------------------------------------------
//  Hilfsfunktionen
// ---------------------------------------------------------------------

/** Zufällige ganze Zahl von min bis max (beide eingeschlossen) */
function zufallsZahl(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/** Sind a und b dasselbe Feld? */
function gleichesFeld(a: number[], b: number[]): boolean {
  // TODO
  return false;
}

/** Liegt das Feld innerhalb der Spielwelt? */
function imSpielfeld(feld: number[]): boolean {
  // TODO
  return true;
}

/** Ist das Feld eine Mauer? */
function istMauer(feld: number[]): boolean {
  if (mauern[feld[0]][feld[1]] === 1) {
    return true;
  }
  return false;
}
/** Ist das Feld Teil der Schlange? */
function istSchlange(feld: number[]): boolean{
  for (const teil of schlange) {
    //TODO
  }
  return false;
}

/** Liegt auf dem Feld eine Münze? */
function istMuenze(feld: number[]): boolean {
  for (const muenze of muenzen) {
    //TODO
  }
  return false;
}

/** Ein Feld ist frei, wenn dort keine Mauer, keine Schlange und keine Münze ist. */
function istFrei(feld: number[]): boolean {
  if (!imSpielfeld(feld)) {
    return false;
  }
  if (istMauer(feld)){
    return false;
  }
  if (istSchlange(feld)){
    return false;
  }
  if (istMuenze(feld)) {
    return false;
  }
  
  
  return true;
}

/** Sucht ein zufälliges freies Feld. Gibt null zurück, wenn alles belegt ist. */
function zufaelligesFreiesFeld(): number[] | null {
  const freieFelder: number[][] = [];
  for (let zeile = 0; zeile < hoehe; zeile++) {
    for (let spalte = 0; spalte < breite; spalte++) {
      if (istFrei([zeile, spalte])) {
        freieFelder.push([zeile, spalte]);
      }
    }
  }
  if (freieFelder.length === 0) {
    return null;
  }
  return freieFelder[zufallsZahl(0, freieFelder.length - 1)];
}

// ---------------------------------------------------------------------
//  Spielwelt aufbauen
// ---------------------------------------------------------------------

/** Setzt am Rand der Spielwelt überall eine Mauer. */
function erzeugeRand(mauern: number[][]): number[][] {
  for (let zeile = 0; zeile < hoehe; zeile++) {
    for (let spalte = 0; spalte < breite; spalte++) {
      if (zeile === 0 || zeile === hoehe - 1 || spalte === 0 || spalte === breite - 1) {
        mauern[zeile][spalte] = 1;
      }
    }
  }
  return mauern;
}

/** Erzeugt eine leere Spielwelt. */
function erzeugeLeereMauerndefinition(): number[][]{
  const neueMauern: number[][] = [];
  for (let zeile = 0; zeile < hoehe; zeile++) {
    const reihe: number[] = [];
    for (let spalte = 0; spalte < breite; spalte++) {
      reihe.push(0);
    }
    neueMauern.push(reihe);
  }
  return neueMauern;
}

/** Erzeugt eine leere Spielwelt und baut dann die Mauern. */
function erzeugeMauern(): number[][] {
  const leeresFeld = erzeugeLeereMauerndefinition();

  const feldMitRand = erzeugeRand(leeresFeld);

  return feldMitRand;
}

/** Setzt alles auf Anfang. */
export function neuesSpiel(): void {
  mauern = erzeugeMauern();

  // Schlange startet in der Mitte und schaut nach rechts.
  const mitteZeile = Math.floor(hoehe / 2);
  const mitteSpalte = Math.floor(breite / 2);
  schlange = [
    [mitteZeile, mitteSpalte],
    [mitteZeile, mitteSpalte - 1],
    [mitteZeile, mitteSpalte - 2],
  ];

  richtung = 'rechts';
  gestartet = false;
  gameOver = false;
  punkte = 0;

  // Zufällige Anzahl Münzen verteilen
  muenzen = [];
  const anzahl = zufallsZahl(minMuenzen, maxMuenzen);
  for (let i = 0; i < anzahl; i++) {
    const feld = zufaelligesFreiesFeld();
    if (feld !== null) {
      muenzen.push(feld);
    }
  }
}

// ---------------------------------------------------------------------
//  Eingabe: Pfeiltasten (oder Wischen) und Leertaste (oder Tippen)
// ---------------------------------------------------------------------

export function tasteHoch(): void {
  // TODO
}

export function tasteRunter(): void {
  // TODO
}

export function tasteLinks(): void {
  // TODO
}

export function tasteRechts(): void {
  if (gameOver) {
    return;
  }
  // Umdrehen auf der Stelle ist nicht erlaubt.
  if (richtung !== 'links') {
    richtung = 'rechts';
  }
  gestartet = true;
}

export function tasteLeertaste(): void {
  // TODO
}

// ---------------------------------------------------------------------
//  Bewegung
// ---------------------------------------------------------------------

/** Berechnet das Nachbarfeld in einer Richtung. */
function naechstesFeld(feld: number[], richtung: string): number[] {
  const zeile = feld[0];
  const spalte = feld[1];

  if (richtung === 'rechts') {
    return [zeile, spalte + 1];
  }
  // TODO

  return [zeile, spalte];
}

/** Ein Spielschritt: Die Schlange bewegt sich um ein Feld. */
export function schritt(): void {
  if (!gestartet || gameOver) {
    return;
  }

  const kopf = schlange[0];
  const neuerKopf = naechstesFeld(kopf, richtung);

  // Außerhalb der Welt?
  if (!imSpielfeld(neuerKopf)) {
    gameOver = true;
    return;
  }

  // Mauer getroffen?
  //TODO

  // Eigenen Schwanz getroffen? Das letzte Stück zählt nicht,
  // weil es sich in diesem Schritt weiterbewegt.
  //TODO

  // Bewegen: vorne ein neues Stück anfügen, hinten eins entfernen
  schlange.unshift(neuerKopf);
  schlange.pop();
}
