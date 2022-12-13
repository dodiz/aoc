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

const pairs = inputMock.split("\n\n").map((pair) => {
  const [firstPair, secondPair] = pair.split("\n");
  return [destructurePacket(firstPair), destructurePacket(secondPair)];
});

function compareOrder(left: Packet, right: Packet): any {
  console.log("comparing", left, right);
  const max = left.length > right.length ? left.length : right.length;
  for (let i = 0; i < max; i++) {
    if (left[i] !== undefined && right[i] === undefined) return false;
    if (left[i] === undefined && right[i] !== undefined) return true;
    if (!Array.isArray(left[i]) && !Array.isArray(right[i])) {
      if (left[i] < right[i]) return true;
      if (left[i] > right[i]) return false;
      else continue;
    }
    if (!Array.isArray(left[i]) && Array.isArray(right[i])) {
      return compareOrder([left[i]], right[i]);
    }
    if (Array.isArray(left[i]) && !Array.isArray(right[i])) {
      return compareOrder(left[i], [right[i]]);
    }
    const help = compareOrder(left[i], right[i]);
    if (help !== undefined) return help;
  }
  return undefined;
}

let rightOrderPairs = 0;
pairs.forEach(([first, second], i) => {
  if (compareOrder(first, second)) {
    rightOrderPairs += i + 1;
    console.log(`Pairs ${i + 1} in order`);
  }
});
console.log(rightOrderPairs);
