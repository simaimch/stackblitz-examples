// =====================================================================
//  AUFGABE 12: Münzen einsammeln
// =====================================================================
//
//  ZIEL
//  Wenn die Schlange auf eine Münze fährt,
//    1. wird sie ein Feld länger,
//    2. verschwindet die Münze,
//    3. steigen die Punkte um 1,
//    4. erscheint eine neue Münze auf einem freien Feld.
//
//  WO WIRD DAS BENUTZT?
//  In "spiel.ts" ruft "schritt" diese Funktion ganz am Ende auf, wenn
//  feststeht, dass die Schlange weder gegen eine Mauer noch gegen ihren
//  Schwanz fährt. "neuerKopf" ist das Feld, auf das der Kopf jetzt kommt.
//
//  WIE DIE SCHLANGE SICH BEWEGT (das funktioniert schon)
//  - unshift fügt vorne ein neues Element ein  → der neue Kopf
//  - pop entfernt das letzte Element           → das Schwanzende
//  Vorne eins dazu, hinten eins weg: Die Länge bleibt gleich, aber die
//  Schlange ist ein Feld weitergerückt.
//
//  DAS BRAUCHST DU
//  - muenzIndex(feld) aus Aufgabe 10: Position der Münze oder -1
//  - legeNeueMuenze() aus Aufgabe 11
//  - zustand.punkte: die Punktzahl
//  - splice: entfernt Elemente aus einer Liste:
//        liste.splice(position, 1);   // entfernt 1 Element ab "position"
//  - if / else
//
//  ÜBERLEGE
//  - Wie kann die Schlange länger werden, ohne dass du ein neues Teil
//    an ihr Ende setzt? (Tipp: Was passiert, wenn hinten nichts
//    entfernt wird?)
//  - In welcher Reihenfolge machst du die Schritte? Die neue Münze darf
//    nicht unter dem neuen Kopf landen. Wann gehört der neue Kopf zur
//    Schlange – vor oder nach unshift?
//
//  SO TESTEST DU
//  - Fahre über eine Münze: Sie verschwindet, die Schlange wird länger,
//    die Punkte oben steigen.
//  - Es liegen immer gleich viele Münzen im Spiel.
//  - Ohne Münze bleibt die Schlange gleich lang.
//
//  WENN DU FERTIG BIST: Dein Snake ist komplett. Glückwunsch!
// =====================================================================

import { zustand } from '../zustand';
import { muenzIndex } from './aufgabe10';
import { legeNeueMuenze } from './aufgabe11';

/** Bewegt die Schlange auf das Feld neuerKopf. */
export function bewegeSchlange(neuerKopf: number[]): void {
  // TODO: Münzen einsammeln

  zustand.schlange.unshift(neuerKopf);
  zustand.schlange.pop();
}
