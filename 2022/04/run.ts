import { countOverlapingSections, countPairsWithOneRangeInTheOther } from ".";
import $ from '../../helpers/index';

const input = $.file.importFile(__dirname)

console.log(countPairsWithOneRangeInTheOther(input))
console.log(countOverlapingSections(input))
