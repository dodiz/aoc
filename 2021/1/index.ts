import { measurements, measurementsMock } from "./input";

// Part 1
const measurementsArray = measurements.split("\n").map((e) => +e);
let increased = 0;
for (let i = 1; i < measurementsArray.length; i++) {
  if (measurementsArray[i] > measurementsArray[i - 1]) increased++;
}
console.log(increased);

let prevSum = 0,
  currentSum = 0,
  increasedCounter = 0;
for (let i = 0; i < measurementsArray.length - 2; i++) {
  prevSum = currentSum;
  currentSum =
    measurementsArray[i] + measurementsArray[i + 1] + measurementsArray[i + 2];
  if (prevSum && currentSum > prevSum) increasedCounter++;
}
console.log(increasedCounter);
