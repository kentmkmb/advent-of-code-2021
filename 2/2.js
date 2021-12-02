const fs = require("fs");

const moves = fs
  .readFileSync("./2/input-1.txt", "utf-8")
  .trim()
  .split("\n")
  .map((s) =>
    s.split(" ").reduce((direction, distance) => ({
      direction,
      distance: Number(distance),
    }))
  );

const coord = { length: 0, depth: 0, aim: 0 };

for (let i = 0; i < moves.length; i++) {
  const { direction, distance } = moves[i];
  if (direction === "forward") {
    coord.length += distance;
    coord.depth = Math.max(coord.depth + distance * coord.aim, 0);
  } else if (direction === "down") {
    coord.aim += distance;
  } else {
    coord.aim -= distance;
  }
}

console.log(coord, coord.length * coord.depth);
