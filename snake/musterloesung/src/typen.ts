/** Ein Feld der Spielwelt: [zeile, spalte]. Zeile 0 ist oben, Spalte 0 ist links. */
export type Feld = [number, number];

export type Richtung = 'hoch' | 'runter' | 'links' | 'rechts';

export interface Spielzustand {
  hoehe: number;
  breite: number;
  /** Erster Eintrag = Kopf, alle weiteren = Schwanz */
  schlange: Feld[];
  /** mauern[zeile][spalte]: 1 = Mauer, 0 = frei */
  mauern: number[][];
  muenzen: Feld[];
  richtung: Richtung;
  /** Gepufferte Eingaben, damit schnelle Tastendrücke nicht verloren gehen */
  eingabePuffer: Richtung[];
  gestartet: boolean;
  gameOver: boolean;
  punkte: number;
}
