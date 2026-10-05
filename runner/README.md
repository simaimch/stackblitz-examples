# Svelte Runner

Minimaler Endless-Runner im Stil von Subway Surfers: Svelte 5, TypeScript, Vite, three.js.

```bash
npm install
npm run dev
```

## Steuerung

- **Tastatur:** ← → bzw. A/D wechseln die Spur, ↑ / W / Leertaste springen, Leertaste/Enter startet.
- **Touch/Maus:** nach links/rechts wischen = Spur wechseln, nach oben wischen = springen, Tippen = Start.

## Aufbau

- `src/game/Game.ts` – Spiellogik und three.js-Szene (kennt Svelte nicht)
- `src/App.svelte` – Eingabe (Tastatur, Wischen) und Anzeige (Punkte, Start/Game-Over)

Die Figur steht bei `z = 0`, die Welt bewegt sich auf die Kamera zu. Alle Stellschrauben
(Tempo, Sprunghöhe, Hindernis-Häufigkeit …) stehen als Konstanten oben in `Game.ts`.

## Ideen zum Weiterbauen

1. Ducken/Rutschen unter hohen Hindernissen
2. Verschiedene Hindernis-Typen (niedrig = überspringen, hoch = ausweichen)
3. Highscore in `localStorage` speichern
4. Eigene 3D-Modelle per `GLTFLoader`, Soundeffekte
5. Power-ups (Magnet, Schild, Doppelpunkte)
