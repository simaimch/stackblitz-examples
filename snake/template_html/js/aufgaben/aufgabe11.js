// =====================================================================
//  AUFGABE 11: Eine neue Münze hinlegen
// =====================================================================
//
//  ZIEL
//  Die Funktion "legeNeueMuenze" legt eine neue Münze auf ein zufälliges
//  freies Feld.
//
//  WO WIRD DAS BENUTZT?
//  Du rufst sie in Aufgabe 12 auf, nachdem die Schlange eine Münze
//  gefressen hat. So bleiben immer gleich viele Münzen im Spiel.
//
//  DAS BRAUCHST DU
//  - Die fertige Funktion zufaelligesFreiesFeld() aus "welt.js"
//   . Sie gibt ein freies Feld zurück –
//    oder null, wenn KEIN Feld mehr frei ist.
//  - zustand.muenzen: die Liste aller Münzen
//  - push: hängt ein Element hinten an eine Liste an:
//        liste.push(element);
//  - Den Vergleich mit null: !== null
//
//  WICHTIG
//  Du darfst null nicht in die Münzliste schreiben. Prüfe deshalb, ob
//  wirklich ein Feld gefunden wurde.
//
//  TIPP
//  In "welt.js" verteilt die Funktion neuesSpiel am Anfang die Münzen.
//  Schau dir an, wie sie das macht.
//
//  SO TESTEST DU
//  Schreibe ganz unten in diese Datei:
//      neuesSpiel();
//      console.log(zustand.muenzen.length);
//      legeNeueMuenze();
//      console.log(zustand.muenzen.length);   // eins mehr als vorher
//  Lösche die Tests danach wieder.
// =====================================================================

/**
 * Legt eine neue Münze auf ein zufälliges freies Feld.
 */
function legeNeueMuenze() {
  // TODO
}
