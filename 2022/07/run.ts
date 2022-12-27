import { findSmallestDirectoryToFreeEnoughSpace, getSumOfDirectoriesSize } from ".";
import $ from '../../helpers/index';

const input = $.file.importFile(__dirname)

console.log(getSumOfDirectoriesSize(input))
console.log(findSmallestDirectoryToFreeEnoughSpace(input))
