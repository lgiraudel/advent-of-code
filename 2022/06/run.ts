import { getStartOfMessageMarkerPosition, getStartOfPacketMarkerPosition } from ".";
import $ from '../../helpers/index';

const input = $.file.importFile(__dirname)

console.log(getStartOfPacketMarkerPosition(input[0]))
console.log(getStartOfMessageMarkerPosition(input[0]))