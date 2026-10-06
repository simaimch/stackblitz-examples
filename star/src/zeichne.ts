import p5 from 'p5';
import { beginnePolygon, EFarbe, nächstePolygonLinie, setzeFüllFarbe, setzeStrichFarbe, zeichnePolygon } from './formen';

export default function zeichne(p:p5){
    const zeichenflächeHöhe = p.height;
    const zeichenflächeBreite = p.width;

    setzeStrichFarbe(p, EFarbe.Schwarz);
    setzeFüllFarbe(p, EFarbe.Bordeaux);

    beginnePolygon(p,zeichenflächeBreite/2, zeichenflächeHöhe/2);
    nächstePolygonLinie(p, 60, 80);
    nächstePolygonLinie(p, 120, 80);
    nächstePolygonLinie(p, 180, 80);
    nächstePolygonLinie(p, 240, 80);
    nächstePolygonLinie(p, 300, 80);
    
    zeichnePolygon(p);

}