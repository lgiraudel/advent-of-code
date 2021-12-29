const { importFile, sum } = require('../../helpers')

const getOrderedPositions = input =>
    input[0]
        .split(',')
        .map(Number)
        .sort((x, y) => x - y)

const getFuelToPosition = (values, position) =>
    sum(values, value => Math.abs(value - position))

const triangularNumber = value => (value * (value + 1)) / 2

const getFuelToPositionWithFibonacci = (values, position) =>
    sum(values, value => triangularNumber(Math.abs(value - position)))

const getFuelAmount = input => {
    const positions = getOrderedPositions(input)
    const median = positions[positions.length / 2]

    return getFuelToPosition(positions, median)
}

const getFuelAmountV2 = input => {
    const positions = getOrderedPositions(input)
    const average = sum(positions) / positions.length

    return Math.min(
        getFuelToPositionWithFibonacci(positions, Math.floor(average)),
        getFuelToPositionWithFibonacci(positions, Math.ceil(average))
    )
}

const input = importFile(__dirname)
console.log(getFuelAmount(input))
console.log(getFuelAmountV2(input))

module.exports = {
    getFuelAmount,
    getFuelAmountV2,
}
