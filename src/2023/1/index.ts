import { input, inputTest } from "./input";
const inputs = input.split("\n");

const literalNumbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const;

type LiteralNumbers = keyof typeof literalNumbers;

function part1() {
  function calibrateLine(line: string) {
    let min: number | null = null;
    let max: number | null = null;
    for (let i = 0; i < line.length; i++) {
      const leftChar = +line.charAt(i);
      const rightChar = +line.charAt(line.length - 1 - i);
      if (!isNaN(leftChar) && max === null) {
        max = leftChar;
      }
      if (!isNaN(rightChar) && min === null) {
        min = rightChar;
      }
      if (max && min) break;
    }
    return (max || 0) * 10 + (min || 0);
  }
  const result = inputs.reduce((acc, curr) => {
    return acc + calibrateLine(curr);
  }, 0);

  console.log(result);
}

function part2() {
  function calibrateLine(line: string) {
    const { first, last } = Object.keys(literalNumbers)
      .filter((n) => line.search(n) !== -1)
      .map((n) => ({
        value: literalNumbers[n as LiteralNumbers],
        index: line.search(n),
      }))
      .reduce(
        (acc, curr) => {
          const { index, value } = curr;
          let first: number | null = null;
          let last: number | null = null;
          if (index < acc.first) {
            first = value;
          }
          if (index > acc.last) {
            last = value;
          }
          return {
            first: first || acc.first,
            last: last || acc.last,
          };
        },
        {
          first: 0,
          last: 0,
        }
      );
    let min: number | null = null;
    let max: number | null = null;
    for (let i = 0; i < line.length; i++) {
      const leftChar = +line.charAt(i);
      const rightChar = +line.charAt(line.length - 1 - i);
      if (!isNaN(leftChar) && max === null) {
        max = leftChar;
      }
      if (!isNaN(rightChar) && min === null) {
        min = rightChar;
      }
      if (max && min) break;
    }
    return (max || 0) * 10 + (min || 0);
  }
  const result = inputs.reduce((acc, curr) => {
    return acc + calibrateLine(curr);
  }, 0);

  console.log(result);
}
