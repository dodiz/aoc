import { inputMock, input } from "./input";
console.time("execution_time: ");
const treeGrid = input.split("\n").map((r) => r.split("").map((h) => +h));

function calcIsVisible(row: number, column: number) {
  const height = treeGrid[row][column];
  let isTopVisible = 0,
    isBottomVisible = 0,
    isLeftVisible = 0,
    isRightVisible = 0;
  for (let i = row - 1; i >= 0; i--) {
    if (height > treeGrid[i][column]) isTopVisible++;
    else {
      isTopVisible++;
      break;
    }
  }
  for (let i = row + 1; i < treeGrid.length; i++) {
    if (height > treeGrid[i][column]) isBottomVisible++;
    else {
      isBottomVisible++;
      break;
    }
  }
  for (let i = column - 1; i >= 0; i--) {
    if (height > treeGrid[row][i]) isLeftVisible++;
    else {
      isLeftVisible++;
      break;
    }
  }
  for (let i = column + 1; i < treeGrid[row].length; i++) {
    if (height > treeGrid[row][i]) isRightVisible++;
    else {
      isRightVisible++;
      break;
    }
  }
  return isLeftVisible * isRightVisible * isTopVisible * isBottomVisible;
}
let maxScenicScore = 0;
for (let i = 1; i < treeGrid.length; i++) {
  for (let j = 1; j < treeGrid[i].length; j++) {
    const scenicScore = calcIsVisible(i, j);
    if (scenicScore > maxScenicScore) maxScenicScore = scenicScore;
  }
}
console.log(maxScenicScore);
console.timeEnd("execution_time: ");
