const { getMaxCalories, getMaxCaloriesOf3Elves } = require(".");
const { importFile } = require("../../helpers");

const input = importFile(__dirname)
console.log(getMaxCalories(input))
console.log(getMaxCaloriesOf3Elves(input))