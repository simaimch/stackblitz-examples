# TypeScript Cheat-Sheet – Snake

Nov 5, 2026 · @Chris

## Variablen

Eine Variable ist ein Name für einen Wert. Mit `let` kann sich der Wert später ändern, mit `const` nicht.

```ts
let leben = 3;        // Variable anlegen
leben = leben - 1;    // neuen Wert zuweisen
leben--;              // kurz für: leben = leben - 1

const name = 'Mia';   // kann nicht mehr geändert werden
```

- `=` **weist zu** (speichert einen Wert). Zum **Vergleichen** nimmst du `===`.
- Eine Variable, die innerhalb von `{ }` angelegt wird, gibt es nur dort.
- `export` vor einer Variablen oder Funktion heißt: Andere Dateien dürfen sie benutzen.

## Typen

Jeder Wert hat einen Typ. TypeScript prüft, ob die Typen zusammenpassen, und unterstreicht Fehler rot.

| Typ | Bedeutung | Beispiel |
| --- | --- | --- |
| `number` | Zahl (ganz oder mit Komma) | `15`, `-1`, `0.5` |
| `string` | Text, in Anführungszeichen | `'links'`, `"Hallo"` |
| `boolean` | Wahrheitswert | `true`, `false` |
| `number[]` | Liste von Zahlen | `[3, 7]` |
| `number[][]` | Liste von Listen | `[[3, 7], [3, 6]]` |
| `void` | Funktion gibt nichts zurück | `function f(): void` |
| `number[] \| null` | entweder eine Liste oder „nichts“ | `null` |

Den Typ schreibst du mit Doppelpunkt hinter den Namen. Oft erkennt TypeScript ihn auch selbst.

```ts
let tempo: number = 150;
let richtung = 'hoch';   // TypeScript erkennt: string
```

## Operatoren

| Zeichen | Bedeutung | Beispiel | Ergebnis |
| --- | --- | --- | --- |
| `+ - * /` | rechnen | `7 - 2` | `5` |
| `===` | ist gleich | `3 === 3` | `true` |
| `!==` | ist ungleich | `'hoch' !== 'links'` | `true` |
| `< > <= >=` | kleiner, größer | `4 >= 5` | `false` |
| `&&` | und: beide müssen stimmen | `true && false` | `false` |
| `\|\|` | oder: eins reicht | `true \|\| false` | `true` |
| `!` | nicht: dreht um | `!true` | `false` |
| `++` / `--` | um 1 erhöhen / verringern | `punkte++` | eins mehr |

## Bedingungen

Mit `if` führt das Programm Code nur aus, wenn eine Bedingung `true` ist.

```ts
if (note === 1) {
  console.log('Sehr gut');
} else if (note <= 3) {
  console.log('Bestanden');
} else {
  console.log('Üben!');
}
```

Mehrere Bedingungen verknüpfst du mit `&&` und `||`:

```ts
if (alter >= 12 && alter <= 16) {
  console.log('Mittelstufe');
}
```

Eine Funktion kann mit `return` sofort beendet werden. Der Rest wird dann nicht mehr ausgeführt:

```ts
if (pause) {
  return;   // hier ist Schluss
}
// ... nur ohne Pause geht es hier weiter
```

## Schleifen

Eine Schleife wiederholt Code.

**Zählschleife** – wenn du eine Nummer (einen Index) brauchst:

```ts
for (let i = 0; i < 5; i++) {
  console.log(i);   // 0, 1, 2, 3, 4
}
```

Die drei Teile: Start (`let i = 0`), Bedingung zum Weitermachen (`i < 5`), Schritt (`i++`).

**for-of-Schleife** – wenn du jedes Element einer Liste brauchst, aber keine Nummer:

```ts
const noten = [2, 1, 3];
for (const note of noten) {
  console.log(note);   // 2, 1, 3
}
```

**Verschachtelte Schleifen** – gehen ein Gitter Zeile für Zeile durch:

```ts
for (let zeile = 0; zeile < 3; zeile++) {
  for (let spalte = 0; spalte < 4; spalte++) {
    console.log(zeile, spalte);
  }
}
```

