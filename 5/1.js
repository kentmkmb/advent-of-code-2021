const fs = require("fs");

const lines = fs
  .readFileSync("./5/input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((s) =>
    s.split("->").map((s) =>
      s
        .trim()
        .split(",")
        .map((s) => Number(s))
    )
  )
  .filter((line) => line[0][0] === line[1][0] || line[0][1] === line[1][1]);

function equals(point1, point2) {
  return point1[0] === point2[0] && point1[1] === point2[1];
}

function* generateLine([point1, point2]) {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  const deltaX = Math.sign(x2 - x1);
  const deltaY = Math.sign(y2 - y1);

  let x = x1;
  let y = y1;
  let previous = [...point1];
  yield previous;
  while (!equals(previous, point2)) {
    x += deltaX;
    y += deltaY;
    const current = [x, y];
    if (!equals(current, previous)) {
      yield current;
      previous = current;
    }
  }
}

const stringify = ([x, y]) => `${x}:${y}`;

const counter = new Map();
for (let line of lines) {
  for (let point of generateLine(line)) {
    const hash = stringify(point);
    counter.set(hash, (counter.get(hash) ?? 0) + 1);
  }
}

const dangerous = new Set();
for (let [hash, count] of counter.entries()) {
  if (count > 1) {
    dangerous.add(hash);
  }
}

console.log(dangerous.size);
