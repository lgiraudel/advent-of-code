import { getTotalScore, getTotalScoreV2 } from ".";
import $ from '../../helpers/index';

const input = $.file.importFile(__dirname)

console.log(getTotalScore(input))
console.log(getTotalScoreV2(input))