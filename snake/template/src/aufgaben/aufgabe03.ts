// =====================================================================
//  AUFGABE 3: Die Schlange steuern
// =====================================================================
//
//  ZIEL
//  Die Schlange soll sich mit allen vier Pfeiltasten (oder durch
//  Wischen) steuern lassen. Bisher funktioniert nur die Taste nach rechts.
//
//  WO WIRD DAS BENUTZT?
//  Die Datei "eingabe.ts" ruft diese Funktionen auf, sobald eine
//  Pfeiltaste gedrückt oder in eine Richtung gewischt wird.
//
//  DAS BRAUCHST DU
//  - zustand.richtung   (string)  aktuelle Richtung der Schlange
//  - zustand.gestartet  (boolean) wird true, sobald es losgeht
//  - zustand.gameOver   (boolean) ist true, wenn das Spiel vorbei ist
//  - "if" und der Vergleich "!==" (ist ungleich)
//  - "return;" beendet eine Funktion sofort
//  - Zuweisung: zustand.richtung = '...';
//
//  WICHTIGE REGEL
//  Die Schlange darf nicht auf der Stelle umdrehen. Wer nach rechts
//  läuft, darf nicht direkt nach links. Sonst beißt sie sich selbst.
//  Überlege für jede Richtung: Welche Richtung ist dazu das Gegenteil?
//
//  SO GEHST DU VOR
//  1. Lies "tasteRechts" Zeile für Zeile und erkläre dir selbst, was
//     jede Zeile tut.
//  2. Schreibe "tasteHoch", "tasteRunter" und "tasteLinks" nach
//     demselben Muster.
//
//  SO TESTEST DU
//  Du kannst die Schlange mit allen vier Pfeiltasten steuern. Sie dreht
//  nicht auf der Stelle um. Jede Pfeiltaste startet das Spiel.
//  Achtung: Die Schlange läuft noch durch Mauern. Das ändert sich in
//  Aufgabe 4.
//
//  (Funktioniert die Richtung falsch herum? Dann liegt der Fehler
//  wahrscheinlich in Aufgabe 2.)
// =====================================================================

import { zustand } from '../zustand';

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
  if (zustand.gameOver) {
    return;
  }
  // Umdrehen auf der Stelle ist nicht erlaubt.
  if (zustand.richtung !== 'links') {
    zustand.richtung = 'rechts';
  }
  zustand.gestartet = true;
}
