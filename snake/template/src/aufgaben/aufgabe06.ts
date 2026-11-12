// =====================================================================
//  AUFGABE 6: Zwei Felder vergleichen
// =====================================================================
//
//  ZIEL
//  Die Funktion "gleichesFeld" soll true zurückgeben, wenn die Felder a
//  und b dieselbe Stelle in der Spielwelt sind, sonst false.
//
//  WO WIRD DAS BENUTZT?
//  Fast überall: Um zu erkennen, ob der Kopf auf einer Münze oder auf
//  dem eigenen Schwanz landet, müssen Felder verglichen werden.
//  Die Aufgaben 8, 9 und 10 brauchen diese Funktion.
//
//  ACHTUNG – DIE FALLE
//      [3, 4] === [3, 4]    ergibt  false !
//  Bei Arrays prüft === nur, ob es DASSELBE Array ist, nicht ob der
//  Inhalt gleich ist. Du musst die Felder deshalb Zahl für Zahl
//  vergleichen.
//
//  DAS BRAUCHST DU
//  - Zugriff auf ein Element eines Arrays: a[0] ist das erste Element
//    (die Zeile), a[1] das zweite (die Spalte).
//  - Vergleich zweier Zahlen mit ===
//  - Die Verknüpfung && ("und"): Der Ausdruck ist nur true, wenn
//    beide Seiten true sind.
//  - return mit einem Wahrheitswert (true oder false)
//
//  SO GEHST DU VOR
//  Überlege: Wann sind zwei Felder gleich? Was muss alles übereinstimmen?
//  Schreibe das als Bedingung und gib das Ergebnis zurück.
//
//  SO TESTEST DU
//  Schreibe ganz unten in diese Datei:
//      console.log(gleichesFeld([3, 4], [3, 4]));   // muss true sein
//      console.log(gleichesFeld([3, 4], [4, 3]));   // muss false sein
//      console.log(gleichesFeld([3, 4], [3, 5]));   // muss false sein
//  Schau in die Konsole. Lösche die Testzeilen danach wieder.
// =====================================================================

/** Sind a und b dasselbe Feld? */
export function gleichesFeld(a: number[], b: number[]): boolean {
  // TODO
  return false;
}
