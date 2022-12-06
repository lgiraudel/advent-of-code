import { getTotalScore, getTotalScoreV2 } from ".";
const { importFile } = require("../../helpers");

const input = importFile(__dirname)
console.log(getTotalScore(input))
console.log(getTotalScoreV2(input))