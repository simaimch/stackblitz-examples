# Snake 3D – Aufgabenstellung

Am Ende hast du ein spielbares Snake in 3D: Die Schlange lässt sich in alle Richtungen steuern, sammelt Münzen, wächst und stirbt an Mauern und am eigenen Schwanz.

## So fängst du an

1. Öffne das Projekt in StackBlitz. Rechts siehst du das Spiel, links den Code.
2. Du arbeitest **nur in der Datei `src/spiel.ts`**. Grafik und Steuerung sind schon fertig.
3. Stellen, an denen etwas fehlt, sind mit `// TODO` markiert.
4. Speichere mit Strg+S. Das Spiel lädt dann automatisch neu.
5. Bearbeite die Aufgaben der Reihe nach und teste nach jeder Aufgabe.

Wenn etwas nicht klappt: Rote Wellenlinien im Code zeigen Fehler. Fahre mit der Maus darüber, um die Meldung zu lesen. Ausgaben von `console.log(...)` erscheinen unten in der Konsole.

## So funktioniert die Spielwelt

Die Welt ist ein Gitter aus Feldern. Jedes Feld ist ein Array aus zwei Zahlen: `[zeile, spalte]`. Zeile 0 ist oben, Spalte 0 ist links. Das Feld `[2, 5]` liegt also in der dritten Zeile von oben und der sechsten Spalte von links.

Wichtige Variablen in `spiel.ts`:

| Variable | Typ | Bedeutung |
| --- | --- | --- |
| `schlange` | `number[][]` | Liste von Feldern. `schlange[0]` ist der Kopf, der Rest ist der Schwanz. |
| `mauern` | `number[][]` | `mauern[zeile][spalte]` ist 1 bei einer Mauer, sonst 0. |
| `muenzen` | `number[][]` | Liste der Felder, auf denen eine Münze liegt. |
| `richtung` | `string` | `'hoch'`, `'runter'`, `'links'` oder `'rechts'` |
| `gestartet`, `gameOver` | `boolean` | Läuft das Spiel? Ist es vorbei? |
| `punkte` | `number` | Anzahl gesammelter Münzen |

Die Schlange bewegt sich in jedem Schritt um ein Feld:

| Richtung | Zeile | Spalte |
| --- | --- | --- |
| hoch | − 1 | gleich |
| runter | + 1 | gleich |
| links | gleich | − 1 |
| rechts | gleich | + 1 |

## Aufgaben

### Aufgabe 1: Einstellungen ausprobieren

Oben in `spiel.ts` stehen die Einstellungen `hoehe`, `breite`, `schrittDauerMs`, `minMuenzen` und `maxMuenzen`.

- Ändere jede Einstellung einmal und beobachte, was im Spiel passiert.
- Welcher Wert macht die Schlange schneller: ein größerer oder ein kleinerer `schrittDauerMs`? Warum?

**Prüfen:** Die Spielwelt hat die Größe, die du eingestellt hast.

### Aufgabe 2: Die Schlange steuern

Bisher funktioniert nur die Pfeiltaste nach rechts.

- Ergänze in `naechstesFeld` die Richtungen `'hoch'`, `'runter'` und `'links'`. Die Tabelle oben zeigt, wie sich Zeile und Spalte ändern.
- Schreibe `tasteHoch`, `tasteRunter` und `tasteLinks`. Nimm `tasteRechts` als Vorbild.
- Die Schlange darf nicht auf der Stelle umdrehen. Welche Richtung ist jeweils verboten?

**Prüfen:** Mit allen vier Pfeiltasten und mit Wischen lässt sich die Schlange steuern. Sie läuft noch durch Mauern hindurch – das ändert sich in Aufgabe 3.

### Aufgabe 3: Mauern

In `schritt` fehlt die Prüfung, ob der neue Kopf auf einer Mauer landet.

- Nutze die fertige Funktion `istMauer`.
- Bei einer Mauer ist das Spiel vorbei: Setze `gameOver` auf `true` und beende die Funktion mit `return`. Wie das geht, siehst du eine Prüfung weiter oben.

**Prüfen:** Wenn die Schlange gegen den Rand fährt, erscheint „Game Over“.

