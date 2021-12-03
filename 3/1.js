const fs = require("fs");

const binarys = fs.readFileSync("./3/input.txt", "utf-8").trim().split("\n");

const binaryLength = binarys[0].length;

const stats = Array(binaryLength)
  .fill(null)
  .map(() => ({ 0: 0, 1: 0 }));

for (let binary of binarys) {
  for (let i = 0; i < binaryLength; i++) {
    stats[i][binary[i]]++;
  }
}

const prepared = stats.map((x) =>
  Object.entries(x)
    .sort((a, b) => a[1] - b[1])
    .map((a) => a[0])
);

const gamma = prepared.map((a) => a[1]).join("");
const epsilon = prepared.map((a) => a[0]).join("");
console.log(prepared, gamma, epsilon);

const consumption = Number.parseInt(gamma, 2) * Number.parseInt(epsilon, 2);
console.log(consumption);
