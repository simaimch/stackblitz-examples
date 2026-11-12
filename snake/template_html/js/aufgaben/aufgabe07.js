// =====================================================================
//  AUFGABE 7: Liegt ein Feld in der Spielwelt?
// =====================================================================
//
//  ZIEL
//  Die Funktion "imSpielfeld" soll true zurückgeben, wenn das Feld
//  innerhalb der Spielwelt liegt, sonst false.
//
//  WO WIRD DAS BENUTZT?
//  - In "spiel.js": Verlässt der Kopf die Welt, ist das Spiel vorbei.
//  - In "welt.js": Die Funktion istFrei prüft damit, ob ein Feld
//    überhaupt existiert, bevor sie im Array zustand.mauern nachschaut.
//
//  DAS BRAUCHST DU
//  - feld[0] ist die ZEILE, feld[1] ist die SPALTE.
//  - hoehe und breite aus Aufgabe 1.
//  - Vergleiche: <  <=  >  >=
//  - Verknüpfungen: && ("und") oder || ("oder")
//
//  ÜBERLEGE VORHER (am besten mit Skizze)
//  - Welche Zeilennummern gibt es bei hoehe = 15? Was ist die kleinste,
//    was die größte?
//  - Welche Spaltennummern gibt es bei breite = 20?
//  - Ein Feld kann auf VIER Arten außerhalb liegen: zu weit oben,
//    zu weit unten, zu weit links, zu weit rechts.
//  - Gehört die Zeile zu "hoehe" oder zu "breite"? Verwechsle das nicht!
//
//  TIPP
//  Speichere feld[0] und feld[1] zuerst in Variablen mit sprechenden
//  Namen (wie in Aufgabe 2). Dann siehst du sofort, was du vergleichst.
//
//  SO TESTEST DU
//  Schreibe ganz unten in diese Datei und schau in die Konsole:
//      console.log(imSpielfeld([0, 0]));           // true
//      console.log(imSpielfeld([-1, 0]));          // false
//      console.log(imSpielfeld([0, -1]));          // false
//      console.log(imSpielfeld([hoehe, 0]));       // false
//      console.log(imSpielfeld([0, breite]));      // false
//      console.log(imSpielfeld([hoehe - 1, breite - 1]));  // true
//  Teste auch mit hoehe und breite, die verschieden groß sind!
//  Lösche die Testzeilen danach wieder.
// =====================================================================

/**
 * Liegt das Feld innerhalb der Spielwelt?
 * @param {number[]} feld
 * @returns {boolean}
 */
function imSpielfeld(feld) {
  // TODO
  return true;
}
