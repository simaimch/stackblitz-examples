// =====================================================================
//  AUFGABE 8: Liegt dort die Schlange? Liegt dort eine Münze?
// =====================================================================
//
//  ZIEL
//  - istSchlange(feld) gibt true zurück, wenn irgendein Teil der
//    Schlange auf dem Feld liegt.
//  - istMuenze(feld) gibt true zurück, wenn auf dem Feld eine Münze
//    liegt.
//
//  WO WIRD DAS BENUTZT?
//  In "welt.js" prüft istFrei damit, ob ein Feld frei ist. So landen
//  neue Münzen nie auf der Schlange oder auf einer anderen Münze.
//
//  DAS BRAUCHST DU
//  - zustand.schlange: Liste von Feldern (number[][])
//  - zustand.muenzen:  Liste von Feldern (number[][])
//  - gleichesFeld(a, b) aus Aufgabe 6
//  - Die for-of-Schleife (steht schon da): Sie nimmt nacheinander jedes
//    Element der Liste. Im ersten Durchlauf ist "teil" der Kopf, im
//    zweiten das nächste Stück usw.
//  - "return" INNERHALB einer Schleife beendet sofort die ganze
//    Funktion – auch wenn die Liste noch nicht fertig durchlaufen ist.
//
//  ÜBERLEGE
//  - Was soll passieren, sobald du ein passendes Teil gefunden hast?
//  - Wann weißt du sicher, dass KEIN Teil passt? Mitten in der
//    Schleife oder erst danach?
//
//  SO GEHST DU VOR
//  1. Schreibe istSchlange.
//  2. istMuenze funktioniert genauso – nur mit einer anderen Liste.
//
//  SO TESTEST DU
//  Schreibe ganz unten in diese Datei:
//      neuesSpiel();
//      console.log(istSchlange(zustand.schlange[0]));   // true (Kopf)
//      console.log(istSchlange(zustand.schlange[2]));   // true
//      console.log(istSchlange([0, 0]));                // false (Ecke)
//      console.log(istMuenze(zustand.muenzen[0]));      // true
//  Lösche die Tests danach wieder.
// =====================================================================

/**
 * Ist das Feld Teil der Schlange?
 * @param {number[]} feld
 * @returns {boolean}
 */
function istSchlange(feld) {
  for (const teil of zustand.schlange) {
    // TODO
  }
  return false;
}

/**
 * Liegt auf dem Feld eine Münze?
 * @param {number[]} feld
 * @returns {boolean}
 */
function istMuenze(feld) {
  for (const muenze of zustand.muenzen) {
    // TODO
  }
  return false;
}
