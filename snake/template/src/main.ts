// Verbindet Spiellogik, Grafik und Steuerung. Hier muss nichts geändert werden.
import './style.css';
import * as spiel from './spiel';
import { Darstellung } from './darstellung';
import { richteSteuerungEin } from './eingabe';

const container = document.getElementById('spielbereich')!;
const punkteAnzeige = document.getElementById('punkte')!;
const laengeAnzeige = document.getElementById('laenge')!;
const overlay = document.getElementById('overlay')!;
const overlayTitel = document.getElementById('overlay-titel')!;
const overlayText = document.getElementById('overlay-text')!;

const darstellung = new Darstellung(container);

richteSteuerungEin({
  hoch: () => spiel.tasteHoch(),
  runter: () => spiel.tasteRunter(),
  links: () => spiel.tasteLinks(),
  rechts: () => spiel.tasteRechts(),
  leertaste: () => spiel.tasteLeertaste(),
});

spiel.neuesSpiel();

/** Welche Mauern gerade dargestellt werden – bei neuem Spiel neu aufbauen */
let dargestellteMauern: number[][] | null = null;

function aktualisiereOverlay(): void {
  if (!spiel.gestartet) {
    overlayTitel.textContent = 'Snake 3D';
    overlayText.textContent = 'Pfeiltaste drücken oder wischen zum Starten';
    overlay.classList.remove('versteckt');
  } else if (spiel.gameOver) {
    overlayTitel.textContent = 'Game Over';
    overlayText.textContent = `${spiel.punkte} Punkte – Leertaste oder Tippen für Neustart`;
    overlay.classList.remove('versteckt');
  } else {
    overlay.classList.add('versteckt');
  }
}

// Spielschleife: Zeichnen in jedem Frame, Spielschritte im festen Takt
let letzteZeit = performance.now();
let angesammelt = 0;

function frame(jetzt: number): void {
  angesammelt += jetzt - letzteZeit;
  letzteZeit = jetzt;

  while (angesammelt >= spiel.schrittDauerMs) {
    angesammelt -= spiel.schrittDauerMs;
    spiel.schritt();
  }

  if (spiel.mauern !== dargestellteMauern) {
    darstellung.baueWelt(spiel.hoehe, spiel.breite, spiel.mauern);
    dargestellteMauern = spiel.mauern;
  }

  punkteAnzeige.textContent = String(spiel.punkte);
  laengeAnzeige.textContent = String(spiel.schlange.length);
  aktualisiereOverlay();

  darstellung.aktualisiere(spiel.schlange, spiel.muenzen, jetzt / 1000);
  darstellung.zeichne();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
