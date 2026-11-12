// Steuerung per Tastatur und Wischgesten – ruft die Tasten-Funktionen aus spiel.ts auf
/** Mindestlänge einer Wischbewegung in Pixeln */
const MIN_WISCHWEG = 30;
function richteSteuerungEin(tasten) {
  // --- Tastatur ---
  window.addEventListener('keydown', (ev) => {
    switch (ev.key) {
      case 'ArrowUp':
        tasten.hoch();
        break;
      case 'ArrowDown':
        tasten.runter();
        break;
      case 'ArrowLeft':
        tasten.links();
        break;
      case 'ArrowRight':
        tasten.rechts();
        break;
      case ' ':
      case 'Enter':
        tasten.leertaste();
        break;
      default:
        return;
    }
    ev.preventDefault(); // Seite soll nicht scrollen
  });
  // --- Touch / Maus: Wischen = Pfeiltaste, kurzes Tippen = Leertaste ---
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
      tasten.leertaste();
    } else if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) tasten.rechts();
      else tasten.links();
    } else {
      if (dy > 0) tasten.runter();
      else tasten.hoch();
    }
  });
  window.addEventListener('pointercancel', () => {
    aktiv = false;
  });
}
