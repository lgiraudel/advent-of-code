const { importFile } = require('../../helpers')

const getLines = input =>
    input.map(line =>
        line.split(' -> ').map(coord => coord.split(',').map(Number))
    )

const isVerticalLine = ([[x1, y1], [x2, y2]]) => x1 === x2
const isHorizontalLine = ([[x1, y1], [x2, y2]]) => y1 === y2
const isDiagonalLine = ([[x1, y1], [x2, y2]]) =>
    Math.abs(x2 - x1) === Math.abs(y2 - y1)

const getXDirection = ([[x1, _y1], [x2, _y2]]) => (x2 - x1) / Math.abs(x2 - x1)
const getYDirection = ([[_x1, y1], [_x2, y2]]) => (y2 - y1) / Math.abs(y2 - y1)

const getTotalPointsWithDiagonals = (input, withDiagonals = true) => {
    const lines = getLines(input)

    const points = lines.reduce((points, line) => {
        const [[x1, y1], [x2, y2]] = line
        const x_values = Array(Math.abs(x2 - x1) + 1)
            .fill(0)
            .map((_, i) => (x1 === x2 ? x1 : x1 + i * getXDirection(line)))
        const y_values = Array(Math.abs(y2 - y1) + 1)
            .fill(0)
            .map((_, i) => (y1 === y2 ? y1 : y1 + i * getYDirection(line)))

        if (isHorizontalLine(line) || isVerticalLine(line)) {
            x_values.forEach(x => {
                y_values.forEach(y => {
                    points[`${x},${y}`] = (points[`${x},${y}`] || 0) + 1
                })
            })
        } else if (withDiagonals && isDiagonalLine(line)) {
            x_values.forEach((x, i) => {
                points[`${x},${y_values[i]}`] =
                    (points[`${x},${y_values[i]}`] || 0) + 1
            })
        }
        return points
    }, {})

    return Object.values(points).filter(x => x > 1).length
}

const getTotalPoints = input => getTotalPointsWithDiagonals(input, false)

const input = importFile(__dirname)
console.log(getTotalPoints(input))
console.log(getTotalPointsWithDiagonals(input))

module.exports = {
    getTotalPoints,
    getTotalPointsWithDiagonals,
}
