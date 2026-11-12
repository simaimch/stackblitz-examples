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

export const zustand: {
  /** Erster Eintrag = Kopf (rot), alle weiteren = Schwanz */
  schlange: number[][];
  /** mauern[zeile][spalte]: 1 = Mauer, 0 = frei */
  mauern: number[][];
  /** Liste der Felder, auf denen eine Münze liegt */
  muenzen: number[][];
  /** 'hoch', 'runter', 'links' oder 'rechts' */
  richtung: string;
  /** Wurde schon eine Pfeiltaste gedrückt? */
  gestartet: boolean;
  /** Ist das Spiel vorbei? */
  gameOver: boolean;
  /** Anzahl gesammelter Münzen */
  punkte: number;
} = {
  schlange: [],
  mauern: [],
  muenzen: [],
  richtung: 'rechts',
  gestartet: false,
  gameOver: false,
  punkte: 0,
};
