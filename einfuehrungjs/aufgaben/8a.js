let schueler = {
  name: "Jonas",
  alter: 16,
  klasse: "11b",
  noten: [2, 3, 1]
};

console.log(schueler);
console.log(schueler.name);
console.log(schueler.noten[2]);

schueler.alter = 17;
schueler.hobby = "Basketball";
console.log(schueler);

let klasse = [
  { name: "Jonas", punkte: 42 },
  { name: "Sara", punkte: 55 },
  { name: "Emil", punkte: 38 }
];

for (let s of klasse) {
  console.log(`${s.name} hat ${s.punkte} Punkte.`);
}
