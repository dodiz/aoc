import { input, inputMock } from "./input";

const pairs = input.split("\n").map((pair) => pair.split(","));
function step1() {
  let overlaps = 0;
  pairs.forEach(([first, second]) => {
    const [min1, max1] = first.split("-").map((n) => +n);
    const [min2, max2] = second.split("-").map((n) => +n);
    if ((min1 >= min2 && max1 <= max2) || (min2 >= min1 && max2 <= max1))
      overlaps++;
  });
  console.log(overlaps);
}
function step2() {
  let overlaps = 0;
  pairs.forEach(([first, second]) => {
    const [min1, max1] = first.split("-").map((n) => +n);
    const [min2, max2] = second.split("-").map((n) => +n);
    if (!(max1 < min2 || max2 < min1)) overlaps++;
  });
  console.log(overlaps);
}
step2();
