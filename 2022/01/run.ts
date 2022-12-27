const { getMaxCalories, getMaxCaloriesOf3Elves } = require(".");
import $ from '../../helpers/index';

const input = $.file.importFile(__dirname)

console.log(getMaxCalories(input))
console.log(getMaxCaloriesOf3Elves(input))