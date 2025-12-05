import { input, inputMock } from "./12-input";
const wait = (seconds: number) =>
	new Promise((r) => setTimeout(r, seconds * 1000));
const grid = inputMock.split("\n").map((row) => row.split(""));
console.log(inputMock);
type Pointer = {
	x: number;
	y: number;
	level: string;
};
const pointer: Pointer = {
	x: 0,
	y: 0,
	level: "a",
};

function print() {
	console.log(
		grid
			.map((row, i) =>
				row
					.map((c, j) => (i === pointer.y && j === pointer.x ? "S" : c))
					.join(""),
			)
			.join("\n"),
	);
	console.log("\n");
}

function findAround(x: number, y: number) {
	return {
		top: {
			x: x,
			y: y + 1,
			value: grid.length - 1 ? grid[y + 1][x] : "-",
		},
	};
}

async function step1() {
	let found = false;
	print();
	while (!found) {
		const row = pointer.y;
		const column = pointer.x;
		const top = row !== grid.length - 1 ? grid[row + 1][column] : "-";
		const bottom = row > 0 ? grid[row - 1][column] : "-";
		const left = column > 0 ? grid[row][column - 1] : "-";
		const right = column !== grid.length ? grid[row][column + 1] : "-";
		if (pointer.level.charCodeAt(0) === top.charCodeAt(0) - 1) {
			pointer.x++;
			pointer.level = grid[row][column + 1];
		} else if (column !== 0 && grid[row][column - 1] >= pointer.level) {
			pointer.x--;
			pointer.level = grid[row][column - 1];
		} else if (
			row !== grid.length - 1 &&
			grid[row + 1][column] >= pointer.level
		) {
			pointer.y++;
			pointer.level = grid[row + 1][column];
		} else if (row !== 0 && grid[row - 1][column] >= pointer.level) {
			pointer.y--;
			pointer.level = grid[row - 1][column];
		}
	}
}
step1();
