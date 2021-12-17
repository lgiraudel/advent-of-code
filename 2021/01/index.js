const { importFile } = require('../../helpers')

const countIncreases = input => {
    return input.map(Number).reduce((totalIncreases, depth, i, input) => {
        if (i !== 0 && depth > input[i - 1]) {
            totalIncreases++
        }
        return totalIncreases
    }, 0)
}

const countWindowIncreases = input => {
    return input.map(Number).reduce((totalIncreases, _depth, i, input) => {
        if (
            i > 2 &&
            input[i] + input[i - 1] + input[i - 2] >
                input[i - 1] + input[i - 2] + input[i - 3]
        ) {
            totalIncreases++
        }
        return totalIncreases
    }, 0)
}

const input = importFile(__dirname)
console.log(countIncreases(input))
console.log(countWindowIncreases(input))

module.exports = {
    countIncreases,
    countWindowIncreases,
}
