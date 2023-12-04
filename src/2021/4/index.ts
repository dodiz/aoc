import { input, inputMock } from "./input";
type Cell = {
  value: number;
  marked: boolean;
};
const [numbersString, ...tablesString] = input.split("\n\n");

const tables: Cell[][][] = tablesString.map((t) =>
  t.split("\n").map((row) =>
    row
      .replace(/\s\s/g, " ")
      .trim()
      .split(" ")
      .map((n) => ({
        value: Number(n),
        marked: false,
      }))
  )
);

const numbers = numbersString.split(",").map((n) => +n);
let winTable: null | Cell[][] = null;
let n = 0;
while (!winTable && n < numbers.length) {
  for (let t = 0; t < tables.length; t++) {
    tables[t].forEach((r) => {
      r.forEach((c) => {
        if (c.value === numbers[n]) c.marked = true;
      });
    });
  }
  let bingoRow = true;
  for (let t = 0; t < tables.length; t++) {
    for (let r = 0; r < tables[t].length; r++) {
      bingoRow = true;
      for (let c = 0; c < tables[t][r].length; c++) {
        const cell = tables[t][r][c];
        if (!cell.marked) {
          bingoRow = false;
        }
      }
      if (bingoRow) break;
    }
    if (bingoRow) {
      winTable = tables[t];
      break;
    }
  }
  let bingoColumn = true;
  for (let t = 0; t < tables.length; t++) {
    for (let c = 0; c < tables[t].length; c++) {
      bingoColumn = true;
      for (let r = 0; r < tables[t][c].length; r++) {
        const cell = tables[t][r][c];
        if (!cell.marked) {
          bingoColumn = false;
        }
      }
      if (bingoColumn) break;
    }
    if (bingoColumn) {
      winTable = tables[t];
      break;
    }
  }
  n++;
}
const result =
  winTable?.reduce(
    (acc, row) =>
      acc +
      row.reduce(
        (accCell, cell) => accCell + (cell.marked ? 0 : cell.value),
        0
      ),
    0
  ) || 0;
console.log(result * numbers[n - 1]);
