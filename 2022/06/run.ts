import { getStartOfMessageMarkerPosition, getStartOfPacketMarkerPosition } from ".";

const { importFile } = require("../../helpers");

const input = importFile(__dirname)

console.log(getStartOfPacketMarkerPosition(input[0]))
console.log(getStartOfMessageMarkerPosition(input[0]))