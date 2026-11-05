# Snake 3D – Vorlage

Du programmierst nur in **`src/spiel.ts`**. Alle anderen Dateien (Grafik, Steuerung, Spielschleife) sind fertig.

## Was schon geht
- Die Spielwelt mit Mauern am Rand wird gebaut.
- Die Schlange startet in der Mitte. Mit der Pfeiltaste nach rechts läuft sie los.
- Es erscheinen Münzen.
- Trifft die Schlange eine Mauer, ist Game Over.

## Was noch fehlt
Suche in `spiel.ts` nach `TODO` und überlege, was im Spiel noch nicht funktioniert.

## Datenmodell
- Ein Feld ist `[zeile, spalte]`; Zeile 0 ist oben, Spalte 0 ist links.
- `schlange`: Eintrag 0 ist der Kopf (rot), der Rest ist der Schwanz.
- `mauern[zeile][spalte]`: 1 = Mauer, 0 = frei.
- `muenzen`: Liste von Feldern.
