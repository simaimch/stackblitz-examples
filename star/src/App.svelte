<script lang="ts">
  import { onMount } from 'svelte';
  import p5 from 'p5';
    import zeichne from './zeichne';

  let container: HTMLDivElement;


  onMount(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(500, 500);
        p.colorMode(p.HSB, 360, 100, 100);
      };

      p.draw = () => {
          zeichne(p);
          
        }
      };

    const instance = new p5(sketch, container);
    return () => instance.remove();
  });
</script>

<main>
  <h1>Zeichnen mit p5.js</h1>
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