### Aufgabe 4: Neustart

- Schreibe `tasteLeertaste`: Wenn das Spiel vorbei ist, soll ein neues Spiel beginnen. Dafür gibt es schon eine Funktion.

**Prüfen:** Nach „Game Over“ startet die Leertaste (oder Tippen) ein neues Spiel. Während des Spiels passiert nichts.

### Aufgabe 5: Felder vergleichen

- Schreibe `gleichesFeld(a, b)`. Sie gibt `true` zurück, wenn beide Felder in Zeile **und** Spalte übereinstimmen.
- Schreibe `imSpielfeld(feld)`. Sie gibt `true` zurück, wenn Zeile und Spalte innerhalb der Spielwelt liegen.

**Achtung:** `a === b` funktioniert bei Arrays nicht. Schau dazu ins Cheat-Sheet.

**Prüfen:** Schreibe ganz unten in `spiel.ts` einige Tests und schau in die Konsole. Lösche sie danach wieder.

```ts
console.log(gleichesFeld([3, 4], [3, 4])); // true
console.log(gleichesFeld([3, 4], [4, 3])); // false
console.log(imSpielfeld([0, 0]));          // true
console.log(imSpielfeld([-1, 0]));         // false
console.log(imSpielfeld([hoehe, 0]));      // false
```

### Aufgabe 6: Schlange und Münzen erkennen, Schwanz beißen

- Vervollständige `istSchlange` und `istMuenze`. Die Schleife ist schon da. Nutze `gleichesFeld`.
- Ergänze in `schritt` die Prüfung auf den eigenen Schwanz. Das letzte Stück der Schlange zählt dabei nicht.
- Erkläre in einem Satz: Warum darf der Kopf auf das Feld des letzten Schwanzstücks?

**Prüfen:** Eine Schlange aus 3 Teilen kann sich nicht selbst beißen. Verlängere zum Testen die Startschlange in `neuesSpiel` auf 6 Teile und fahre eine enge Kurve.

### Aufgabe 7: Münzen einsammeln

Diese Logik fehlt noch ganz. Ergänze sie in `schritt`. Wenn der neue Kopf auf einer Münze landet:

1. Die Schlange wird ein Feld länger.
2. Die Münze verschwindet aus `muenzen`.
3. `punkte` steigt um 1.
4. Eine neue Münze erscheint auf einem freien Feld.

Tipps:

- Überlege, wie die Schlange länger wird, wenn hinten einfach kein Stück entfernt wird.
- Zum Entfernen brauchst du die Position der Münze im Array und `splice` (siehe Cheat-Sheet).
- Lege die neue Münze erst an, wenn der neue Kopf schon zur Schlange gehört. Sonst kann sie direkt unter dem Kopf landen.

**Prüfen:** Punkte und Länge steigen. Es liegen immer gleich viele Münzen im Spiel.

## Zusatzaufgaben

Wähle aus, was dich interessiert. Die Reihenfolge ist egal.

- **Hindernisse:** Schreibe eine Funktion `erzeugeHindernisse`, die einige zufällige Mauerstücke ins Innere setzt. Rufe sie in `erzeugeMauern` auf. Achte darauf, dass vor der Schlange beim Start keine Mauer steht.
- **Immer schneller:** Mit jeder Münze wird die Schlange etwas schneller, aber nie schneller als 60 ms pro Schritt. Bei einem neuen Spiel muss das Tempo wieder zurücksetzen.
- **Der Umdreh-Fehler:** Die Schlange läuft nach rechts. Drücke ganz schnell ↑ und dann ←. Was passiert? Finde die Ursache und behebe den Fehler.
- **Genau gebissen:** Wenn die Schlange gerade wächst, bleibt ihr letztes Stück liegen. Passe die Schwanz-Prüfung dafür an.
- **Eigenes Level:** Tippe ein eigenes `mauern`-Array mit Nullen und Einsen ab, zum Beispiel ein Labyrinth.
- **Gewonnen:** Wenn kein freies Feld mehr übrig ist, hat man gewonnen. Wie erkennst du das?
- **Durch den Rand:** Ohne Randmauern kommt die Schlange auf der gegenüberliegenden Seite wieder heraus.
