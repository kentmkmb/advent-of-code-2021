const fs = require("fs");

const depths = fs
  .readFileSync("./1/input-1.txt", "utf-8")
  .split("\n")
  .map((s) => Number(s));

let count = 0;
let previous = depths[0] + depths[1] + depths[2];
for (let i = 3; i < depths.length; i++) {
  const current = previous - depths[i - 3] + depths[i];
  if (current > previous) {
    count++;
  }
  previous = current;
}

console.log(count);
