let faecher = ["Mathe", "Deutsch", "Chemie"];

console.log(faecher);
console.log(faecher[0]);
console.log(faecher.length);

faecher.push("Informatik");
faecher[1] = "Englisch";
console.log(faecher);

for (let fach of faecher) {
  console.log("Ich habe", fach);
}

let noten = [2, 1, 3, 2];
let summe = 0;
for (let note of noten) {
  summe += note;
}
console.log("Durchschnitt:", summe / noten.length);
