import { countOverlapingSections, countPairsWithOneRangeInTheOther } from ".";

const { importFile } = require("../../helpers");

const input = importFile(__dirname)
console.log(countPairsWithOneRangeInTheOther(input))
console.log(countOverlapingSections(input))
