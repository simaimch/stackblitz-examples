function begruesse(name) {
  console.log(`Hallo ${name}!`);
}

begruesse("Mia");
begruesse("Tom");

function quadrat(zahl) {
  return zahl * zahl;
}

let ergebnis = quadrat(5);
console.log(ergebnis);
console.log(quadrat(3) + quadrat(4));

// Kurzschreibweise: Pfeilfunktion
const verdopple = (x) => x * 2;
console.log(verdopple(21));
