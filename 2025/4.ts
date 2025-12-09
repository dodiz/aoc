import { testInput, input } from "./4-input";

const paperMatrix = input.split("\n").map((line) =>
	line.split("").map((paper) => {
		if (paper === "@") return 1;
		return 0;
	}),
);

let removedPapers = 0;
while (true) {
	let removedPapersIteration = 0;
	for (let i = 0; i < paperMatrix.length; i++) {
		for (let j = 0; j < paperMatrix[i].length; j++) {
			let adjacentPapers = 0;
			if (paperMatrix[i][j] !== 1) continue;
			if (!!paperMatrix[i - 1]?.[j - 1]) adjacentPapers++;
			if (!!paperMatrix[i - 1]?.[j]) adjacentPapers++;
			if (!!paperMatrix[i - 1]?.[j + 1]) adjacentPapers++;
			if (!!paperMatrix[i][j - 1]) adjacentPapers++;
			if (!!paperMatrix[i][j + 1]) adjacentPapers++;
			if (!!paperMatrix[i + 1]?.[j - 1]) adjacentPapers++;
			if (!!paperMatrix[i + 1]?.[j]) adjacentPapers++;
			if (!!paperMatrix[i + 1]?.[j + 1]) adjacentPapers++;
			if (adjacentPapers < 4) {
				removedPapersIteration++;
				paperMatrix[i][j] = 0;
			}
		}
	}
	removedPapers += removedPapersIteration;
	if (removedPapersIteration === 0) {
		break;
	}
}
console.log(removedPapers);
