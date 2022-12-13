import { inputMock, input } from "./input";
type Packet = number[] & Packet[];
function destructurePacket(packet: string) {
  const arr: Packet = [];
  const packetWithoutSquares = packet.slice(1, packet.length - 1);

  for (let i = 0; i < packetWithoutSquares.length; i++) {
    if (packetWithoutSquares.charAt(i) === ",") continue;
    if (packetWithoutSquares.charAt(i) === "[") {
      const subStartIndex = i;
      let parenthesis = 1;
      while (parenthesis > 0) {
        i++;
        if (packetWithoutSquares.charAt(i) === "]") parenthesis--;
        else if (packetWithoutSquares.charAt(i) === "[") parenthesis++;
      }
      const subArr: Packet = destructurePacket(
        packetWithoutSquares.slice(subStartIndex, i + 1)
      );
      arr.push(subArr);
    }
    let n = "";
    for (
      ;
      packetWithoutSquares.charAt(i) !== "," &&
      i < packetWithoutSquares.length &&
      packetWithoutSquares.charAt(i) !== "]";
      i++
    ) {
      n += packetWithoutSquares.charAt(i);
    }
    if (n) arr.push(+n);
  }
  return arr;
}

const pairs = input.split("\n\n").map((pair) => {
  const [firstPair, secondPair] = pair.split("\n");
  return [destructurePacket(firstPair), destructurePacket(secondPair)];
});
function compareOrder(
  left: Packet,
  right: Packet,
  debug: boolean = false
): any {
  debug && console.log("Compare", left, "vs", right);
  const max = left.length > right.length ? left.length : right.length;
  for (let i = 0; i < max; i++) {
    debug && console.log("considering ", left[i], right[i]);

    if (left[i] !== undefined && right[i] === undefined) {
      debug &&
        console.log(
          "Right side ran out of items inputs are not in the right order"
        );
      return false;
    }
    if (left[i] === undefined && right[i] !== undefined) {
      debug &&
        console.log(
          "Left side ran out of iterms, so inputs are in the right order"
        );
      return true;
    }

    if (Array.isArray(left[i]) && Array.isArray(right[i])) {
      const help = compareOrder(left[i], right[i], debug);
      if (help !== undefined) return help;
    }

    if (!Array.isArray(left[i]) && !Array.isArray(right[i])) {
      if (left[i] < right[i]) {
        debug &&
          console.log("Left side is smaller, so inputs are in the right order");
        return true;
      } else if (left[i] > right[i]) {
        debug &&
          console.log(
            "Right side is smaller, so inputs are not in the right order"
          );
        return false;
      } else continue;
    }
    if (!Array.isArray(left[i]) && Array.isArray(right[i])) {
      debug &&
        console.log(
          "Mixed types, convert left to [" + left[i] + "]) and retry comparison"
        );
      const help = compareOrder([left[i]], right[i], debug);
      if (help !== undefined) return help;
    }
    if (Array.isArray(left[i]) && !Array.isArray(right[i])) {
      debug &&
        console.log(
          "Mixed types, convert right to [" +
            right[i] +
            "]) and retry comparison"
        );
      const help = compareOrder(left[i], [right[i]], debug);
      if (help !== undefined) return help;
    }
  }
  return undefined;
}

let rightOrderPairs = 0;
const totalPackets: any[] = [];
pairs.forEach(([first, second], i) => {
  totalPackets.push(first);
  totalPackets.push(second);
});
const marker1 = [[2]];
const marker2 = [[6]];
totalPackets.push(marker1);
totalPackets.push(marker2);
console.log(totalPackets.length);
for (let i = 0; i < totalPackets.length; i++) {
  console.log("ERROR " + i);
  for (let j = i; j > 0; j--) {
    if (compareOrder(totalPackets[j], totalPackets[j - 1])) {
      const temp = totalPackets[j];
      totalPackets[j] = totalPackets[j - 1];
      totalPackets[j - 1] = temp;
    }
  }
}
console.log(
  (totalPackets.indexOf(marker1) + 1) * (totalPackets.indexOf(marker2) + 1)
);
