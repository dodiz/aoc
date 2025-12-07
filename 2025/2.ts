import { testInput, input } from "./2-input";

const ranges = input.split(",");

let sum = 0;
for (const range of ranges) {
	const rangeInterval = range.split("-");
	const start = Number(rangeInterval[0]);
	const end = Number(rangeInterval[1]);
	for (let i = start; i <= end; i++) {
		if (checkValid(i)) {
			sum += i;
		}
	}
}
console.log(sum);

function checkValid(id: number) {
	const idStr = id.toString();
	let pattern = "";
	for (let i = 0; i < idStr.length; i++) {
		pattern += idStr.charAt(i);
		let hasPattern = true;
		if (pattern.length > idStr.length / 2) {
			break;
		}
		for (let j = 0; j < idStr.length; j += pattern.length) {
			const idSliced = idStr.slice(j, j + pattern.length);
			if (idSliced !== pattern) {
				hasPattern = false;
				break;
			}
		}
		if (hasPattern) {
			return true;
		}
	}
	return false;
}
