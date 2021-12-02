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

const coord = { length: 0, depth: 0 };

for (let i = 0; i < moves.length; i++) {
  const { direction, distance } = moves[i];
  if (direction === "forward") {
    coord.length += distance;
  } else if (direction === "down") {
    coord.depth += distance;
  } else {
    coord.depth = Math.max(coord.depth - distance, 0);
  }
}

console.log(coord, coord.length * coord.depth);
