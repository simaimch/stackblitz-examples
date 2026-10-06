<script lang="ts">
  import { onMount } from 'svelte';
  import p5 from 'p5';

  let container: HTMLDivElement;

  /**
   * Zeichnet einen Stern aus Strichen.
   * Für `points` Eckpunkte auf einem Kreis wird jeder Punkt mit dem
   * Punkt `step` Positionen weiter verbunden (5/2 = Pentagramm).
   */
  function drawStar(
    p: p5,
    cx: number,
    cy: number,
    radius: number,
    points: number,
    step: number,
    rotation: number
  ): void {
    // 1) Eckpunkte per Schleife berechnen
    const vertices: p5.Vector[] = [];
    for (let i = 0; i < points; i++) {
      const angle = rotation - p.HALF_PI + (i * p.TWO_PI) / points;
      vertices.push(p.createVector(cx + radius * p.cos(angle), cy + radius * p.sin(angle)));
    }

    // 2) Per Schleife die Striche zwischen den Eckpunkten ziehen
    for (let i = 0; i < points; i++) {
      const a = vertices[i];
      const b = vertices[(i + step) % points];
      p.line(a.x, a.y, b.x, b.y);
    }
  }

  onMount(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(500, 500);
        p.colorMode(p.HSB, 360, 100, 100);
      };

      p.draw = () => {
        p.background(230, 60, 8);
        p.strokeWeight(2);

        const rotation = p.frameCount * 0.005;

        // Mehrere ineinander liegende Sterne, ebenfalls per Schleife
        const layers = 6;
        for (let layer = 0; layer < layers; layer++) {
          const radius = 220 - layer * 35;
          const direction = layer % 2 === 0 ? 1 : -1; // abwechselnd drehen
          p.stroke((layer * 50 + p.frameCount * 0.5) % 360, 70, 100);
          drawStar(p, p.width / 2, p.height / 2, radius, 5, 2, rotation * direction);
        }
      };
    };

    const instance = new p5(sketch, container);
    return () => instance.remove();
  });
</script>

<main>
  <h1>Stern mit p5.js</h1>
  <div bind:this={container}></div>
</main>

<style>
  main {
    text-align: center;
  }
  h1 {
    font-weight: 400;
  }
</style>
