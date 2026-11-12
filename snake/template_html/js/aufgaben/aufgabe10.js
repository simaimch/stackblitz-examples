// =====================================================================
//  AUFGABE 10: Welche Münze liegt hier?
// =====================================================================
//
//  ZIEL
//  Die Funktion "muenzIndex" sucht in der Liste zustand.muenzen nach
//  einer Münze auf dem Feld "feld".
//  - Liegt dort eine Münze, gibt sie deren POSITION in der Liste zurück
//    (0 für die erste Münze, 1 für die zweite, ...).
//  - Liegt dort keine Münze, gibt sie -1 zurück.
//
//  WARUM NICHT EINFACH istMuenze AUS AUFGABE 8?
//  istMuenze sagt nur JA oder NEIN. Um eine Münze aus der Liste zu
//  entfernen (Aufgabe 12), musst du aber wissen, WO in der Liste sie
//  steht.
//
//  DAS BRAUCHST DU
//  - zustand.muenzen: Liste von Feldern, zustand.muenzen[i] ist die
//    Münze Nummer i
//  - zustand.muenzen.length: Anzahl der Münzen
//  - gleichesFeld(a, b) aus Aufgabe 6
//  - Eine Zählschleife: for (let i = 0; ...; i++) { ... }
//    Hier brauchst du die Zählschleife und NICHT for-of, weil du die
//    Nummer i zurückgeben willst.
//  - return mit einer Zahl
//
//  ÜBERLEGE
//  Wann gibst du -1 zurück: mitten in der Schleife oder erst danach?
//  (Vergleiche mit Aufgabe 8.)
//
//  SO TESTEST DU
//  Schreibe ganz unten in diese Datei:
//      neuesSpiel();
//      console.log(zustand.muenzen);                    // alle Münzen
//      console.log(muenzIndex(zustand.muenzen[0]));     // 0
//      console.log(muenzIndex(zustand.muenzen[zustand.muenzen.length - 1]));
//                                                       // letzte Nummer
//      console.log(muenzIndex([0, 0]));                 // -1
//  Lösche die Tests danach wieder.
// =====================================================================

/**
 * Position der Münze auf dem Feld in zustand.muenzen, oder -1.
 * @param {number[]} feld
 * @returns {number}
 */
function muenzIndex(feld) {
  // TODO
  return -1;
}
