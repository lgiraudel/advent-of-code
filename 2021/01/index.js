const { importFile, sum } = require('../../helpers')

const countIncreases = input =>
    sum(input.map(Number), (depth, i) => {
        if (i !== 0 && depth > input[i - 1]) {
            return 1
        }
        return 0
    })

const countWindowIncreases = input =>
    sum(input.map(Number), (_depth, i) => {
        if (
            i > 2 &&
            input[i] + input[i - 1] + input[i - 2] >
                input[i - 1] + input[i - 2] + input[i - 3]
        ) {
            return 1
        }
        return 0
    })

const input = importFile(__dirname)
console.log(countIncreases(input))
console.log(countWindowIncreases(input))

module.exports = {
    countIncreases,
    countWindowIncreases,
}
