import { input, inputMock, inputMock2 } from "./input";
/* 
OLD VERSION NO OBJS
const actions = inputMock.split("\n").map((a) => a.split(" "));
const tailPositions = new Set<string>();
let headPosition = "1a1";
let tailsPositions = Array(9).fill("1a1");

function fixAngle(tailPos: number, headPos: number) {
  if (tailPos <= headPos - 1) return 1;
  if (tailPos >= headPos + 1) return -1;
  return 0;
}
function findNewPos(tailPosition: string, currentHead: string) {
  let [tailX, tailY] = tailPosition.split("a").map((e: string) => +e);
  const [currHeadX, currHeadY] = currentHead.split("a").map((e: string) => +e);
  if (tailX === currHeadX - 2) {
    tailX++;
    tailY += fixAngle(tailY, currHeadY);
  } else if (tailY === currHeadY - 2) {
    tailY++;
    tailX += fixAngle(tailX, currHeadX);
  } else if (tailX === currHeadX + 2) {
    tailX--;
    tailY += fixAngle(tailY, currHeadY);
  } else if (tailY === currHeadY + 2) {
    tailY--;
    tailX += fixAngle(tailX, currHeadX);
  }
  return `${tailX}a${tailY}`;
}
actions.forEach(([dir, offset], k) => {
  for (let i = 0; i < +offset; i++) {
    let [headX, headY] = headPosition.split("a").map((e) => +e);
    switch (dir) {
      case "U":
        headY++;
        break;
      case "R":
        headX++;
        break;
      case "D":
        headY--;
        break;
      default:
        headX--;
        break;
    }
    headPosition = `${headX}a${headY}`;
    for (let i = 0; i < tailsPositions.length; i++) {
      const tailPosition = tailsPositions[i];
      const currentHead = i === 0 ? headPosition : tailsPositions[i - 1];
      const newPosition = findNewPos(tailPosition, currentHead);
      tailsPositions[i] = newPosition;
    }
    tailPositions.add(tailsPositions[tailsPositions.length - 1]);

    if (true) {
      let str = "";
      const xSize = 8;
      const ySize = 8;
      console.log(
        Array(ySize + 1)
          .fill(0)
          .map((_, i) => i)
          .join("")
      );
      for (let i = 0; i < ySize; i++) {
        str += i + 1;
        for (let j = 0; j < xSize; j++) {
          let found = false;
          if (headY === ySize - i && headX === j) {
            found = true;
            str += "H";
          } else
            for (let w = 1; w < tailsPositions.length; w++)
              if (
                tailsPositions[w - 1].split("a")[1] == ySize - i &&
                tailsPositions[w - 1].split("a")[0] == j
              ) {
                str += "" + w;
                found = true;
                break;
              }
          if (!found) str += ".";
        }
        str += "\n";
      }
      console.log(str + "\n");
    }
  }
}); 
console.log(tailPositions.size);
*/

type Coords = { x: number; y: number };
const actions = inputMock.split("\n").map((a) => a.split(" "));
const tailPositions = new Set<string>();
const headPosition: Coords = { x: 1, y: 1 };

const tailsPositions: Coords[] = Array(9)
  .fill(0)
  .map((e) => ({ x: 1, y: 1 }));

function fixAngle(tailPos: number, headPos: number) {
  if (tailPos <= headPos - 1) return 1;
  if (tailPos >= headPos + 1) return -1;
  return 0;
}
function calcNewPos(tailPosition: Coords, currentHead: Coords) {
  const { x: tailX, y: tailY } = tailPosition;
  if (tailX === currentHead.x - 2) {
    tailPosition.x++;
    tailPosition.y += fixAngle(tailY, currentHead.y);
  } else if (tailY === currentHead.y - 2) {
    tailPosition.y++;
    tailPosition.x += fixAngle(tailPosition.x, currentHead.x);
  } else if (tailX === currentHead.x + 2) {
    tailPosition.x--;
    tailPosition.y += fixAngle(tailY, currentHead.y);
  } else if (tailY === currentHead.y + 2) {
    tailPosition.y--;
    tailPosition.x += fixAngle(tailX, currentHead.x);
  }
  return `${tailX}a${tailY}`;
}
actions.forEach(([dir, offset], k) => {
  for (let i = 0; i < +offset; i++) {
    switch (dir) {
      case "U":
        headPosition.y++;
        break;
      case "R":
        headPosition.x++;
        break;
      case "D":
        headPosition.y--;
        break;
      default:
        headPosition.x--;
        break;
    }
    for (let i = 0; i < tailsPositions.length; i++) {
      const tailPosition = tailsPositions[i];
      const currentHead = i === 0 ? headPosition : tailsPositions[i - 1];
      calcNewPos(tailPosition, currentHead);
    }
    tailPositions.add(
      `${tailsPositions[tailsPositions.length - 1].x}a${
        tailsPositions[tailsPositions.length - 1].y
      }`
    );

    if (true) {
      let str = "";
      const xSize = 8;
      const ySize = 8;
      console.log(
        Array(ySize + 1)
          .fill(0)
          .map((_, i) => i)
          .join("")
      );
      for (let i = 0; i < ySize; i++) {
        str += i + 1;
        for (let j = 0; j < xSize; j++) {
          let found = false;
          if (headPosition.y === ySize - i && headPosition.x === j) {
            found = true;
            str += "H";
          } else
            for (let w = 1; w < tailsPositions.length; w++)
              if (
                tailsPositions[w - 1].y == ySize - i &&
                tailsPositions[w - 1].x == j
              ) {
                str += "" + w;
                found = true;
                break;
              }
          if (!found) str += ".";
        }
        str += "\n";
      }
      console.log(str + "\n");
    }
  }
});
console.log(tailPositions.size);
