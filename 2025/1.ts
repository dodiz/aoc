import { testInput, input } from "./1-input";

let index = 50;
const lines = input.split("\n").map((line) => ({
	direction: line[0],
	value: parseInt(line.slice(1)),
}));

let zeroCount = 0;

for (const line of lines) {
	console.log(
		`${index < 10 ? "0" : ""}${index} - ${line.direction}${line.value}, Z: ${zeroCount}`,
	);
	if (line.direction === "L") {
		const delta = index - line.value;
		let zeroIncrement = Math.abs(Math.trunc(delta / 100));
		if (delta <= 0 && index !== 0) {
			zeroIncrement++;
		}
		zeroCount += zeroIncrement;
		const offset = delta % 100;
		if (offset < 0) {
			index = 100 + offset;
		} else {
			index = offset;
		}
	} else {
		const delta = index + line.value;
		const zeroIncrement = Math.trunc(delta / 100);
		zeroCount += zeroIncrement;
		index = delta % 100;
	}
}
console.log(zeroCount);
