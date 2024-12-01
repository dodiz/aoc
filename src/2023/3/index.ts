import { input, inputTest } from "./input";

const isTest = process.argv.find((t) => t === "-t" || t === "--test");
const inputs = isTest ? inputTest.split("\n") : input.split("\n");

async function part1() {
	let sum = 0;
	inputs.forEach((line, lineIndex) => {
		let number = "";
		for (let charIndex = 0; charIndex < line.length; charIndex++) {
			const char = line.charAt(charIndex);
			if (!isNaN(+char)) {
				number += char;
			}
			const nextChar = line.charAt(charIndex + 1) || ".";
			if (isNaN(+nextChar)) {
				for (let digitIndex = 0; digitIndex < number.length; digitIndex++) {
					const prevIndex = charIndex - digitIndex;
					const top = inputs[lineIndex - 1]?.charAt(prevIndex) || ".";
					const topRight = inputs[lineIndex - 1]?.charAt(prevIndex + 1) || ".";
					const right = line.charAt(prevIndex + 1) || ".";
					const bottomRight =
						inputs[lineIndex + 1]?.charAt(prevIndex + 1) || ".";
					const bottom = inputs[lineIndex + 1]?.charAt(prevIndex) || ".";
					const bottomLeft =
						inputs[lineIndex + 1]?.charAt(prevIndex - 1) || ".";
					const left = line.charAt(prevIndex - 1) || ".";
					const topLeft = inputs[lineIndex - 1]?.charAt(prevIndex - 1) || ".";
					const isTopSymbol = top !== "." && isNaN(+top);
					const isTopRightSymbol = topRight !== "." && isNaN(+topRight);
					const isRightSymbol = right !== "." && isNaN(+right);
					const isBottomRightSymbol =
						bottomRight !== "." && isNaN(+bottomRight);
					const isBottomSymbol = bottom !== "." && isNaN(+bottom);
					const isBottomLeftSymbol = bottomLeft !== "." && isNaN(+bottomLeft);
					const isLeftSymbol = left !== "." && isNaN(+left);
					const isTopLeftSymbol = topLeft !== "." && isNaN(+topLeft);
					if (
						isTopSymbol ||
						isTopRightSymbol ||
						isRightSymbol ||
						isBottomRightSymbol ||
						isBottomSymbol ||
						isBottomLeftSymbol ||
						isLeftSymbol ||
						isTopLeftSymbol
					) {
						sum += +number;
						break;
					}
				}
				number = "";
			}
		}
	});
	console.log(sum);
}

async function part2() {
	const gears = [] as { charIndex: number; lineIndex: number }[];
	inputs.forEach((line, lineIndex) => {
		for (let charIndex = 0; charIndex < line.length; charIndex++) {
			const char = line.charAt(charIndex);
			if (char === "#") {
				gears.push({ charIndex, lineIndex });
			}
		}
	});
	gears.forEach((gear) => {
		const top = inputs[gear.lineIndex - 1]?.charAt(gear.charIndex);
	});
}

export default async function main() {
	await part1();
	await part2();
}
