<script lang="ts">
  import { onMount } from 'svelte';
  import { Game, type GameState } from './game/Game';

  let container: HTMLDivElement;
  let game: Game | undefined;

  let phase = $state<GameState>('ready');
  let distance = $state(0);
  let coins = $state(0);
  let best = $state(0);

  onMount(() => {
    game = new Game(container, {
      onState: (s) => {
        phase = s;
        if (s === 'gameover') best = Math.max(best, distance);
      },
      onStats: (d, c) => {
        distance = d;
        coins = c;
      },
    });
    return () => game?.destroy();
  });

  // ---------- Tastatur ----------
  function onKeyDown(e: KeyboardEvent) {
    if (e.repeat) return;
    switch (e.code) {
      case 'ArrowLeft':
      case 'KeyA':
        game?.moveLeft();
        break;
      case 'ArrowRight':
      case 'KeyD':
        game?.moveRight();
        break;
      case 'ArrowUp':
      case 'KeyW':
        game?.jump();
        break;
      case 'Space':
      case 'Enter':
        if (phase === 'running') game?.jump();
        else game?.start();
        break;
      default:
        return;
    }
    e.preventDefault();
  }

  // ---------- Wischgesten / Tippen (Touch und Maus) ----------
  const SWIPE_MIN = 30;
  let startX = 0;
  let startY = 0;

  function onPointerDown(e: PointerEvent) {
    startX = e.clientX;
    startY = e.clientY;
  }

  function onPointerUp(e: PointerEvent) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.hypot(dx, dy) < SWIPE_MIN) {
      if (phase !== 'running') game?.start(); // Tippen startet das Spiel
    } else if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) game?.moveLeft();
      else game?.moveRight();
    } else if (dy < 0) {
      game?.jump();
    }
  }
</script>

<svelte:window onkeydown={onKeyDown} />

<div class="stage" role="application" aria-label="Spielfeld" bind:this={container} onpointerdown={onPointerDown} onpointerup={onPointerUp}></div>

<div class="hud">
  <div class="stats">
    <span>📏 {distance} m</span>
    <span>🪙 {coins}</span>
    {#if best > 0}<span>🏆 {best} m</span>{/if}
  </div>

  {#if phase === 'ready'}
    <div class="overlay">
      <h1>Svelte Runner</h1>
      <p>Leertaste oder Tippen zum Starten</p>
      <small>← → / A D: Spur wechseln · ↑ / W / Leertaste: springen<br />Touch: wischen links/rechts/hoch</small>
    </div>
  {:else if phase === 'gameover'}
    <div class="overlay">
      <h1>Game Over</h1>
      <p>{distance} m · {coins} Münzen</p>
      <small>Leertaste oder Tippen für Neustart</small>
    </div>
  {/if}
</div>

<style>
  .stage {
    position: fixed;
    inset: 0;
    touch-action: none;
    user-select: none;
  }

  /* Overlay liegt über dem Canvas, lässt aber Eingaben durch */
  .hud {
    position: fixed;
    inset: 0;
    pointer-events: none;
    text-shadow: 0 1px 4px rgb(0 0 0 / 0.6);
  }

  .stats {
    display: flex;
    gap: 1.25rem;
    padding: 0.75rem 1rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-align: center;
    background: rgb(10 15 30 / 0.45);
  }

  h1 {
    margin: 0;
    font-size: 2.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
  }

  small {
    opacity: 0.8;
    line-height: 1.5;
  }
</style>
