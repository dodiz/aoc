import { movementsMock, movements } from "./input";

const coords = {
  x: 0,
  y: 0,
  aim: 0,
};

function calcMovement(mov: "forward" | "down" | "up", value: number) {
  if (mov === "down") coords.aim += +value;
  if (mov === "up") coords.aim -= +value;
  if (mov === "forward") {
    coords.x += +value;
    coords.y += value * coords.aim;
  }
}

const movementsArray = movements.split("\n").map((el) => el.split(" "));
movementsArray.forEach((m) =>
  calcMovement(...(m as ["forward" | "down" | "up", number]))
);
console.log(coords.x * coords.y);
