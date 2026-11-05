import './style.css';
import { CONFIG } from './config';
import { neuesSpiel, richtungEingeben, schritt } from './spiel';
import { Darstellung } from './darstellung';
import { richteSteuerungEin } from './eingabe';

const container = document.getElementById('spielbereich')!;
const punkteAnzeige = document.getElementById('punkte')!;
const laengeAnzeige = document.getElementById('laenge')!;
const overlay = document.getElementById('overlay')!;
const overlayTitel = document.getElementById('overlay-titel')!;
const overlayText = document.getElementById('overlay-text')!;

const darstellung = new Darstellung(container);
let zustand = neuesSpiel(CONFIG);
darstellung.baueWelt(zustand);

function neustart(): void {
  zustand = neuesSpiel(CONFIG);
  darstellung.baueWelt(zustand);
  zeigeOverlay('Snake 3D', 'Pfeiltaste drücken oder wischen zum Starten');
}

function zeigeOverlay(titel: string, text: string): void {
  overlayTitel.textContent = titel;
  overlayText.textContent = text;
  overlay.classList.remove('versteckt');
}

richteSteuerungEin(
  (richtung) => {
    if (zustand.gameOver) return;
    richtungEingeben(zustand, richtung);
    if (!zustand.gestartet) {
      zustand.gestartet = true;
      overlay.classList.add('versteckt');
    }
  },
  () => {
    if (zustand.gameOver) neustart();
  },
);

// Spielschleife: Zeichnen in jedem Frame, Spielschritte in festem Takt
let letzteZeit = performance.now();
let angesammelt = 0;

function frame(jetzt: number): void {
  angesammelt += jetzt - letzteZeit;
  letzteZeit = jetzt;

  while (angesammelt >= CONFIG.schrittDauerMs) {
    angesammelt -= CONFIG.schrittDauerMs;
    const warSchonVorbei = zustand.gameOver;
    schritt(zustand);
    if (zustand.gameOver && !warSchonVorbei) {
      zeigeOverlay('Game Over', `${zustand.punkte} Punkte – Leertaste oder Tippen für Neustart`);
    }
  }

  punkteAnzeige.textContent = String(zustand.punkte);
  laengeAnzeige.textContent = String(zustand.schlange.length);

  darstellung.aktualisiere(zustand, jetzt / 1000);
  darstellung.zeichne();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
