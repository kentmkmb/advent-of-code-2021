const fs = require("fs");

const crabs = fs
  .readFileSync("./7/input.txt", "utf-8")
  .trim()
  .split(",")
  .map((s) => Number(s));

const dots = [];
for (let i = 0; i < 2000; i++) {
  dots[i] = crabs.reduce((sum, crab) => sum + Math.abs(i - crab), 0);
}

const cheapest = dots.sort((a, b) => b - a).pop();
console.log(cheapest);
