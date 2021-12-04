const fs = require("fs");

const [numbersRaw, ...boardsRaw] = fs
  .readFileSync("./4/input.txt", "utf-8")
  .trim()
  .split("\n\n");

const numbers = numbersRaw.split(",").map((s) => Number(s));
const boards = boardsRaw
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
  }));

// const mapper = (x) => Array.from(x.values());
// console.log(
//   boards.map((o) => ({
//     rows: o.rows.map(mapper).join(":"),
//     columns: o.columns.map(mapper).join(":"),
//   }))
// );

for (let i = 0; i < numbers.length; i++) {
  const number = numbers[i];
  for (let board of boards) {
    const { rows, columns } = board;
    const deleter = (set) => set.delete(number);
    rows.forEach(deleter);
    columns.forEach(deleter);

    if (
      rows.some((row) => row.size === 0) ||
      columns.some((column) => column.size === 0)
    ) {
      const summator = (sum, set) =>
        sum + Array.from(set).reduce((sum, n) => sum + n, 0);
      const score = rows.reduce(summator, 0);
      console.log(score, number);
      console.log(score * number);
      return;
    }
  }
}
