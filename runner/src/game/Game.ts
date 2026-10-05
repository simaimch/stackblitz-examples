import * as THREE from 'three';

export type GameState = 'ready' | 'running' | 'gameover';

export interface GameCallbacks {
  onState: (state: GameState) => void;
  onStats: (distance: number, coins: number) => void;
}

// ---------- Konstanten zum Experimentieren ----------
const LANE_X = [-2, 0, 2]; // x-Position der drei Spuren
const START_SPEED = 12; // Einheiten pro Sekunde
const MAX_SPEED = 30;
const ACCELERATION = 0.25; // Tempozuwachs pro Sekunde
const GRAVITY = -32;
const JUMP_SPEED = 11;
const ROW_SPACING = 9; // Abstand zwischen zwei Hindernis-Reihen
const SPAWN_Z = -70; // hier tauchen neue Objekte auf
const DESPAWN_Z = 8; // hinter der Kamera werden sie entfernt
const OBSTACLE_CHANCE = 0.35; // Wahrscheinlichkeit pro Spur und Reihe
const COIN_CHANCE = 0.6; // Wahrscheinlichkeit für eine Münzreihe
const DASH_SPACING = 4;
const DASH_COUNT = 20;

interface Item {
  kind: 'obstacle' | 'coin';
  mesh: THREE.Mesh;
  dead: boolean;
}

/**
 * Das Spiel: Die Figur bleibt bei z = 0 stehen, die Welt bewegt sich
 * mit wachsender Geschwindigkeit in Richtung Kamera (+z).
 */
export class Game {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(60, 1, 0.1, 120);
  private readonly player = new THREE.Group();
  private readonly dashes: THREE.Mesh[] = [];
  private items: Item[] = [];

