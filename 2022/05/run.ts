import { getFinalWord, getFinalWordV2 } from ".";

const { importFile } = require("../../helpers");

const input = importFile(__dirname)
console.log(getFinalWord(input))
console.log(getFinalWordV2(input))