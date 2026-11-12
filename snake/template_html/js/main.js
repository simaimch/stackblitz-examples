// Verbindet Spiellogik, Grafik und Steuerung. Hier muss nichts geändert werden.
// starteSpiel() wird in index.html aufgerufen, sobald Three.js geladen ist.

function starteSpiel() {
  const container = document.getElementById('spielbereich');
  const punkteAnzeige = document.getElementById('punkte');
  const laengeAnzeige = document.getElementById('laenge');
  const overlay = document.getElementById('overlay');
  const overlayTitel = document.getElementById('overlay-titel');
  const overlayText = document.getElementById('overlay-text');

  const darstellung = new Darstellung(container);

  richteSteuerungEin({
    hoch: () => tasteHoch(),
    runter: () => tasteRunter(),
    links: () => tasteLinks(),
    rechts: () => tasteRechts(),
    leertaste: () => tasteLeertaste(),
  });

  neuesSpiel();

  /** Welche Mauern gerade dargestellt werden – bei neuem Spiel neu aufbauen */
  let dargestellteMauern = null;

  function aktualisiereOverlay() {
    if (!zustand.gestartet) {
      overlayTitel.textContent = 'Snake 3D';
      overlayText.textContent = 'Pfeiltaste drücken oder wischen zum Starten';
      overlay.classList.remove('versteckt');
    } else if (zustand.gameOver) {
      overlayTitel.textContent = 'Game Over';
      overlayText.textContent = `${zustand.punkte} Punkte – Leertaste oder Tippen für Neustart`;
      overlay.classList.remove('versteckt');
    } else {
      overlay.classList.add('versteckt');
    }
  }

  // Spielschleife: Zeichnen in jedem Frame, Spielschritte im festen Takt
  let letzteZeit = performance.now();
  let angesammelt = 0;

  function frame(jetzt) {
    angesammelt += jetzt - letzteZeit;
    letzteZeit = jetzt;

    while (angesammelt >= schrittDauerMs) {
      angesammelt -= schrittDauerMs;
      schritt();
    }

    if (zustand.mauern !== dargestellteMauern) {
      darstellung.baueWelt(hoehe, breite, zustand.mauern);
      dargestellteMauern = zustand.mauern;
    }

    punkteAnzeige.textContent = String(zustand.punkte);
    laengeAnzeige.textContent = String(zustand.schlange.length);
    aktualisiereOverlay();

    darstellung.aktualisiere(zustand.schlange, zustand.muenzen, jetzt / 1000);
    darstellung.zeichne();
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
