import { testInput, input } from "./5-input";

const [ranges, ingredients] = input
	.split("\n\n")
	.map((lines) => lines.split("\n"));

let freshIngredients = 0;

/**
 * Part 1
 */
/* for (const ingredient of ingredients) {
		const ingredientN = Number(ingredient);
		for (const range of ranges) {
			const [startRange, endRange] = range.split("-");
			if (ingredientN >= Number(startRange) && ingredientN <= Number(endRange)) {
				freshIngredients++;
				break;
				}
				}
				} */

/**
 * rearrange ranges
 */
const sortedRanges = ranges
	.map((range) => {
		const [start, end] = range.split("-");
		return [Number(start), Number(end)];
	})
	.sort(([aStart, aEnd], [bStart, bEnd]) => {
		return aStart - bStart || aEnd - bEnd;
	});

const mergedRanges: [number, number][] = [];

for (let i = 0; i < sortedRanges.length; i++) {
	const [currStart, currEnd] = sortedRanges[i];
	let isDuplicate = false;
	for (let j = 0; j < mergedRanges.length; j++) {
		const mergedRange = mergedRanges[j];
		if (currStart >= mergedRange[0] && currEnd <= mergedRange[1]) {
			isDuplicate = true;
			break;
		} else if (currEnd >= mergedRange[0] && currEnd <= mergedRange[1]) {
			isDuplicate = true;
			mergedRange[0] = currStart;
			break;
		} else if (currStart >= mergedRange[0] && currStart <= mergedRange[1]) {
			isDuplicate = true;
			mergedRange[1] = currEnd;
			break;
		} else if (currStart <= mergedRange[0] && currEnd >= mergedRange[1]) {
			isDuplicate = true;
			mergedRange[0] = currStart;
			mergedRange[1] = currEnd;
			break;
		}
	}
	if (!isDuplicate) {
		mergedRanges.push([currStart, currEnd]);
	}
}
for (const mergedRange of mergedRanges) {
	freshIngredients += mergedRange[1] - mergedRange[0] + 1;
}
console.log(freshIngredients);
