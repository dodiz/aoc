import { input, inputTest } from "./input";

const isTest = process.argv.find((t) => t === "-t" || t === "--test");
const inputs = isTest ? inputTest.split("\n") : input.split("\n");

export default function main() {
	console.time("part1");
	const lists = inputs.map((line) =>
		line
			.split("\n")
			.map((location) => location.split("  ").map(Number))
			.flat(),
	);
	const leftList: number[] = [];
	const rightList: number[] = [];
	for (const value of lists) {
		leftList.push(value[0]);
		rightList.push(value[1]);
	}
	leftList.sort((a, b) => a - b);
	rightList.sort((a, b) => a - b);
	let distance = 0;
	for (let i = 0; i < leftList.length; i++) {
		distance += Math.abs(leftList[i] - rightList[i]);
	}
	console.log("Part 1 ", distance);

	let similarityScore = 0;
	for (let i = 0; i < leftList.length; i++) {
		let occurences = 0;
		for (let j = 0; j < rightList.length; j++) {
			if (rightList[j] < leftList[i]) continue;
			else if (rightList[j] === leftList[i]) occurences++;
			else break;
		}
		similarityScore += occurences * leftList[i];
	}
	console.log("Part 2", similarityScore);
	console.timeEnd("part1");
}
