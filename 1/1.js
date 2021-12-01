const fs = require("fs");

const depths = fs
  .readFileSync("./1/input-1.txt", "utf-8")
  .split("\n")
  .map((s) => Number(s));

let count = 0;
for (let i = 1; i < depths.length; i++) {
  if (depths[i] > depths[i - 1]) {
    count++;
  }
}

console.log(count);
