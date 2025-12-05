import { inputMock, input } from "./6-input";

const signal = input;
let marker = "";
let i = 0;
for (i = 0; i < signal.length; i++) {
	const char = signal.charAt(i);
	if (marker.includes(char)) {
		let newMarker = "";
		for (let j = marker.indexOf(char) + 1; j < marker.length; j++) {
			newMarker += marker.charAt(j);
		}
		marker = newMarker;
	}
	marker += char;
	if (marker.length === 14) break;
}

console.log(marker, i + 1);
