import { inputMock, input } from "./input";
let register = 1;
let cycle = 1;
let totalSignals = 0;
const cycleOffset = 20;
let str = "";
const inputs = input.split("\n").map((i) => i.split(" "));
function checkCycle(cycle: number) {
  //Part 1
  if (cycle === 20 || (cycle - cycleOffset) % 40 === 0) {
    totalSignals += register * cycle;
  }
  //Part 2
  const rowPos = cycle % 40;
  if (rowPos === 0) {
    console.log(str);
    str = "";
  } else {
    if (rowPos >= register && rowPos <= register + 2) str += "#";
    else str += ".";
  }
}
inputs.forEach(([command, value]) => {
  checkCycle(cycle);
  cycle++;
  if (command === "addx") {
    checkCycle(cycle);
    cycle++;
    register += +value;
  }
});
//Part 1
console.log(totalSignals);
