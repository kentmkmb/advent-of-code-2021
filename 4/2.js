const fs = require("fs");

const [numbersRaw, ...boardsRaw] = fs
  .readFileSync("./4/input.txt", "utf-8")
  .trim()
  .split("\n\n");

const numbers = numbersRaw.split(",").map((s) => Number(s));
const boards = new Set(
  boardsRaw
    .map((boardRaw) =>
      boardRaw.split("\n").map((row) =>
        row
          .trim()
          .split(/\s+/)
          .map((s) => Number(s))
      )
    )
    .map((boardArray) => ({
      rows: boardArray.map((rowArray) => new Set(rowArray)),
      columns: Array(5)
        .fill(null)
        .map((_) => new Set())
        .map((set, i) => {
          boardArray.forEach((rowArray) => set.add(rowArray[i]));
          return set;
        }),
    }))
);

let number = null;
let lastDeletedBoard = null;
for (let i = 0; boards.size > 0 && i < numbers.length; i++) {
  number = numbers[i];
  for (let board of boards) {
    const { rows, columns } = board;
    const deleter = (set) => set.delete(number);
    rows.forEach(deleter);
    columns.forEach(deleter);

    if (
      rows.some((row) => row.size === 0) ||
      columns.some((column) => column.size === 0)
    ) {
      lastDeletedBoard = board;
      boards.delete(board);
    }
  }
}

const { rows } = lastDeletedBoard;
const summator = (sum, set) =>
  sum + Array.from(set).reduce((sum, n) => sum + n, 0);
const score = rows.reduce(summator, 0);
console.log(score, number);
console.log(score * number);
