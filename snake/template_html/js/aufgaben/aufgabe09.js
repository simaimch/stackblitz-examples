// =====================================================================
//  AUFGABE 9: In den eigenen Schwanz beißen
// =====================================================================
//
//  ZIEL
//  Landet der Kopf auf einem Stück des eigenen Schwanzes, ist das Spiel
//  vorbei.
//
//  WO WIRD DAS BENUTZT?
//  In "spiel.js" ruft "schritt" diese Funktion auf, BEVOR sich die
//  Schlange bewegt (genau wie pruefeMauer aus Aufgabe 4).
//  "neuerKopf" ist das Feld, auf das der Kopf gleich kommen würde.
//
//  DAS BRAUCHST DU
//  - zustand.schlange: Liste aller Teile, zustand.schlange[0] ist der Kopf
//  - zustand.schlange.length: Anzahl der Teile
//  - zustand.gameOver: auf true setzen, um das Spiel zu beenden
//  - gleichesFeld(a, b) aus Aufgabe 6
//  - Eine Zählschleife:
//        for (let i = START; BEDINGUNG; i++) { ... }
//    Mit zustand.schlange[i] bekommst du das Teil Nummer i.
//
//  DIE BESONDERHEIT
//  Das LETZTE Stück des Schwanzes zählt nicht! Im selben Schritt, in
//  dem der Kopf nach vorne geht, rückt das letzte Stück weiter und
//  macht sein Feld frei. Der Kopf darf also genau dorthin.
//  Deshalb reicht istSchlange aus Aufgabe 8 hier nicht ganz.
//
//  ÜBERLEGE
//  - Welche Nummer hat das letzte Teil, wenn die Schlange 5 Teile hat?
//  - Wie muss die Bedingung der Schleife lauten, damit das letzte Teil
//    NICHT mehr geprüft wird?
//
//  SO TESTEST DU
//  Eine Schlange aus 3 Teilen kann sich nicht selbst beißen. Verlängere
//  zum Testen die Startschlange in "welt.js" (Funktion neuesSpiel) auf
//  6 Teile und fahre eine enge Kurve (z. B. hoch, links, runter).
//  Danach die Startschlange wieder auf 3 Teile zurücksetzen!
// =====================================================================

/**
 * Beendet das Spiel, wenn der Kopf auf dem eigenen Schwanz landen würde.
 * @param {number[]} neuerKopf
 */
function pruefeSchwanz(neuerKopf) {
  // TODO
}
