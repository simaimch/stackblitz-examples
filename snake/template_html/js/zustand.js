// =====================================================================
//  SPIELZUSTAND – hier musst du nichts ändern.
//
//  Alle Werte, die sich während des Spiels ändern, stehen in EINEM
//  Objekt namens "zustand". So können alle Aufgaben-Dateien sie lesen
//  und ändern, zum Beispiel:
//
//      zustand.punkte = zustand.punkte + 1;
//      zustand.richtung = 'links';
//      const kopf = zustand.schlange[0];
//
//  Ein Feld ist ein Array mit zwei Zahlen: [zeile, spalte]
//  Zeile 0 ist oben, Spalte 0 ist links.
// =====================================================================

const zustand = {
  /** Erster Eintrag = Kopf (rot), alle weiteren = Schwanz. Typ: number[][] */
  schlange: [],
  /** mauern[zeile][spalte]: 1 = Mauer, 0 = frei. Typ: number[][] */
  mauern: [],
  /** Liste der Felder, auf denen eine Münze liegt. Typ: number[][] */
  muenzen: [],
  /** 'hoch', 'runter', 'links' oder 'rechts'. Typ: string */
  richtung: 'rechts',
  /** Wurde schon eine Pfeiltaste gedrückt? Typ: boolean */
  gestartet: false,
  /** Ist das Spiel vorbei? Typ: boolean */
  gameOver: false,
  /** Anzahl gesammelter Münzen. Typ: number */
  punkte: 0,
};
