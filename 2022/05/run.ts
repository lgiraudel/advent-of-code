import { getFinalWord, getFinalWordV2 } from ".";
import $ from '../../helpers/index';

const input = $.file.importFile(__dirname)

console.log(getFinalWord(input))
console.log(getFinalWordV2(input))