import { calories, caloriesTest } from "./1-input";

const caloriesByElves = calories
	.split("\n\n")
	.map((arr) => arr.split("\n").reduce((acc, curr) => acc + Number(curr), 0));

let totalCalories = 0;
for (let i = 0; i < 3; i++) {
	const maxCalories = Math.max(...caloriesByElves);
	const index = caloriesByElves.findIndex((c) => c === maxCalories);
	caloriesByElves.splice(index, 1);
	totalCalories += maxCalories;
}
console.log(totalCalories);
