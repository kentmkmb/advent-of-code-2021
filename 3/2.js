const fs = require("fs");

const binarys = fs.readFileSync("./3/input.txt", "utf-8").trim().split("\n");

const binaryLength = binarys[0].length;

function getStat(arr, i) {
  const stats = { 0: 0, 1: 0 };

  for (let binary of arr) {
    stats[binary[i]]++;
  }

  const prepared = Object.entries(stats)
    .sort((a, b) => a[1] - b[1])
    .map((a) => a[0]);
  return prepared;
}

let ox = Array.from(binarys);
for (let i = 0; ox.length > 1 && i < binaryLength; i++) {
  ox = ox.filter((binary) => binary[i] === getStat(ox, i)[1]);
}

let co2 = Array.from(binarys);
for (let i = 0; co2.length > 1 && i < binaryLength; i++) {
  co2 = co2.filter((binary) => binary[i] === getStat(co2, i)[0]);
}

console.log(ox, co2);

console.log(Number.parseInt(ox[0], 2) * Number.parseInt(co2[0], 2));
