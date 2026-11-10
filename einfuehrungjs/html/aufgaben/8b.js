let buch = { titel: "Momo", seiten: 304, gelesen: false };

console.log(buch.titel);
console.log(buch.seiten / 2);
console.log(buch.autor);

buch.gelesen = !buch.gelesen;
console.log(buch.gelesen);

let kopie = buch;
kopie.seiten = 100;
console.log(buch.seiten);
