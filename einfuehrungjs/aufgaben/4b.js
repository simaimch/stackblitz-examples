let x = 7;

if (x % 2 === 0) {
  console.log("gerade");
} else {
  console.log("ungerade");
}

if (x > 5 && x < 10) {
  console.log("A");
}
if (x > 5 || x > 100) {
  console.log("B");
}
if (!(x === 7)) {
  console.log("C");
}
console.log(x == "7", x === "7");
