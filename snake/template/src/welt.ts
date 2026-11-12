// =====================================================================
//  SPIELWELT – fertige Funktionen. Hier musst du nichts ändern,
//  aber du darfst (und sollst) sie in deinen Aufgaben benutzen.
// =====================================================================

import { hoehe, breite, minMuenzen, maxMuenzen } from './aufgaben/aufgabe01';
import { imSpielfeld } from './aufgaben/aufgabe07';
import { istSchlange, istMuenze } from './aufgaben/aufgabe08';
import { zustand } from './zustand';

/** Zufällige ganze Zahl von min bis max (beide eingeschlossen) */
export function zufallsZahl(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/** Ist das Feld eine Mauer? */
export function istMauer(feld: number[]): boolean {
  if (zustand.mauern[feld[0]][feld[1]] === 1) {
    return true;
  }
  return false;
}

/** Ein Feld ist frei, wenn dort keine Mauer, keine Schlange und keine Münze ist. */
export function istFrei(feld: number[]): boolean {
  if (!imSpielfeld(feld)) {
    return false;
  }
  if (istMauer(feld)) {
    return false;
  }
  if (istSchlange(feld)) {
    return false;
  }
  if (istMuenze(feld)) {
    return false;
  }
  return true;
}

/** Sucht ein zufälliges freies Feld. Gibt null zurück, wenn alles belegt ist. */
export function zufaelligesFreiesFeld(): number[] | null {
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

/** Erzeugt eine leere Spielwelt (überall 0). */
function erzeugeLeereMauerndefinition(): number[][] {
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
  zustand.mauern = erzeugeMauern();

  // Schlange startet in der Mitte und schaut nach rechts.
  const mitteZeile = Math.floor(hoehe / 2);
  const mitteSpalte = Math.floor(breite / 2);
  zustand.schlange = [
    [mitteZeile, mitteSpalte],
    [mitteZeile, mitteSpalte - 1],
    [mitteZeile, mitteSpalte - 2],
  ];

  zustand.richtung = 'rechts';
  zustand.gestartet = false;
  zustand.gameOver = false;
  zustand.punkte = 0;

  // Zufällige Anzahl Münzen verteilen
  zustand.muenzen = [];
  const anzahl = zufallsZahl(minMuenzen, maxMuenzen);
  for (let i = 0; i < anzahl; i++) {
    const feld = zufaelligesFreiesFeld();
    if (feld !== null) {
      zustand.muenzen.push(feld);
    }
  }
}
