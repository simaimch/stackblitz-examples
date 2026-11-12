// =====================================================================
//  AUFGABE 1: Einstellungen ausprobieren
// =====================================================================
//
//  ZIEL
//  Du lernst, was Variablen sind, und siehst, wie ihre Werte das Spiel
//  verändern.
//
//  WAS HIER STEHT
//  Unten findest du fünf Variablen. Jede Variable hat einen Namen und
//  einen Wert. Andere Dateien lesen diese Werte, zum Beispiel baut
//  "welt.js" damit die Spielwelt.
//
//      let name = wert;
//      │   │      └─ der gespeicherte Wert
//      │   └─ der Name, unter dem der Wert gespeichert ist
//      └─ "let" legt eine Variable an
//
//  DAS SOLLST DU TUN
//  1. Ändere "hoehe" und "breite". Speichere, lade die Seite im
//     Browser neu (F5) und schau dir die Spielwelt an. Welche
//     Variable bestimmt die Anzahl der Zeilen, welche die Anzahl der
//     Spalten?
//  2. Ändere "schrittDauerMs". Macht ein größerer oder ein kleinerer
//     Wert die Schlange schneller? Begründe.
//  3. Ändere "minMuenzen" und "maxMuenzen". Starte das Spiel mehrmals
//     neu (Seite neu laden). Was beobachtest du?
//  4. Was passiert, wenn "minMuenzen" größer als "maxMuenzen" ist?
//  5. Stelle zum Schluss Werte ein, mit denen du gut spielen kannst.
//
//  Schreibe deine Antworten als Kommentare unter diese Zeilen:
//
//  1.
//  2.
//  3.
//  4.
//
//  SO TESTEST DU
//  Die Spielwelt hat die Größe, die du eingestellt hast.
// =====================================================================

/** Anzahl der Zeilen der Spielwelt */
let hoehe = 15;
/** Anzahl der Spalten der Spielwelt */
let breite = 20;
/** Zeit zwischen zwei Schritten der Schlange in Millisekunden */
let schrittDauerMs = 150;
/** Kleinste und größte Anzahl an Münzen (zufällig dazwischen) */
let minMuenzen = 1;
let maxMuenzen = 5;
