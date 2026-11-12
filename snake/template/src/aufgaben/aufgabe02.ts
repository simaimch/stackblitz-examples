// =====================================================================
//  AUFGABE 2: Das nächste Feld berechnen
// =====================================================================
//
//  ZIEL
//  Die Funktion "naechstesFeld" soll für jede der vier Richtungen das
//  richtige Nachbarfeld liefern. Bisher kann sie nur "rechts".
//
//  WO WIRD DAS BENUTZT?
//  In "spiel.ts" berechnet die Funktion "schritt" in jedem Takt, wohin
//  der Kopf der Schlange als Nächstes kommt:
//      const neuerKopf = naechstesFeld(kopf, zustand.richtung);
//
//  WAS DIE FUNKTION BEKOMMT UND ZURÜCKGIBT
//  - feld:      das Feld, auf dem der Kopf gerade ist, z. B. [7, 10]
//  - richtung:  ein Text: 'hoch', 'runter', 'links' oder 'rechts'
//  - Rückgabe:  ein neues Feld [zeile, spalte]
//
//  DAS BRAUCHST DU
//  - Das Koordinatensystem: Zeile 0 ist OBEN, Spalte 0 ist LINKS.
//    Überlege dir mit einer kleinen Skizze auf Papier:
//        Wie ändern sich Zeile und Spalte, wenn man ein Feld nach oben
//        geht? Nach unten? Nach links?
//  - Bedingungen mit "if": Mit if (...) { ... } prüfst du, welche
//    Richtung gewünscht ist. Texte vergleichst du mit ===.
//  - "return": gibt das Ergebnis zurück und beendet die Funktion.
//  - Ein neues Feld schreibst du als Array mit zwei Zahlen: [ ..., ... ]
//
//  SO GEHST DU VOR
//  1. Schau dir an, wie die Richtung 'rechts' gelöst ist.
//  2. Ergänze darunter die drei anderen Richtungen nach demselben Muster.
//  3. Die letzte Zeile (Kopf bleibt stehen) darf bleiben. Sie wird nur
//     erreicht, wenn die Richtung unbekannt ist.
//
//  SO TESTEST DU
//  Steuern kannst du erst nach Aufgabe 3. Du kannst aber jetzt schon
//  testen: Schreibe ganz unten in diese Datei
//      console.log(naechstesFeld([5, 5], 'hoch'));
//  und schau in die Konsole (unten in StackBlitz). Überlege vorher,
//  welches Ergebnis herauskommen muss. Teste alle vier Richtungen.
//  Lösche die Testzeilen danach wieder.
// =====================================================================

/** Berechnet das Nachbarfeld in einer Richtung. */
export function naechstesFeld(feld: number[], richtung: string): number[] {
  const zeile = feld[0];
  const spalte = feld[1];

  if (richtung === 'rechts') {
    return [zeile, spalte + 1];
  }
  // TODO

  return [zeile, spalte];
}
