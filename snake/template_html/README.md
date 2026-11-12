# Snake 3D – Aufgaben (JavaScript-Fassung)

## Starten
`index.html` im Browser öffnen (Doppelklick genügt, ein Webserver ist nicht nötig).
Three.js wird aus dem Internet (CDN) geladen – dafür braucht der Rechner eine Internetverbindung.

Nach jeder Änderung: Datei speichern und die Seite im Browser neu laden (F5).
Fehler und Ausgaben von `console.log` siehst du in der Browser-Konsole (F12, Reiter „Konsole“).

## Aufgaben
Bearbeite die Dateien in **`js/aufgaben/`** der Reihe nach: `aufgabe01.js` bis `aufgabe12.js`.
Oben in jeder Datei steht, was zu tun ist, was du dafür brauchst und wie du testest.

| Aufgabe | Thema |
|---|---|
| 01 | Einstellungen ausprobieren |
| 02 | Das nächste Feld berechnen |
| 03 | Die Schlange steuern |
| 04 | Mauern |
| 05 | Neustart |
| 06 | Zwei Felder vergleichen |
| 07 | Liegt ein Feld in der Spielwelt? |
| 08 | Liegt dort die Schlange / eine Münze? |
| 09 | In den eigenen Schwanz beißen |
| 10 | Welche Münze liegt hier? |
| 11 | Eine neue Münze hinlegen |
| 12 | Münzen einsammeln |

## Fertige Dateien (lesen erlaubt, ändern nicht nötig)
- `js/zustand.js` – alle Werte, die sich im Spiel ändern (`zustand.schlange`, `zustand.punkte`, …)
- `js/welt.js` – fertige Hilfsfunktionen und `neuesSpiel()`
- `js/spiel.js` – ein Spielschritt; zeigt, wann deine Funktionen aufgerufen werden
- `js/darstellung.js`, `js/eingabe.js`, `js/main.js` – Grafik, Steuerung, Spielschleife
