console.time("exec time");
import { input, inputMock } from "./input";

const sensors: { column: number; row: number; distance: number }[] = [];
const beacons: { column: number; row: number }[] = [];

input.split("\n").forEach((line) => {
  const sensorColumn = +line.slice(line.indexOf("x=") + 2, line.indexOf(","));
  const sensorRow = +line.slice(line.indexOf("y=") + 2, line.indexOf(":"));
  const beaconColumn = +line.slice(
    line.lastIndexOf("x=") + 2,
    line.lastIndexOf(",")
  );
  const beaconRow = +line.slice(line.lastIndexOf("y=") + 2, line.length);

  sensors.push({
    column: +sensorColumn,
    row: +sensorRow,
    distance:
      Math.abs(sensorColumn - beaconColumn) + Math.abs(sensorRow - beaconRow),
  });
  beacons.push({
    column: +beaconColumn,
    row: +beaconRow,
  });
});

function step1() {
  let minRow = Infinity,
    minColumn = Infinity,
    maxRow = -Infinity,
    maxColumn = -Infinity;

  sensors.forEach((s) => {
    if (s.column < minColumn) minColumn = s.column;
    if (s.column > maxColumn) maxColumn = s.column;
    if (s.row < minRow) minRow = s.row;
    if (s.row > maxRow) maxRow = s.row;
  });
  beacons.forEach((b) => {
    if (b.column < minColumn) minColumn = b.column;
    if (b.column > maxColumn) maxColumn = b.column;
    if (b.row < minRow) minRow = b.row;
    if (b.row > maxRow) maxRow = b.row;
  });

  const rowNumber = 2000000;
  const singleRow = Array(Math.abs(minColumn) + Math.abs(maxColumn))
    .fill(0)
    .map((_, i) => {
      const beacon = beacons.find(
        (b) => b.column === i + minColumn && b.row === rowNumber
      );
      const sensor = sensors.find(
        (s) => s.column - minColumn === i + minColumn && s.row === rowNumber
      );
      if (sensor) return "S";
      if (beacon) return "B";
      for (let s = 0; s < sensors.length; s++)
        if (
          Math.abs(sensors[s].column - (i + minColumn)) +
            Math.abs(sensors[s].row - rowNumber) <=
          sensors[s].distance
        ) {
          return "#";
        }
      return ".";
    });
  console.log(
    singleRow.reduce((a, c) => a + (c === "#" || c === "S" ? 1 : 0), 0)
  );
}
async function step2() {
  const range = 4000000;
  let beaconY = 0,
    beaconX = 0;
  for (let row = 0; row <= range; row++) {
    let arr: any[] = [];
    for (let s = 0; s < sensors.length; s++) {
      const remainingDistance =
        sensors[s].distance - Math.abs(sensors[s].row - row);
      if (remainingDistance >= 0) {
        const remainingDistanceLeft =
          sensors[s].column - remainingDistance < 0
            ? 0
            : sensors[s].column - remainingDistance;
        const remainingDistanceRight =
          sensors[s].column + remainingDistance <= range
            ? sensors[s].column + remainingDistance
            : range;

        let pushedAlready = false;
        for (let i = 0; i < arr.length; i++) {
          const min = arr[i][0];
          const max = arr[i][1];
          if (remainingDistanceRight < min || remainingDistanceLeft > max)
            continue;
          if (remainingDistanceLeft <= min && remainingDistanceRight <= max) {
            arr[i][0] = remainingDistanceLeft;
            pushedAlready = true;
            break;
          } else if (
            remainingDistanceLeft >= min &&
            remainingDistanceRight >= max
          ) {
            arr[i][1] = remainingDistanceRight;
            pushedAlready = true;
            break;
          } else if (
            remainingDistanceLeft >= min &&
            remainingDistanceRight <= max
          ) {
            pushedAlready = true;
            break;
          }
        }

        if (!pushedAlready) {
          arr.push([remainingDistanceLeft, remainingDistanceRight]);
        }
      }
    }
    arr.sort((a, b) => (a[0] < b[0] ? -1 : 1));
    let changesWereMade = true;
    while (changesWereMade) {
      changesWereMade = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i][0] <= arr[i + 1][0] && arr[i][1] >= arr[i + 1][1]) {
          arr.splice(i + 1, 1);
          changesWereMade = true;
        } else if (
          arr[i][0] <= arr[i + 1][0] &&
          arr[i][1] + 1 >= arr[i + 1][0]
        ) {
          arr[i][1] = arr[i + 1][1];
          arr.splice(i + 1, 1);
          changesWereMade = true;
        }
      }
    }
    if (arr.length > 1) {
      beaconY = row;
      beaconX = arr[0][1] + 1;
      break;
    }
  }
  const result = "tuning frequency: " + (beaconX * 4000000 + beaconY);
  console.log(result);
}
step1();
step2();
console.timeEnd("exec time");
