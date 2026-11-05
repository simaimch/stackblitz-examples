# Snake 3D (TypeScript + Three.js)

## Starten
In StackBlitz startet das Projekt automatisch (`npm install` + `npm run dev`).
Lokal: `npm install` und dann `npm run dev`.

## Steuerung
- Pfeiltasten oder Wischen auf dem Touch-Display: Richtung ändern / Spiel starten
- Leertaste, Enter oder Tippen: Neustart nach Game Over

## Dateien
| Datei | Inhalt |
|---|---|
| `src/config.ts` | Einstellungen: Höhe, Breite, Tempo, Anzahl Münzen und Hindernisse |
| `src/typen.ts` | Datentypen (`Feld`, `Richtung`, `Spielzustand`) |
| `src/spiel.ts` | Spiellogik: Bewegen, Münzen, Mauern, Game Over |
| `src/eingabe.ts` | Pfeiltasten und Wischgesten |
| `src/darstellung.ts` | 3D-Grafik mit Three.js |
| `src/main.ts` | Verbindet alles und enthält die Spielschleife |

## Datenmodell
- Ein Feld ist `[zeile, spalte]`; Zeile 0 ist oben, Spalte 0 ist links.
- `schlange: [number, number][]` – Eintrag 0 ist der Kopf (rot), der Rest ist der Schwanz.
- `mauern: number[][]` – `mauern[zeile][spalte]`, 1 = Mauer, 0 = frei.
- `muenzen: [number, number][]`