**Suchen mit Schleife:** Sobald du gefunden hast, was du suchst, kannst du mit `return` sofort ein Ergebnis zurückgeben. Erst nach der Schleife steht fest, dass nichts gefunden wurde.

```ts
function enthaeltNull(zahlen: number[]): boolean {
  for (const z of zahlen) {
    if (z === 0) {
      return true;    // gefunden – fertig
    }
  }
  return false;       // ganze Liste geprüft, nichts gefunden
}
```

## Funktionen

Eine Funktion ist ein benannter Codeblock. Sie bekommt Werte (Parameter) und kann ein Ergebnis zurückgeben.

```ts
//       Name     Parameter mit Typ        Rückgabetyp
function flaeche(laenge: number, breite: number): number {
  return laenge * breite;
}

const f = flaeche(3, 4);   // Aufruf: f ist 12
```

- `return` gibt das Ergebnis zurück und beendet die Funktion.
- Bei Rückgabetyp `boolean` muss **jeder** Weg durch die Funktion mit `return true` oder `return false` enden.
- Bei `void` gibt es kein Ergebnis. Die Funktion **macht** nur etwas, zum Beispiel eine Variable ändern.
- Funktionen können andere Funktionen aufrufen. Nutze die, die es schon gibt!

## Arrays (Listen)

Ein Array speichert mehrere Werte in einer festen Reihenfolge. Die Zählung beginnt bei **0**.

```ts
const tiere = ['Hund', 'Katze', 'Maus'];
tiere[0]                  // 'Hund'
tiere.length              // 3
tiere[tiere.length - 1]   // 'Maus' – das letzte Element
```

| Befehl | Was passiert | `tiere` danach |
| --- | --- | --- |
| `tiere.push('Igel')` | hängt hinten an | `['Hund', 'Katze', 'Maus', 'Igel']` |
| `tiere.pop()` | entfernt das letzte | `['Hund', 'Katze']` |
| `tiere.unshift('Igel')` | fügt vorne ein | `['Igel', 'Hund', 'Katze', 'Maus']` |
| `tiere.splice(1, 1)` | entfernt ab Position 1 genau 1 Element | `['Hund', 'Maus']` |

(Jede Zeile geht vom Anfangszustand `['Hund', 'Katze', 'Maus']` aus.)

## Felder: Arrays in Arrays

In Snake ist ein Feld ein Array `[zeile, spalte]`. Die Schlange ist ein Array aus solchen Feldern.

```ts
const feld = [4, 7];
feld[0]   // 4 – die Zeile
feld[1]   // 7 – die Spalte

const liste = [[4, 7], [4, 6], [4, 5]];
liste[0]      // [4, 7] – das erste Feld
liste[2][1]   // 5 – die Spalte des dritten Felds
```

Bei `mauern[zeile][spalte]` wählst du erst die Zeile, dann darin die Spalte.

**Achtung beim Vergleichen:**

```ts
[4, 7] === [4, 7]   // false!
```

`===` prüft bei Arrays, ob es **dasselbe** Array ist, nicht ob der Inhalt gleich ist. Zwei Felder musst du deshalb Zahl für Zahl vergleichen.

## Fehlersuche

- **Ausgeben, was passiert:** `console.log('Kopf:', schlange[0]);` zeigt Werte in der Konsole.
- **Rote Wellenlinie:** Maus darüber halten und die Meldung lesen. Die wichtigsten:

| Meldung (Ausschnitt) | Bedeutung |
| --- | --- |
| `Type 'string' is not assignable to type 'number'` | Falscher Typ: Text, wo eine Zahl hingehört |
| `Function lacks ending return statement` | Nicht jeder Weg durch die Funktion endet mit `return` |
| `Cannot find name '...'` | Tippfehler im Namen oder Variable gibt es hier nicht |
| `Cannot read properties of undefined` (in der Konsole) | Zugriff außerhalb des Arrays, z. B. `liste[10]` bei 3 Elementen |

- **Häufige Fehler:** `=` statt `===` in einer Bedingung · `i <= liste.length` statt `i < liste.length` · eine vergessene `}`.
- **Seite hängt?** Wahrscheinlich eine Endlosschleife. Prüfe die Bedingung und den Schritt deiner Schleife.
