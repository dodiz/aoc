import { testInput, input } from "./3-input";

const packs = input.split("\n");

let totalJoltage = 0;
const DIGITS = 12;

for (const pack of packs) {
	let slicedPack = pack;
	let digits = "";
	for (let j = 0; j < DIGITS; j++) {
		const digitsToFill = DIGITS - j;
		let maxIndex = 0;
		for (let i = 0; i < slicedPack.length; i++) {
			const digit = Number(slicedPack[i]);
			const availableDigits = slicedPack.length - i;
			if (
				digit > Number(slicedPack[maxIndex]) &&
				availableDigits >= digitsToFill
			) {
				maxIndex = i;
			}
		}
		digits += slicedPack[maxIndex];
		slicedPack = slicedPack.slice(maxIndex + 1);
	}
	totalJoltage += Number(digits);
}
console.log(totalJoltage);
