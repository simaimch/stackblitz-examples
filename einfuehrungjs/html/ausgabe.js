// Diese Datei sorgt dafür, dass console.log zusätzlich auf der Seite erscheint.
// Sie muss VOR der Aufgaben-Datei eingebunden werden. Hier nichts ändern.
(function () {
  const ausgabe = document.getElementById("ausgabe");

  function formatiere(wert, verschachtelt) {
    if (typeof wert === "string") return verschachtelt ? JSON.stringify(wert) : wert;
    if (wert === undefined) return "undefined";
    if (wert === null) return "null";
    if (typeof wert === "function") return "[Funktion " + (wert.name || "anonym") + "]";
    if (Array.isArray(wert)) {
      return "[" + wert.map((w) => formatiere(w, true)).join(", ") + "]";
    }
    if (typeof wert === "object") {
      const teile = Object.keys(wert).map((k) => k + ": " + formatiere(wert[k], true));
      return teile.length ? "{ " + teile.join(", ") + " }" : "{}";
    }
    return String(wert);
  }

  function schreibe(werte, klasse) {
    const zeile = document.createElement("div");
    zeile.className = "zeile " + klasse;
    zeile.textContent = werte.map((w) => formatiere(w, false)).join(" ");
    ausgabe.appendChild(zeile);
  }

  const original = { log: console.log, warn: console.warn, error: console.error };
  console.log = function (...werte) { original.log.apply(console, werte); schreibe(werte, "log"); };
  console.warn = function (...werte) { original.warn.apply(console, werte); schreibe(werte, "warn"); };
  console.error = function (...werte) { original.error.apply(console, werte); schreibe(werte, "fehler"); };

  // Fehler im Programm ebenfalls auf der Seite anzeigen
  window.addEventListener("error", function (e) {
    schreibe(["Fehler in Zeile " + e.lineno + ": " + e.message], "fehler");
  });
})();
