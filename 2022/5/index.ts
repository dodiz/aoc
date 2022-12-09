import { input, inputMock } from "./input";

const arr = input.split("\n");

const stacksHorizontal: string[] = [];
const moves: string[] = [];
let found = false;
arr.forEach((el, i) => {
  if (!el) {
    found = true;
    return;
  }
  if (found) {
    moves.push(el);
  } else {
    stacksHorizontal.push(el);
  }
});
const stacksHorizontalReversed = stacksHorizontal.reverse().splice(1);
const arrLength = stacksHorizontalReversed[0]
  .replace(/\[/g, "")
  .replace(/]/g, "")
  .split(" ").length;
const stacksVertical: string[][] = Array(10)
  .fill(0)
  .map(() => []);

stacksHorizontalReversed.forEach((el) => {
  const crates = el.replace(/\[/g, " ").replace(/]/g, " ");
  let verticalStackPointer = 0;
  for (let i = 1; i < crates.length; i += 4) {
    if (crates.charAt(i) !== " ") {
      stacksVertical[verticalStackPointer].push(crates.charAt(i));
    }
    verticalStackPointer++;
  }
});

const arrangedMoves = moves.map((move) =>
  move
    .replace("move", "")
    .replace("from", "")
    .replace("to", "")
    .trim()
    .split("  ")
    .map((e) => +e)
);

arrangedMoves.forEach(([nMoves, start, end]) => {
  const multiple: string[] = [];
  for (let i = 0; i < nMoves; i++) {
    const el = stacksVertical[start - 1].pop();
    multiple.push(el as string);
  }
  stacksVertical[end - 1].push(...multiple.reverse());
});
let finalString = "";
stacksVertical.forEach((s) => {
  finalString += s[s.length - 1];
});
console.log(finalString);
