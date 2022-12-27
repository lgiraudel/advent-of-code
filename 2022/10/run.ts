import { puzzle1, puzzle2 } from ".";
import $ from '../../helpers/index';

const input = $.file.importFile(__dirname)

console.log(puzzle1(input))
console.log(puzzle2(input))
