import { testInput, input } from "./5-input";

const [ranges, ingredients] = input
	.split("\n\n")
	.map((lines) => lines.split("\n"));

let freshIngredients = 0;
for (const ingredient of ingredients) {
	const ingredientN = Number(ingredient);
	for (const range of ranges) {
		const [startRange, endRange] = range.split("-");
		if (ingredientN >= Number(startRange) && ingredientN <= Number(endRange)) {
			freshIngredients++;
			break;
		}
	}
}
console.log(freshIngredients);
