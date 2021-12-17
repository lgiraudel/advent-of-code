const { importFile } = require('../../helpers')

const FORWARD = 'forward'
const UP = 'up'
const DOWN = 'down'

const getFinalPosition = input => {
    const position = input
        .map(str => {
            const [action, value] = str.split(' ')
            return [action, Number(value)]
        })
        .reduce(
            (position, [action, value]) => {
                if (action === FORWARD) position.horizontal += value
                if (action === UP) position.depth -= value
                if (action === DOWN) position.depth += value
                return position
            },
            { depth: 0, horizontal: 0 }
        )
    return position.depth * position.horizontal
}

const getFinalPositionV2 = input => {
    const position = input.reduce(
        (position, currentMove) => {
            const [action, valueStr] = currentMove.split(' ')
            const value = Number(valueStr)
            if (action === FORWARD) {
                position.horizontal += value
                position.depth += position.aim * value
            }
            if (action === UP) position.aim -= value
            if (action === DOWN) position.aim += value
            return position
        },
        { depth: 0, horizontal: 0, aim: 0 }
    )
    return position.depth * position.horizontal
}

const input = importFile(__dirname)
console.log(getFinalPosition(input))
console.log(getFinalPositionV2(input, true))

module.exports = {
    getFinalPosition,
    getFinalPositionV2,
}
