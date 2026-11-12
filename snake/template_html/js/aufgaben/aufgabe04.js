// =====================================================================
//  AUFGABE 4: Mauern
// =====================================================================
//
//  ZIEL
//  Wenn die Schlange gegen eine Mauer fährt, ist das Spiel vorbei.
//
//  WO WIRD DAS BENUTZT?
//  In "spiel.js" ruft "schritt" diese Funktion auf, BEVOR sich die
//  Schlange bewegt. "neuerKopf" ist das Feld, auf das der Kopf gleich
//  kommen würde. Direkt danach schaut "schritt", ob zustand.gameOver
//  true ist, und hält das Spiel dann an.
//
//  DAS BRAUCHST DU
//  - Die fertige Funktion istMauer(feld) aus "welt.js".
//    Sie gibt true zurück, wenn auf dem Feld eine Mauer steht.
//    (Schau sie dir dort an: Wie liest sie das Array zustand.mauern?)
//  - zustand.gameOver (boolean): Wenn du es auf true setzt, ist das
//    Spiel vorbei.
//  - Eine Bedingung mit "if".
//
//  SO GEHST DU VOR
//  1. Prüfe, ob auf "neuerKopf" eine Mauer steht.
//  2. Wenn ja: Beende das Spiel.
//  3. Wenn nein: Es passiert nichts.
//
//  SO TESTEST DU
//  Fahre mit der Schlange gegen den Rand. Es erscheint "Game Over".
//  Wenn du die Seite neu lädst, kannst du wieder spielen.
// =====================================================================

/**
 * Beendet das Spiel, wenn auf dem Feld eine Mauer steht.
 * @param {number[]} neuerKopf
 */
function pruefeMauer(neuerKopf) {
  // TODO
}
