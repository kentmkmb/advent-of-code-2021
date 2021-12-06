const fs = require("fs");

const initialFishes = fs
  .readFileSync("./6/input.txt", "utf-8")
  .trim()
  .split(",")
  .map((s) => Number(s));

const mature = Array(7).fill(0);
const young = Array(9).fill(0);

for (let fish of initialFishes) {
  mature[fish]++;
}

const ITERATIONS = 256;

for (let i = 0; i < ITERATIONS; i++) {
  const pergnantMature = mature.shift();
  const pergnantYoung = young.shift();
  const newborn = pergnantMature + pergnantYoung;
  mature.push(newborn);
  young.push(newborn);
}

const sum = (sum, count) => sum + count;
const total = mature.reduce(sum) + young.reduce(sum);

console.log(total);
