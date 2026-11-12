// =====================================================================
//  AUFGABE 5: Neustart
// =====================================================================
//
//  ZIEL
//  Nach "Game Over" soll die Leertaste (oder kurzes Tippen auf dem
//  Touch-Display) ein neues Spiel starten.
//
//  WO WIRD DAS BENUTZT?
//  Die Datei "eingabe.ts" ruft "tasteLeertaste" auf, wenn die Leertaste
//  oder Enter gedrückt wird oder wenn man kurz auf den Bildschirm tippt.
//
//  DAS BRAUCHST DU
//  - zustand.gameOver (boolean): Ist das Spiel gerade vorbei?
//  - Die fertige Funktion neuesSpiel() aus "welt.ts". Sie setzt alles
//    auf Anfang: neue Mauern, neue Schlange, neue Münzen, 0 Punkte.
//    Eine Funktion rufst du auf, indem du ihren Namen mit runden
//    Klammern schreibst.
//  - Eine Bedingung mit "if".
//
//  SO GEHST DU VOR
//  Die Leertaste soll NUR nach "Game Over" etwas tun. Während des
//  Spiels würde ein Neustart sonst den Spielstand löschen.
//
//  SO TESTEST DU
//  - Nach "Game Over": Leertaste drücken → ein neues Spiel beginnt.
//  - Während des Spiels: Leertaste drücken → nichts passiert.
// =====================================================================

import { zustand } from '../zustand';
import { neuesSpiel } from '../welt';

export function tasteLeertaste(): void {
  // TODO
}
