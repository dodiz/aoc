import { input, inputTest } from "./input";
const isTest = process.argv.find((t) => t === "-t" || t === "--test");
const inputs = isTest ? inputTest.split("\n") : input.split("\n");

const numberKeys: Record<string, number> = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

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

export default async function part2() {
	part1();
	function findMinMax(line: string) {
		const literalNumbers = Object.keys(numberKeys)
			.filter((n) => {
				return line.search(n) !== -1;
			})
			.map((n) => {
				let newLine = line;
				const occurrences = [] as {
					value: number;
					index: number;
				}[];
				while (newLine.indexOf(n) !== -1) {
					occurrences.push({
						value: numberKeys[n],
						index: newLine.indexOf(n),
					});
					newLine = newLine.replace(
						n,
						Array(n.length)
							.fill(0)
							.map(() => "#")
							.join(""),
					);
				}
				return occurrences;
			})
			.flat()
			.sort((a, b) => a.index - b.index);
		const minChars = literalNumbers[0] || {
			value: 0,
			index: Infinity,
		};
		const maxChars = literalNumbers[literalNumbers.length - 1] || {
			value: 0,
			index: -1,
		};
		const minDigit = {
			value: 0,
			index: Infinity,
		};
		const maxDigit = {
			value: 0,
			index: -1,
		};
		for (let i = 0; i < line.length; i++) {
			const leftDigit = +line.charAt(i);
			const rightChar = +line.charAt(line.length - 1 - i);
			if (!isNaN(leftDigit) && minDigit.index === Infinity) {
				minDigit.index = i;
				minDigit.value = leftDigit;
			}
			if (!isNaN(rightChar) && maxDigit.index === -1) {
				maxDigit.index = line.length - 1 - i;
				maxDigit.value = rightChar;
			}
			if (maxDigit.index !== -1 && minDigit.index !== Infinity) break;
		}
		const min =
			minChars.index < minDigit.index ? minChars.value : minDigit.value;
		const max =
			maxChars.index > maxDigit.index ? maxChars.value : maxDigit.value;
		return min * 10 + max;
	}
	const sum = inputs.reduce((acc, curr) => {
		const result = findMinMax(curr);
		return acc + result;
	}, 0);
	console.log(sum);
	return sum;
}
