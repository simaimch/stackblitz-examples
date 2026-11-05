// Steuerung per Pfeiltasten und Wischgesten
import type { Richtung } from './typen';

const TASTEN: Record<string, Richtung> = {
  ArrowUp: 'hoch',
  ArrowDown: 'runter',
  ArrowLeft: 'links',
  ArrowRight: 'rechts',
};

/** Mindestlänge einer Wischbewegung in Pixeln */
const MIN_WISCHWEG = 30;

/**
 * @param beiRichtung wird bei Pfeiltaste oder Wischgeste aufgerufen
 * @param beiAktion  wird bei Leertaste/Enter oder kurzem Tippen aufgerufen
 */
export function richteSteuerungEin(
  beiRichtung: (r: Richtung) => void,
  beiAktion: () => void,
): void {
  // --- Tastatur ---
  window.addEventListener('keydown', (ev) => {
    const richtung = TASTEN[ev.key];
    if (richtung) {
      ev.preventDefault(); // Seite soll nicht scrollen
      beiRichtung(richtung);
    } else if (ev.key === ' ' || ev.key === 'Enter') {
      ev.preventDefault();
      beiAktion();
    }
  });

  // --- Touch / Maus: Wischgesten ---
  let startX = 0;
  let startY = 0;
  let aktiv = false;

  window.addEventListener('pointerdown', (ev) => {
    startX = ev.clientX;
    startY = ev.clientY;
    aktiv = true;
  });

  window.addEventListener('pointerup', (ev) => {
    if (!aktiv) return;
    aktiv = false;

    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;

    if (Math.abs(dx) < MIN_WISCHWEG && Math.abs(dy) < MIN_WISCHWEG) {
      beiAktion(); // nur getippt
      return;
    }

    // Die größere Bewegungsrichtung gewinnt
    if (Math.abs(dx) > Math.abs(dy)) {
      beiRichtung(dx > 0 ? 'rechts' : 'links');
    } else {
      beiRichtung(dy > 0 ? 'runter' : 'hoch');
    }
  });

  window.addEventListener('pointercancel', () => {
    aktiv = false;
  });
}
