const {
    importFile,
    cache,
    dichotomicSearchInRange,
    sum,
} = require('../../helpers')

const getOrderedPositions = input =>
    input[0]
        .split(',')
        .map(Number)
        .sort((x, y) => (x > y ? 1 : -1))

const getFuelToPosition = (values, position) =>
    sum(values, value => Math.abs(value - position))

const fibonnaci = cache(
    max => (max === 0 ? 0 : max + fibonnaci(max - 1)),
    val => val
)

const getFuelToPositionWithFibonacci = (values, position) =>
    sum(values, value => fibonnaci(Math.abs(value - position)))

const findBestFuel = (positions, getFuelToPositionFn) => {
    getFuelToPositionFn = cache(getFuelToPositionFn, (_values, value) => value)
    let startPos = positions[0]
    let endPos = positions[positions.length - 1]

    const val = dichotomicSearchInRange(startPos, endPos, value => {
        const beforePosFuel = getFuelToPositionFn(positions, value - 1)
        const posFuel = getFuelToPositionFn(positions, value)
        const afterPosFuel = getFuelToPositionFn(positions, value + 1)
        if (beforePosFuel < posFuel && posFuel < afterPosFuel) {
            return -1
        } else if (beforePosFuel > posFuel && posFuel > afterPosFuel) {
            return 1
        } else {
            return 0
        }
    })
    return getFuelToPositionFn(positions, val)
}

const getFuelAmount = input => {
    const positions = getOrderedPositions(input)

    return findBestFuel(positions, getFuelToPosition)
}

const getFuelAmountV2 = input => {
    const positions = getOrderedPositions(input)

    return findBestFuel(positions, getFuelToPositionWithFibonacci)
}

// const input = importFile(__dirname)
// console.log(getFuelAmount(input))
// console.log(getFuelAmountV2(input))

module.exports = {
    getFuelAmount,
    getFuelAmountV2,
}
