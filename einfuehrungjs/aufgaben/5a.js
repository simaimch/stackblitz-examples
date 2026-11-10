for (let i = 1; i <= 5; i++) {
  console.log("Durchlauf", i);
}

let summe = 0;
for (let i = 1; i <= 10; i++) {
  summe = summe + i;
}
console.log("Summe 1 bis 10:", summe);

let kontostand = 100;
let jahre = 0;
while (kontostand < 150) {
  kontostand = kontostand * 1.05;
  jahre++;
}
console.log(`Nach ${jahre} Jahren: ${kontostand.toFixed(2)} €`);
