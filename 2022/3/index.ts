import { rucksacks, rucksacksMock } from "./input";

const LOWER_CASE_OFFSET = 96;
const UPPER_CASE_OFFSET = 38;
const UPPER_CASE_MAX_VALUE = 90;

function getPriorityFromChar(c: string) {
  let n = c.charCodeAt(0);
  if (n > UPPER_CASE_MAX_VALUE) return n - LOWER_CASE_OFFSET;
  return n - UPPER_CASE_OFFSET;
}
function step1() {
  const commonItems: Set<string>[] = rucksacks.split("\n").map((r) => {
    const common = new Set<string>();
    for (let i = 0; i < r.length / 2; i++) {
      for (let j = r.length / 2; j < r.length; j++) {
        if (r[i] === r[j]) common.add(r[i]);
      }
    }
    return common;
  });
  let sum = 0;
  commonItems.forEach((c) => {
    c.forEach((i) => {
      sum += getPriorityFromChar(i);
    });
  });
  console.log(sum);
}
function step2() {
  let sum = 0;
  const groupSize = 3;
  const rucksacksArr = rucksacks.split("\n");
  for (let i = 0; i < rucksacksArr.length; i += groupSize) {
    let groupArr: string[] = rucksacksArr.slice(i + 1, i + groupSize);
    const rucksack1 = rucksacksArr[i];
    for (let j = 0; j < rucksack1.length; j++) {
      const char = rucksack1.charAt(j);
      let found = true;
      groupArr.forEach((r) => {
        if (!r.includes(char)) {
          found = false;
        }
      });
      if (found) {
        sum += getPriorityFromChar(char);
        break;
      }
    }
  }
  console.log(sum);
}
step2();
