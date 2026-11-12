// 3D-Darstellung des Spielzustands mit Three.js
import * as THREE from 'three';

const FARBE_KOPF = 0xe53935; // rot
const FARBE_SCHWANZ = 0x43a047; // grün
const FARBE_MAUER = 0x78909c;
const FARBE_BODEN = 0x263238;
const FARBE_MUENZE = 0xffc107;

export class Darstellung {
  private renderer: THREE.WebGLRenderer;
  private szene = new THREE.Scene();
  private kamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

  /** Enthält Boden und Mauern; wird bei jedem neuen Spiel neu gebaut */
  private welt = new THREE.Group();
  private schlangenGruppe = new THREE.Group();
  private muenzGruppe = new THREE.Group();

  private hoehe = 0;
  private breite = 0;

  // Geometrien und Materialien werden wiederverwendet
  private teilGeometrie = new THREE.BoxGeometry(0.85, 0.85, 0.85);
  private kopfMaterial = new THREE.MeshStandardMaterial({ color: FARBE_KOPF });
  private schwanzMaterial = new THREE.MeshStandardMaterial({ color: FARBE_SCHWANZ });
  private muenzGeometrie = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 32);
  private muenzMaterial = new THREE.MeshStandardMaterial({
    color: FARBE_MUENZE,
    metalness: 0.8,
    roughness: 0.25,
    emissive: 0x332200,
  });

  private sonne: THREE.DirectionalLight;

  constructor(private container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(this.renderer.domElement);

    this.szene.background = new THREE.Color(0x10141c);

    // Licht
    this.szene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const sonne = new THREE.DirectionalLight(0xffffff, 1.6);
    sonne.position.set(-10, 25, 15);
    sonne.castShadow = true;
    sonne.shadow.mapSize.set(2048, 2048);
    this.szene.add(sonne);
    this.sonne = sonne;

    this.szene.add(this.welt, this.schlangenGruppe, this.muenzGruppe);

    window.addEventListener('resize', () => this.anpassen());
  }

  /** Rechnet ein Spielfeld [zeile, spalte] in eine 3D-Position um. */
  private position(feld: number[], y = 0.5): THREE.Vector3 {
    const zeile = feld[0];
    const spalte = feld[1];
    return new THREE.Vector3(
      spalte - (this.breite - 1) / 2,
      y,
      zeile - (this.hoehe - 1) / 2,
    );
  }

  /** Baut Boden und Mauern für einen neuen Spielzustand. */
  baueWelt(hoehe: number, breite: number, mauern: number[][]): void {
    // Alte Welt aufräumen
    this.welt.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
        obj.geometry.dispose();
        (obj.material as THREE.Material).dispose();
      }
    });
    this.welt.clear();

    this.hoehe = hoehe;
    this.breite = breite;

    // Boden
    const boden = new THREE.Mesh(
      new THREE.PlaneGeometry(breite, hoehe),
      new THREE.MeshStandardMaterial({ color: FARBE_BODEN }),
    );
    boden.rotation.x = -Math.PI / 2;
    boden.receiveShadow = true;
    this.welt.add(boden);

    // Gitterlinien zur Orientierung
    const punkte: THREE.Vector3[] = [];
    const x0 = -breite / 2;
    const z0 = -hoehe / 2;
    for (let spalte = 0; spalte <= breite; spalte++) {
      punkte.push(new THREE.Vector3(x0 + spalte, 0.01, z0), new THREE.Vector3(x0 + spalte, 0.01, -z0));
    }
    for (let zeile = 0; zeile <= hoehe; zeile++) {
      punkte.push(new THREE.Vector3(x0, 0.01, z0 + zeile), new THREE.Vector3(-x0, 0.01, z0 + zeile));
    }
    const gitter = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(punkte),
      new THREE.LineBasicMaterial({ color: 0x37474f }),
    );
    this.welt.add(gitter);

    // Mauern: ein InstancedMesh ist schneller als viele einzelne Würfel
    let anzahl = 0;
    for (const reihe of mauern) for (const wert of reihe) if (wert === 1) anzahl++;

    const mauerMesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: FARBE_MAUER }),
      anzahl,
    );
    mauerMesh.castShadow = true;
    mauerMesh.receiveShadow = true;

    const matrix = new THREE.Matrix4();
    let i = 0;
    for (let zeile = 0; zeile < hoehe; zeile++) {
      for (let spalte = 0; spalte < breite; spalte++) {
        if (mauern[zeile][spalte] === 1) {
          matrix.setPosition(this.position([zeile, spalte]));
          mauerMesh.setMatrixAt(i++, matrix);
        }
      }
    }
    this.welt.add(mauerMesh);

    // Schattenbereich an die Weltgröße anpassen
    const s = Math.max(breite, hoehe);
    const cam = this.sonne.shadow.camera;
    cam.left = -s;
    cam.right = s;
    cam.top = s;
    cam.bottom = -s;
    cam.updateProjectionMatrix();

    this.anpassen();
  }

  /** Bringt Schlange und Münzen auf den aktuellen Stand. */
  aktualisiere(schlange: number[][], muenzen: number[][], zeitSek: number): void {
    // Genau so viele Würfel wie Schlangenteile
    while (this.schlangenGruppe.children.length < schlange.length) {
      const teil = new THREE.Mesh(this.teilGeometrie, this.schwanzMaterial);
      teil.castShadow = true;
      this.schlangenGruppe.add(teil);
    }
    while (this.schlangenGruppe.children.length > schlange.length) {
      this.schlangenGruppe.remove(this.schlangenGruppe.children[this.schlangenGruppe.children.length - 1]);
    }
    schlange.forEach((feld, i) => {
      const teil = this.schlangenGruppe.children[i] as THREE.Mesh;
      teil.position.copy(this.position(feld, 0.45));
      teil.material = i === 0 ? this.kopfMaterial : this.schwanzMaterial;
      teil.scale.setScalar(i === 0 ? 1.1 : 1);
    });

    // Münzen
    while (this.muenzGruppe.children.length < muenzen.length) {
      const muenze = new THREE.Mesh(this.muenzGeometrie, this.muenzMaterial);
      muenze.rotation.x = Math.PI / 2; // aufrecht stellen
      muenze.castShadow = true;
      const halter = new THREE.Group(); // dreht sich um die senkrechte Achse
      halter.add(muenze);
      this.muenzGruppe.add(halter);
    }
    while (this.muenzGruppe.children.length > muenzen.length) {
      this.muenzGruppe.remove(this.muenzGruppe.children[this.muenzGruppe.children.length - 1]);
    }
    muenzen.forEach((feld, i) => {
      const halter = this.muenzGruppe.children[i];
      halter.position.copy(this.position(feld, 0.5 + Math.sin(zeitSek * 3 + i) * 0.08));
      halter.rotation.y = zeitSek * 2 + i;
    });
  }

  zeichne(): void {
    this.renderer.render(this.szene, this.kamera);
  }

  /** Passt Bildgröße und Kamera an Fenster und Spielwelt an. */
  private anpassen(): void {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.renderer.setSize(w, h);
    this.kamera.aspect = w / h;

    // Abstand so wählen, dass die ganze Welt sichtbar ist
    const halbeSicht = Math.tan(THREE.MathUtils.degToRad(this.kamera.fov / 2));
    const noetig = Math.max(this.hoehe, this.breite / this.kamera.aspect);
    const abstand = (noetig / 2 / halbeSicht) * 1.25;

    // Schräg von vorne oben schauen
    this.kamera.position.set(0, abstand * 0.9, abstand * 0.45);
    this.kamera.lookAt(0, 0, 0.5);
    this.kamera.updateProjectionMatrix();
  }
}
