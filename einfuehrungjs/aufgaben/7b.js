function begruesse(name) {
  console.log(`Hallo ${name}!`);
}

function rechne(a, b) {
  return a * 2 + b;
}

console.log(rechne(3, 4));
console.log(rechne(4, 3));
console.log(rechne(rechne(1, 1), 0));

function test(x) {
  if (x > 0) {
    return "positiv";
  }
  return "nicht positiv";
  console.log("Wird das ausgegeben?");
}

console.log(test(5));
console.log(test(0));
console.log(begruesse("Lea"));
