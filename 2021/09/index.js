const { sum, importFile, unique, _default } = require('../../helpers')

const getMap = input => input.map(line => line.split('').map(Number))

const isLowerPoint = (map, [i, j]) =>
    map[i][j] <= _default(map[i][j - 1], 10) &&
    map[i][j] <= _default(map[i][j + 1], 10) &&
    map[i][j] <= _default(map[i - 1]?.[j], 10) &&
    map[i][j] <= _default(map[i + 1]?.[j], 10)

const sumRiskLevels = input => {
    const map = getMap(input)

    return sum(map, (line, i) =>
        sum(line, (height, j) => (isLowerPoint(map, [i, j]) ? height + 1 : 0))
    )
}

const foundBasinPoints = (map, [i, j]) => {
    if (
        map[i]?.[j] === undefined ||
        map[i]?.[j] >= 9 ||
        !isLowerPoint(map, [i, j])
    ) {
        return []
    }
    map[i][j] += 10
    return [[`${i};${j}`]]
        .concat(foundBasinPoints(map, [i - 1, j]))
        .concat(foundBasinPoints(map, [i + 1, j]))
        .concat(foundBasinPoints(map, [i, j - 1]))
        .concat(foundBasinPoints(map, [i, j + 1]))
}

const multiplyBiggestBasins = input => {
    const map = getMap(input)

    const basinSizes = []
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (isLowerPoint(map, [i, j])) {
                const basinPoints = unique(foundBasinPoints(map, [i, j]))
                basinSizes.push(basinPoints.length)
            }
        }
    }
    const bigestBasins = basinSizes.sort((a, b) => (a < b ? 1 : -1)).slice(0, 3)
    return bigestBasins.reduce((total, val) => total * val, 1)
}

const input = importFile(__dirname)
console.log(sumRiskLevels(input))
console.log(multiplyBiggestBasins(input))

module.exports = {
    sumRiskLevels,
    multiplyBiggestBasins,
}
