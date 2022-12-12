import { findSmallestDirectoryToFreeEnoughSpace, getSumOfDirectoriesSize } from ".";

const { importFile } = require("../../helpers");

const input = importFile(__dirname)

console.log(getSumOfDirectoriesSize(input))
console.log(findSmallestDirectoryToFreeEnoughSpace(input))
