// =====================================================================
//  SPIELWELT – fertige Funktionen. Hier musst du nichts ändern,
//  aber du darfst (und sollst) sie in deinen Aufgaben benutzen.
// =====================================================================

/**
 * Zufällige ganze Zahl von min bis max (beide eingeschlossen)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function zufallsZahl(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * Ist das Feld eine Mauer?
 * @param {number[]} feld
 * @returns {boolean}
 */
function istMauer(feld) {
  if (zustand.mauern[feld[0]][feld[1]] === 1) {
    return true;
  }
  return false;
}

/**
 * Ein Feld ist frei, wenn dort keine Mauer, keine Schlange und keine Münze ist.
 * @param {number[]} feld
 * @returns {boolean}
 */
function istFrei(feld) {
  if (!imSpielfeld(feld)) {
    return false;
  }
  if (istMauer(feld)) {
    return false;
  }
  if (istSchlange(feld)) {
    return false;
  }
  if (istMuenze(feld)) {
    return false;
  }
  return true;
}

/**
 * Sucht ein zufälliges freies Feld. Gibt null zurück, wenn alles belegt ist.
 * @returns {number[] | null}
 */
function zufaelligesFreiesFeld() {
  const freieFelder = [];
  for (let zeile = 0; zeile < hoehe; zeile++) {
    for (let spalte = 0; spalte < breite; spalte++) {
      if (istFrei([zeile, spalte])) {
        freieFelder.push([zeile, spalte]);
      }
    }
  }
  if (freieFelder.length === 0) {
    return null;
  }
  return freieFelder[zufallsZahl(0, freieFelder.length - 1)];
}

/**
 * Setzt am Rand der Spielwelt überall eine Mauer.
 * @param {number[][]} mauern
 * @returns {number[][]}
 */
function erzeugeRand(mauern) {
  for (let zeile = 0; zeile < hoehe; zeile++) {
    for (let spalte = 0; spalte < breite; spalte++) {
      if (zeile === 0 || zeile === hoehe - 1 || spalte === 0 || spalte === breite - 1) {
        mauern[zeile][spalte] = 1;
      }
    }
  }
  return mauern;
}

/**
 * Erzeugt eine leere Spielwelt (überall 0).
 * @returns {number[][]}
 */
function erzeugeLeereMauerndefinition() {
  const neueMauern = [];
  for (let zeile = 0; zeile < hoehe; zeile++) {
    const reihe = [];
    for (let spalte = 0; spalte < breite; spalte++) {
      reihe.push(0);
    }
    neueMauern.push(reihe);
  }
  return neueMauern;
}

/**
 * Erzeugt eine leere Spielwelt und baut dann die Mauern.
 * @returns {number[][]}
 */
function erzeugeMauern() {
  const leeresFeld = erzeugeLeereMauerndefinition();
  const feldMitRand = erzeugeRand(leeresFeld);
  return feldMitRand;
}

/**
 * Setzt alles auf Anfang.
 */
function neuesSpiel() {
  zustand.mauern = erzeugeMauern();

  // Schlange startet in der Mitte und schaut nach rechts.
  const mitteZeile = Math.floor(hoehe / 2);
  const mitteSpalte = Math.floor(breite / 2);
  zustand.schlange = [
    [mitteZeile, mitteSpalte],
    [mitteZeile, mitteSpalte - 1],
    [mitteZeile, mitteSpalte - 2],
  ];

  zustand.richtung = 'rechts';
  zustand.gestartet = false;
  zustand.gameOver = false;
  zustand.punkte = 0;

  // Zufällige Anzahl Münzen verteilen
  zustand.muenzen = [];
  const anzahl = zufallsZahl(minMuenzen, maxMuenzen);
  for (let i = 0; i < anzahl; i++) {
    const feld = zufaelligesFreiesFeld();
    if (feld !== null) {
      zustand.muenzen.push(feld);
    }
  }
}
