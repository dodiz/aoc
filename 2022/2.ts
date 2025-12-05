import { movesMock, moves } from "./2-input";
enum MOVES {
	ROCK,
	PAPER,
	SCISSOR,
}
enum RESULTS {
	WIN,
	LOSE,
	DRAW,
}
function getResultFromXYZ(str: string) {
	if (str === "X") return RESULTS.LOSE;
	if (str === "Y") return RESULTS.DRAW;
	return RESULTS.WIN;
}
class Move {
	move: MOVES = MOVES.ROCK;
	points = 0;
	static buildByABC(moveStr: string) {
		let move: MOVES;
		if (moveStr === "A") move = MOVES.ROCK;
		else if (moveStr === "B") move = MOVES.PAPER;
		else move = MOVES.SCISSOR;

		return new Move(move);
	}
	static buildByXYZ(moveStr: string) {
		let move: MOVES;
		if (moveStr === "X") move = MOVES.PAPER;
		else if (moveStr === "Y") move = MOVES.ROCK;
		else move = MOVES.SCISSOR;

		return new Move(move);
	}
	constructor(move: MOVES) {
		this.move = move;
		switch (move) {
			case MOVES.PAPER:
				this.points = 2;
				break;
			case MOVES.ROCK:
				this.points = 1;
				break;
			case MOVES.SCISSOR:
				this.points = 3;
				break;
		}
	}
	calcResultAgainst(opponentsMove: Move): RESULTS {
		if (
			(this.move === MOVES.ROCK && opponentsMove.move === MOVES.SCISSOR) ||
			(this.move === MOVES.PAPER && opponentsMove.move === MOVES.ROCK) ||
			(this.move === MOVES.SCISSOR && opponentsMove.move === MOVES.PAPER)
		)
			return RESULTS.WIN;
		if (this.move === opponentsMove.move) return RESULTS.DRAW;
		return RESULTS.LOSE;
	}
	static buildHandByResult(m: Move, result: RESULTS) {
		if (result === RESULTS.DRAW) return new Move(m.move);
		const win = result === RESULTS.WIN;
		if ((win && m.move === MOVES.ROCK) || (!win && m.move === MOVES.SCISSOR))
			return new Move(MOVES.PAPER);
		if ((win && m.move === MOVES.SCISSOR) || (!win && m.move === MOVES.PAPER))
			return new Move(MOVES.ROCK);
		return new Move(MOVES.SCISSOR);
	}
	static findResultByString(result: string) {
		if (result === "Y") return RESULTS.DRAW;
		if (result === "Z") return RESULTS.LOSE;
		return RESULTS.WIN;
	}
}
const movesArr = moves.split("\n").map((el) => el.split(" "));
function step1() {
	let score = 0;
	movesArr.forEach(([opp, my]) => {
		const myMove = Move.buildByXYZ(my);
		const opponentsMove = Move.buildByABC(opp);
		const result = myMove.calcResultAgainst(opponentsMove);
		if (result === RESULTS.WIN) score += 6;
		if (result === RESULTS.DRAW) score += 3;
		score += myMove.points;
	});
	console.log(score);
}
function step2() {
	let score = 0;
	movesArr.forEach(([opp, resultStr]) => {
		const opponentsMove = Move.buildByABC(opp);
		const result = getResultFromXYZ(resultStr);
		const myMove = Move.buildHandByResult(opponentsMove, result);
		if (result === RESULTS.WIN) score += 6;
		if (result === RESULTS.DRAW) score += 3;
		score += myMove.points;
	});
	console.log(score);
}
step2();
