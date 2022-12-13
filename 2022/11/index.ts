console.time("time");

import { inputMock, input } from "./input";

const monkeys = input.split("\n\n").map((monkey) => {
  const [_, itemsString, operationString, testStr, ifTrueStr, ifFalseStr] =
    monkey.split("\n");
  const items = itemsString
    .replace("Starting items:", "")
    .trim()
    .split(",")
    .map((e) => +e.trim());

  const operation = operationString
    .replace("Operation: new = old ", "")
    .trim()
    .split(" ");
  const test = testStr.split(" ");

  const ifTrue = ifTrueStr.split(" ");

  const ifFalse = ifFalseStr.split(" ");

  return {
    items,
    operation: {
      value: +operation[1],
      operand: +operation[1] ? operation[0] : "pow",
    },
    test: +test[test.length - 1],
    ifTrueMonkey: +ifTrue[ifTrue.length - 1],
    ifFalseMonkey: +ifFalse[ifFalse.length - 1],
    inspects: 0,
  };
});

const fuckingMonkeysTestsMcmKinda = monkeys.reduce((a, c) => c.test * a, 1);

for (let i = 1; i <= 10000; i++) {
  monkeys.forEach((monkey) => {
    while (monkey.items.length > 0) {
      let worryLevel = monkey.items[0];

      if (monkey.operation.operand === "pow") {
        worryLevel = Math.pow(worryLevel, 2);
      } else if (monkey.operation.operand === "+") {
        worryLevel += +monkey.operation.value;
      } else {
        worryLevel *= +monkey.operation.value;
      }

      const test = worryLevel % monkey.test === 0;

      const nextMonkey = test ? monkey.ifTrueMonkey : monkey.ifFalseMonkey;

      monkeys[nextMonkey].items.push(worryLevel % fuckingMonkeysTestsMcmKinda);
      monkey.items.shift();
      monkey.inspects++;
    }
  });
}
let max = 0,
  secondMax = 0;
monkeys.forEach((m) => {
  if (m.inspects > max) {
    secondMax = max;
    max = m.inspects;
  } else if (m.inspects > secondMax) {
    secondMax = m.inspects;
  }
});
console.log(max * secondMax);
console.timeEnd("time");
