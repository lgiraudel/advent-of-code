import { getBadgesSum, getWronglyLoadedItemsPrioritySum } from ".";
import $ from '../../helpers/index';

const input = $.file.importFile(__dirname)

console.log(getWronglyLoadedItemsPrioritySum(input))
console.log(getBadgesSum(input))
