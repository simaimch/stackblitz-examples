import p5 from 'p5';

type Punkt = { x: number; y: number };

/** Gesammelte Eckpunkte des aktuellen Polygons. */
let punkte: Punkt[] = [];

/** Startet ein neues Polygon (verwirft ein evtl. noch offenes) und setzt den ersten Punkt. */
export function beginnePolygon(p: p5, x: number, y: number): void {
  punkte = [{ x, y }];
}

/**
 * Hängt einen neuen Punkt an: ausgehend vom letzten Punkt, in Richtung `winkel`
 * (in Grad, absolut) und mit der Strecke `länge`.
 * 0° = nach rechts, 90° = nach unten (die y-Achse zeigt in p5 nach unten).
 */
export function nächstePolygonLinie(p: p5, winkel: number, länge: number): void {
  winkel = 360-winkel;
  if (punkte.length === 0) {
    console.warn('nächstePolygonLinie: Zuerst beginnePolygon(p, x, y) aufrufen.');
    return;
  }
  const letzter = punkte[punkte.length - 1];
  const rad = p.radians(winkel);
  punkte.push({
    x: letzter.x + Math.cos(rad) * länge,
    y: letzter.y + Math.sin(rad) * länge,
  });
}

/** Zeichnet das gesammelte Polygon (geschlossen) mit aktuellem Stroke und Fill. */
export function zeichnePolygon(p: p5): void {
  if (punkte.length < 2) return;
  p.beginShape();
  for (const punkt of punkte) {
    p.vertex(punkt.x, punkt.y);
  }
  p.endShape(p.CLOSE);
}


export enum EFarbe {
  // Unbunt
  Schwarz = 'Schwarz',
  Anthrazit = 'Anthrazit',
  Grau = 'Grau',
  Silber = 'Silber',
  Weiß = 'Weiß',

  // Rot / Orange
  Rot = 'Rot',
  Karminrot = 'Karminrot',
  Bordeaux = 'Bordeaux',
  Zinnoberrot = 'Zinnoberrot',
  Korall = 'Korall',
  Lachs = 'Lachs',
  Orange = 'Orange',

  // Braun / Erdtöne
  Rost = 'Rost',
  Terrakotta = 'Terrakotta',
  Braun = 'Braun',
  Kastanienbraun = 'Kastanienbraun',
  Beige = 'Beige',
  Sand = 'Sand',
  Ocker = 'Ocker',

  // Gelb
  Bernstein = 'Bernstein',
  Gold = 'Gold',
  Gelb = 'Gelb',
  Zitronengelb = 'Zitronengelb',
  Senfgelb = 'Senfgelb',
  Khaki = 'Khaki',

  // Grün
  Olivgrün = 'Olivgrün',
  Gelbgrün = 'Gelbgrün',
  Hellgrün = 'Hellgrün',
  Limette = 'Limette',
  Grün = 'Grün',
  Smaragdgrün = 'Smaragdgrün',
  Tannengrün = 'Tannengrün',
  Mintgrün = 'Mintgrün',
  Jadegrün = 'Jadegrün',

  // Türkis / Blau
  Türkis = 'Türkis',
  Petrol = 'Petrol',
  Cyan = 'Cyan',
  Himmelblau = 'Himmelblau',
  Azurblau = 'Azurblau',
  Königsblau = 'Königsblau',
  Blau = 'Blau',
  Marineblau = 'Marineblau',
  Indigo = 'Indigo',

  // Violett / Pink
  Violett = 'Violett',
  Lavendel = 'Lavendel',
  Flieder = 'Flieder',
  Purpur = 'Purpur',
  Magenta = 'Magenta',
  Pink = 'Pink',
  Rosa = 'Rosa',
}

const FARBWERTE: Record<EFarbe, string> = {
  [EFarbe.Schwarz]: '#000000',
  [EFarbe.Anthrazit]: '#293133',
  [EFarbe.Grau]: '#808080',
  [EFarbe.Silber]: '#C0C0C0',
  [EFarbe.Weiß]: '#FFFFFF',

  [EFarbe.Rot]: '#FF0000',
  [EFarbe.Karminrot]: '#960018',
  [EFarbe.Bordeaux]: '#6D071A',
  [EFarbe.Zinnoberrot]: '#E34234',
  [EFarbe.Korall]: '#FF7F50',
  [EFarbe.Lachs]: '#FA8072',
  [EFarbe.Orange]: '#FFA500',

  [EFarbe.Rost]: '#B7410E',
  [EFarbe.Terrakotta]: '#E2725B',
  [EFarbe.Braun]: '#8B4513',
  [EFarbe.Kastanienbraun]: '#954535',
  [EFarbe.Beige]: '#F5F5DC',
  [EFarbe.Sand]: '#C2B280',
  [EFarbe.Ocker]: '#CC7722',

  [EFarbe.Bernstein]: '#FFBF00',
  [EFarbe.Gold]: '#FFD700',
  [EFarbe.Gelb]: '#FFFF00',
  [EFarbe.Zitronengelb]: '#FFF44F',
  [EFarbe.Senfgelb]: '#E1AD01',
  [EFarbe.Khaki]: '#BDB76B',

  [EFarbe.Olivgrün]: '#808000',
  [EFarbe.Gelbgrün]: '#9ACD32',
  [EFarbe.Hellgrün]: '#90EE90',
  [EFarbe.Limette]: '#BFFF00',
  [EFarbe.Grün]: '#008000',
  [EFarbe.Smaragdgrün]: '#50C878',
  [EFarbe.Tannengrün]: '#095228',
  [EFarbe.Mintgrün]: '#98FF98',
  [EFarbe.Jadegrün]: '#00A86B',

  [EFarbe.Türkis]: '#40E0D0',
  [EFarbe.Petrol]: '#005F6A',
  [EFarbe.Cyan]: '#00FFFF',
  [EFarbe.Himmelblau]: '#87CEEB',
  [EFarbe.Azurblau]: '#007FFF',
  [EFarbe.Königsblau]: '#4169E1',
  [EFarbe.Blau]: '#0000FF',
  [EFarbe.Marineblau]: '#000080',
  [EFarbe.Indigo]: '#4B0082',

  [EFarbe.Violett]: '#8F00FF',
  [EFarbe.Lavendel]: '#B57EDC',
  [EFarbe.Flieder]: '#C8A2C8',
  [EFarbe.Purpur]: '#800080',
  [EFarbe.Magenta]: '#FF00FF',
  [EFarbe.Pink]: '#FF69B4',
  [EFarbe.Rosa]: '#FFC0CB',
};

export function setzeFüllFarbe(p: p5, farbe: EFarbe): void {
  p.fill(p.color(FARBWERTE[farbe]));
}

export function setzeStrichFarbe(p: p5, farbe: EFarbe): void {
  p.stroke(p.color(FARBWERTE[farbe]));
}

export function zeichneStern(
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