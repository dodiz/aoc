import { input, inputMock } from "./input";
const wait = (seconds: number) =>
  new Promise((r) => setTimeout(r, seconds * 1000));

let minX = 0,
  maxX = 0,
  maxY = 0;
//Find min and max coord
const lines = input.split("\n").map((line) =>
  line.split(" -> ").map((coords) =>
    coords.split(",").map((coord, i) => {
      if (i === 0) {
        const xCoord = +coord;
        if (minX === 0) minX = xCoord;
        if (xCoord < minX || minX === 0) minX = xCoord;
        if (xCoord > maxX) maxX = xCoord;
      } else {
        const yCoord = +coord;
        if (yCoord > maxY) maxY = yCoord;
      }
      return +coord;
    })
  )
);
let offsetX = maxY + 1;
function generateGrid() {
  return Array(maxY + 3)
    .fill(0)
    .map(() =>
      Array(maxX - minX + 1 + offsetX * 2)
        .fill(0)
        .map(() => " ")
    );
}
function drawLines(grid: string[][]) {
  lines.forEach((line) => {
    for (let i = 0; i < line.length - 1; i++) {
      const startX = line[i][0];
      const endX = line[i + 1][0];
      const startY = line[i][1];
      const endY = line[i + 1][1];
      if (startX === endX) {
        const min = startY < endY ? startY : endY;
        const max = startY > endY ? startY : endY;
        for (let j = min; j <= max; j++) grid[j][startX - minX + offsetX] = "#";
      } else {
        const min = startX < endX ? startX : endX;
        const max = startX > endX ? startX : endX;
        for (let j = min; j <= max; j++) grid[startY][j - minX + offsetX] = "#";
      }
    }
  });
}
const grid = generateGrid();
drawLines(grid);
grid[grid.length - 1] = grid[grid.length - 1].map(() => "#");
function print(grid: any[][], sand?: { x: number; y: number }) {
  grid.forEach((row, i) => {
    let str = "";
    row.forEach((column, j) => {
      str += sand ? (sand.x === j && sand.y === i ? "+" : column) : column;
    });
    console.log(str);
  });
}
async function step1() {
  let sandFellOff = false;
  let iterations = 0;
  while (!sandFellOff) {
    const sandPointer = {
      x: 500 - minX + offsetX,
      y: 0,
    };
    let sandStopped = false;
    while (!sandStopped) {
      await wait(0.1);
      console.clear();
      print(grid, { x: sandPointer.x, y: sandPointer.y });
      const nextDown = grid[sandPointer.y + 1][sandPointer.x];
      const nextRight = grid[sandPointer.y][sandPointer.x + 1];
      const nextLeft = grid[sandPointer.y][sandPointer.x - 1];
      if (nextLeft === undefined || nextRight === undefined) {
        sandStopped = true;
        sandFellOff = true;
      } else if (nextDown === " ") {
        sandPointer.y++;
      } else if (grid[sandPointer.y + 1][sandPointer.x - 1] === " ") {
        sandPointer.y++;
        sandPointer.x--;
      } else if (grid[sandPointer.y + 1][sandPointer.x + 1] === " ") {
        sandPointer.y++;
        sandPointer.x++;
      } else if (
        grid[sandPointer.y + 1][sandPointer.x] === "#" ||
        grid[sandPointer.y + 1][sandPointer.x] === "O"
      ) {
        grid[sandPointer.y][sandPointer.x] = "O";
        sandStopped = true;
        if (sandPointer.y === 0) sandFellOff = true;
      }
    }
    iterations++;
  }
  console.log(iterations);
}
step1();
