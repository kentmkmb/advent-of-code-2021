const fs = require("fs");

const crabs = fs
  .readFileSync("./7/input.txt", "utf-8")
  .trim()
  .split(",")
  .map((s) => Number(s));

const cost = (distance) => (distance * (distance + 1)) / 2;

const dots = [];
for (let i = 0; i < 2000; i++) {
  dots[i] = crabs.reduce((sum, crab) => sum + cost(Math.abs(i - crab)), 0);
}

console.log(dots.sort((a, b) => b - a).pop());