  // Geometrien und Materialien werden geteilt (spart Speicher)
  private readonly obstacleGeo = new THREE.BoxGeometry(1.6, 1.2, 1);
  private readonly obstacleMat = new THREE.MeshStandardMaterial({ color: 0xe5484d });
  private readonly coinGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.12, 20).rotateX(Math.PI / 2);
  private readonly coinMat = new THREE.MeshStandardMaterial({
    color: 0xffc53d,
    metalness: 0.6,
    roughness: 0.3,
  });

  private readonly playerBox = new THREE.Box3();
  private readonly itemBox = new THREE.Box3();
  private readonly resizeObserver: ResizeObserver;

  private phase: GameState = 'ready';
  private lane = 1;
  private vy = 0;
  private speed = START_SPEED;
  private distance = 0;
  private coins = 0;
  private rowProgress = 0;
  private lastTime = 0;
  private reportedDistance = -1;
  private reportedCoins = -1;

  constructor(
    private readonly container: HTMLElement,
    private readonly callbacks: GameCallbacks,
  ) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.domElement.style.display = 'block';
    container.appendChild(this.renderer.domElement);

    this.buildScene();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();

    this.reset();
    this.renderer.setAnimationLoop((time) => this.frame(time));
  }

  // ---------- Steuerung (von außen aufrufbar) ----------

  start() {
    if (this.phase === 'running') return;
    this.reset();
    this.setPhase('running');
  }

  moveLeft() {
    if (this.phase === 'running') this.lane = Math.max(0, this.lane - 1);
  }

  moveRight() {
    if (this.phase === 'running') this.lane = Math.min(LANE_X.length - 1, this.lane + 1);
  }

  jump() {
    if (this.phase === 'running' && this.player.position.y <= 0.001) {
      this.vy = JUMP_SPEED;
    }
  }

  destroy() {
    this.renderer.setAnimationLoop(null);
    this.resizeObserver.disconnect();
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach((m) => m.dispose());
      }
    });
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  // ---------- Aufbau ----------

  private buildScene() {
    const bg = 0x1b2a49;
    this.scene.background = new THREE.Color(bg);
    this.scene.fog = new THREE.Fog(bg, 25, 70); // verdeckt das "Aufploppen" der Objekte

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const sun = new THREE.DirectionalLight(0xffffff, 2);
    sun.position.set(4, 8, 6);
    this.scene.add(sun);

    // Boden
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 200).rotateX(-Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x2d3b5e }),
    );
    ground.position.z = -80;
    this.scene.add(ground);

    // Seitenränder
    const edgeGeo = new THREE.BoxGeometry(0.15, 0.1, 200);
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x7c8db5 });
    for (const x of [-3.5, 3.5]) {
      const edge = new THREE.Mesh(edgeGeo, edgeMat);
      edge.position.set(x, 0.05, -80);
      this.scene.add(edge);
    }

    // Spurmarkierungen: bewegen sich mit der Welt und werden recycelt
    const dashGeo = new THREE.BoxGeometry(0.08, 0.02, 1.5);
    const dashMat = new THREE.MeshStandardMaterial({ color: 0x7c8db5 });
    for (const x of [-1, 1]) {
      for (let i = 0; i < DASH_COUNT; i++) {
        const dash = new THREE.Mesh(dashGeo, dashMat);
        dash.position.set(x, 0.01, -i * DASH_SPACING);
        this.scene.add(dash);
        this.dashes.push(dash);
      }
    }

    // Spielfigur (Füße bei y = 0)
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 1, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x4f9dff }),
    );
    body.position.y = 0.6;
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 16, 12),
      new THREE.MeshStandardMaterial({ color: 0xffd6a5 }),
    );
    head.position.y = 1.3;
    this.player.add(body, head);
    this.scene.add(this.player);
  }

  private resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w === 0 || h === 0) return;

    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    // Im Hochformat weiter wegrücken, damit alle drei Spuren sichtbar bleiben
    const halfTan = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const dist = Math.max(6, 3.8 / (halfTan * this.camera.aspect));
    this.camera.position.set(0, 3.5 + dist * 0.15, dist);
    this.camera.lookAt(0, 1, -8);
  }

  // ---------- Spielzustand ----------

  private setPhase(phase: GameState) {
    this.phase = phase;
    this.callbacks.onState(phase);
  }

  private reset() {
    for (const item of this.items) this.scene.remove(item.mesh);
    this.items = [];

    this.lane = 1;
    this.vy = 0;
    this.speed = START_SPEED;
    this.distance = 0;
    this.coins = 0;
    this.rowProgress = 0;
    this.player.position.set(0, 0, 0);
    this.player.rotation.z = 0;

    // Welt vorab füllen, damit es nicht erst Sekunden dauert, bis etwas kommt
    for (let z = -25; z >= SPAWN_Z; z -= ROW_SPACING) this.spawnRow(z);
    this.reportStats();
  }

  private reportStats() {
    const d = Math.floor(this.distance);
    if (d !== this.reportedDistance || this.coins !== this.reportedCoins) {
      this.reportedDistance = d;
      this.reportedCoins = this.coins;
      this.callbacks.onStats(d, this.coins);
    }
  }

  // ---------- Spawning ----------

  private spawnRow(z: number) {
    const blocked = LANE_X.map(() => Math.random() < OBSTACLE_CHANCE);

    // Fairness: mindestens eine Spur muss frei bleiben
    if (blocked.every(Boolean)) {
      blocked[Math.floor(Math.random() * LANE_X.length)] = false;
    }

    blocked.forEach((isBlocked, lane) => {
      if (isBlocked) this.addItem('obstacle', lane, z);
    });

    // Münzreihe auf einer zufälligen freien Spur
    if (Math.random() < COIN_CHANCE) {
      const freeLanes = blocked.flatMap((isBlocked, lane) => (isBlocked ? [] : [lane]));
      const lane = freeLanes[Math.floor(Math.random() * freeLanes.length)];
      const count = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) this.addItem('coin', lane, z - i * 1.5);
    }
  }

  private addItem(kind: Item['kind'], lane: number, z: number) {
    const mesh =
      kind === 'obstacle'
        ? new THREE.Mesh(this.obstacleGeo, this.obstacleMat)
        : new THREE.Mesh(this.coinGeo, this.coinMat);
    mesh.position.set(LANE_X[lane], kind === 'obstacle' ? 0.6 : 1, z);
    this.scene.add(mesh);
    this.items.push({ kind, mesh, dead: false });
  }

  // ---------- Schleife ----------

  private frame(time: number) {
    const dt = Math.min((time - this.lastTime) / 1000, 0.05); // Obergrenze gegen Sprünge nach Tab-Wechsel
    this.lastTime = time;

    if (this.phase === 'running') this.update(dt);

    for (const item of this.items) {
      if (item.kind === 'coin') item.mesh.rotation.y += 3 * dt;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private update(dt: number) {
    this.speed = Math.min(MAX_SPEED, this.speed + ACCELERATION * dt);
    const dz = this.speed * dt;
    this.distance += dz;

    // Spurwechsel: weich zur Zielspur gleiten
    const p = this.player.position;
    const targetX = LANE_X[this.lane];
    p.x += (targetX - p.x) * Math.min(1, 14 * dt);
    this.player.rotation.z = -(targetX - p.x) * 0.2; // leichte Schräglage

    // Sprung: Gravitation auf die y-Geschwindigkeit
    this.vy += GRAVITY * dt;
    p.y += this.vy * dt;
    if (p.y <= 0) {
      p.y = 0;
      this.vy = 0;
    }

    // Neue Reihen spawnen
    this.rowProgress += dz;
    while (this.rowProgress >= ROW_SPACING) {
      this.rowProgress -= ROW_SPACING;
      this.spawnRow(SPAWN_Z + this.rowProgress);
    }

    // Welt bewegen
    for (const dash of this.dashes) {
      dash.position.z += dz;
      if (dash.position.z > DESPAWN_Z) dash.position.z -= DASH_COUNT * DASH_SPACING;
    }
    for (const item of this.items) item.mesh.position.z += dz;

    this.checkCollisions();

    // Aufräumen: eingesammelte und vorbeigezogene Objekte entfernen
    this.items = this.items.filter((item) => {
      const remove = item.dead || item.mesh.position.z > DESPAWN_Z;
      if (remove) this.scene.remove(item.mesh);
      return !remove;
    });

    this.reportStats();
  }

  private checkCollisions() {
    const p = this.player.position;
    this.playerBox.min.set(p.x - 0.35, p.y, p.z - 0.25);
    this.playerBox.max.set(p.x + 0.35, p.y + 1.6, p.z + 0.25);

    for (const item of this.items) {
      if (Math.abs(item.mesh.position.z) > 2) continue; // nur nahe Objekte prüfen
      this.itemBox.setFromObject(item.mesh);
      if (!this.playerBox.intersectsBox(this.itemBox)) continue;

      if (item.kind === 'coin') {
        item.dead = true;
        this.coins++;
      } else {
        this.reportStats();
        this.setPhase('gameover');
        return;
      }
    }
  }
}
