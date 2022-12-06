import { getBadgesSum, getWronglyLoadedItemsPrioritySum } from ".";
const { importFile } = require("../../helpers");

const input = importFile(__dirname)
console.log(getWronglyLoadedItemsPrioritySum(input))
console.log(getBadgesSum(input))
