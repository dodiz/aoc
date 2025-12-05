import { report, reportMock } from "./3-input";

function binaryToDecimal(binary: string) {
	let n = 0;
	for (let i = 0; i < binary.length; i++) {
		n += +binary[i] * Math.pow(2, binary.length - i - 1);
	}
	return n;
}

const table = report.split("\n").map((el) => el.split("").map((el) => +el));
function step1() {
	let gammaRate = "",
		epsilonRate = "";
	for (let i = 0; i < table[0].length; i++) {
		let ones = 0,
			zeroes = 0;
		for (let j = 0; j < table.length; j++) table[j][i] ? ones++ : zeroes++;
		if (ones > zeroes) {
			gammaRate += "1";
			epsilonRate += "0";
		} else {
			gammaRate += "0";
			epsilonRate += "1";
		}
	}
	console.log(binaryToDecimal(gammaRate) * binaryToDecimal(epsilonRate));
}
step1();
function step2() {
	const reportLines = reportMock.split("\n");
	let pointer = 0;
	let zeroes = 0;
	let ones = 0;
	let oxygenRating: string[] = [...reportLines];
	let co2Rating: string[] = [...reportLines];
	while (oxygenRating.length !== 1) {
		zeroes = 0;
		ones = 0;
		oxygenRating.forEach((l) => {
			l.charAt(pointer) === "0" ? zeroes++ : ones++;
		});
		oxygenRating = oxygenRating.filter(
			(l) =>
				(zeroes > ones && l.charAt(pointer) === "0") ||
				(ones >= zeroes && l.charAt(pointer) === "1"),
		);
		pointer++;
	}
	pointer = 0;
	while (co2Rating.length !== 1) {
		zeroes = 0;
		ones = 0;
		co2Rating.forEach((l) => {
			l.charAt(pointer) === "0" ? zeroes++ : ones++;
		});
		co2Rating = co2Rating.filter(
			(l) =>
				(zeroes <= ones && l.charAt(pointer) === "0") ||
				(ones < zeroes && l.charAt(pointer) === "1"),
		);
		pointer++;
	}
	console.log(binaryToDecimal(oxygenRating[0]) * binaryToDecimal(co2Rating[0]));
}
step2();
