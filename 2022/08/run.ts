import { puzzle1, puzzle2 } from ".";

const { importFile } = require("../../helpers");

const input = importFile(__dirname)

console.log(puzzle1(input))
console.log(puzzle2(input))
