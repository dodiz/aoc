import { inputMock, input } from "./input";
console.time("exec time");
type Valve = {
  name: string;
  value: number;
  neighbours: string[];
};
const valves: Valve[] = input.split("\n").map((line) => {
  const name = line.substring(6, 8);
  const value = line.substring(line.indexOf("=") + 1, line.indexOf(";"));
  const neighbours = line
    .substring(line.indexOf(";") + 1)
    .replace(/s/g, "")
    .replace("tunnel lead to valve", "")
    .trim()
    .split(", ");
  return {
    name,
    value: +value,
    neighbours,
  };
});
function findMinimumDistance(src: Valve, dst: Valve) {
  const visited = new Set<string>([src.name]);
  const queue: (string | number | undefined)[][] = [[src.name, 0]];
  while (queue.length > 0) {
    const [valveName, distance] = queue.shift() as [string, number];
    const currentValve = valves.find((v) => v.name === valveName) as Valve;
    if (valveName === dst.name) return distance;
    visited.add(valveName);

    for (let neighbour of currentValve.neighbours) {
      const neighbourValve = valves.find((v) => v.name === neighbour);
      if (visited.has(neighbour)) continue;
      queue.push([neighbourValve?.name, distance + 1]);
    }
  }
  return -1;
}
function totalPressurePaths(
  src: Valve,
  currentValves: Valve[],
  time: number,
  totalPressure: number
): number {
  if (!currentValves.length) return totalPressure;
  let max = totalPressure;
  for (const currentValve of currentValves) {
    const distanceFromSource = findMinimumDistance(src, currentValve);
    const timeLeft = time - distanceFromSource - 1;
    if (timeLeft < 0) {
      continue;
    }
    const incrementedTotalPressure =
      totalPressure + timeLeft * currentValve.value;

    const nextPressure = totalPressurePaths(
      currentValve,
      currentValves.filter((v) => v.name !== currentValve.name),
      timeLeft,
      incrementedTotalPressure
    );
    max = Math.max(max, nextPressure);
  }
  return max;
}
function step1() {
  const currentValve: Valve = valves.find((v) => v.name === "AA") as Valve;
  console.log(currentValve);
  console.log(
    totalPressurePaths(
      currentValve,
      valves.filter((v) => v.value > 0),
      30,
      0
    )
  );
}
step1();
console.timeEnd("exec time");
