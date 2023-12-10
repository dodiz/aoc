import { input, inputTest } from "./input";
const isTest = process.argv.find((t) => t === "-t" || t === "--test");
const inputs = isTest ? inputTest.split("\n") : input.split("\n");

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const games = inputs.map((line) => {
	const [gameString, setsString] = line.split(": ");
	const gameId = gameString.split(" ")[1];
	const sets = setsString.split("; ").map((set) => {
		const cubesString = set.split(", ");
		return cubesString.reduce(
			(cubesObj, cube) => {
				const [number, color] = cube.split(" ") as [
					number,
					"green" | "red" | "blue",
				];
				cubesObj[color] += +number;
				return cubesObj;
			},
			{
				green: 0,
				red: 0,
				blue: 0,
			},
		);
	});
	return {
		gameId: +gameId,
		sets,
	};
});
async function part1() {
	const filteredGames = games.filter((g) => {
		return g.sets.every((set) => {
			return (
				set.green <= MAX_GREEN && set.red <= MAX_RED && set.blue <= MAX_BLUE
			);
		});
	});
	console.log(filteredGames.reduce((acc, curr) => acc + curr.gameId, 0));
}

export default async function part2() {
	const filteredGames = games.map(
		(g) => {
			return g.sets.reduce((acc, set) => {
				return {
					green: acc.green > set.green ? acc.green : set.green,
					red: acc.red > set.red ? acc.red : set.red,
					blue: acc.blue > set.blue ? acc.blue : set.blue,
				};
			});
		},
		{
			green: 0,
			red: 0,
			blue: 0,
		},
	);
	console.log(
		filteredGames.reduce(
			(acc, curr) => curr.blue * curr.green * curr.red + acc,
			0,
		),
	);
}
