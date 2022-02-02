const { importFile } = require('../../helpers')

const cost = (x, y, map) => {
    const tileWidth = map[0].length
    const tileHeight = map.length
    const topLeftTileValue = map[y % tileHeight][x % tileWidth]
    const deltaY = Math.floor(y / tileHeight)
    const deltaX = Math.floor(x / tileWidth)
    const newValue = topLeftTileValue + deltaY + deltaX
    return ((newValue - 1) % 9) + 1
}

const getNeighbors = ({ x, y }, map, mapSize) => {
    const key = (x, y) => `${x},${y}`

    const width = map[0].length * mapSize
    const height = map.length * mapSize

    const neighbors = []
    if (x < width - 1) {
        neighbors.push({
            x: x + 1,
            y: y,
            key: key(x + 1, y),
            cost: cost(x + 1, y, map),
        })
    }
    if (y < height - 1) {
        neighbors.push({
            x: x,
            y: y + 1,
            key: key(x, y + 1),
            cost: cost(x, y + 1, map),
        })
    }
    if (x > 0) {
        neighbors.push({
            x: x - 1,
            y: y,
            key: key(x - 1, y),
            cost: cost(x - 1, y, map),
        })
    }
    if (y > 0) {
        neighbors.push({
            x: x,
            y: y - 1,
            key: key(x, y - 1),
            cost: cost(x, y - 1, map),
        })
    }
    return neighbors
}

const getAllPaths = (map, start, end, mapSize) => {
    const frontier = []
    const costSoFar = { [start.key]: 0 }

    frontier.push(start)

    while (frontier.length) {
        const current = frontier.shift()

        if (current.key === end.key) {
            continue
        }

        for (let next of getNeighbors(current, map, mapSize)) {
            const newCost = costSoFar[current.key] + next.cost

            if (!costSoFar[next.key] || newCost < costSoFar[next.key]) {
                costSoFar[next.key] = newCost
                frontier.push(next)
            }
        }
    }

    return costSoFar[end.key]
}

const getLowerTotalRisk = (input, mapSize = 1) => {
    const map = input.map(line => line.split('').map(Number))
    const start = { x: 0, y: 0, key: '0,0', cost: 0 }

    const width = map[0].length * mapSize
    const height = map.length * mapSize
    const end = {
        x: width - 1,
        y: height - 1,
        key: `${width - 1},${height - 1}`,
        cost: cost(width - 1, height - 1, map, mapSize),
    }

    return getAllPaths(map, start, end, mapSize)
}

const input = importFile(__dirname)
console.log(getLowerTotalRisk(input))
console.log(getLowerTotalRisk(input, 5))

module.exports = {
    cost,
    getLowerTotalRisk,
}
