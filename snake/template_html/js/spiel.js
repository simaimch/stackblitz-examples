// =====================================================================
//  SPIELSCHRITT – hier musst du nichts ändern.
//
//  Diese Funktion wird in jedem Takt aufgerufen. Sie benutzt die
//  Funktionen aus deinen Aufgaben. Lies sie dir durch, dann verstehst
//  du, wann deine Funktionen aufgerufen werden.
// =====================================================================

/**
 * Ein Spielschritt: Die Schlange bewegt sich um ein Feld.
 */
function schritt() {
  if (!zustand.gestartet || zustand.gameOver) {
    return;
  }

  const kopf = zustand.schlange[0];
  const neuerKopf = naechstesFeld(kopf, zustand.richtung); // Aufgabe 2

  // Außerhalb der Welt?                                      Aufgabe 7
  if (!imSpielfeld(neuerKopf)) {
    zustand.gameOver = true;
    return;
  }

  // Mauer getroffen?                                         Aufgabe 4
  pruefeMauer(neuerKopf);
  if (zustand.gameOver) {
    return;
  }

  // Eigenen Schwanz getroffen?                               Aufgabe 9
  pruefeSchwanz(neuerKopf);
  if (zustand.gameOver) {
    return;
  }

  // Bewegen (und Münzen einsammeln)                          Aufgabe 12
  bewegeSchlange(neuerKopf);
}
