const { importFile } = require('../../helpers')

const getNeighbors = ({ x, y }, map) => {
    const cost = (x, y) => map[y][x]

    const width = map[0].length - 1
    const height = map.length - 1

    const neighbors = []
    if (x < width) {
        neighbors.push({
            x: x + 1,
            y: y,
            key: `${x + 1},${y}`,
            cost: cost(x + 1, y),
        })
    }
    if (y < height) {
        neighbors.push({
            x: x,
            y: y + 1,
            key: `${x},${y + 1}`,
            cost: cost(x, y + 1),
        })
    }
    return neighbors
}

const getAllPaths = (map, start, end) => {
    const frontier = []
    const costSoFar = { [start.key]: 0 }
    const cameFrom = { [start.key]: null }

    frontier.push(start)

    while (frontier.length) {
        const current = frontier.shift()

        if (current.key === end.key) {
            break
        }

        for (let next of getNeighbors(current, map)) {
            const newCost = costSoFar[current.key] + next.cost

            if (!costSoFar[next.key] || newCost < costSoFar[next.key]) {
                costSoFar[next.key] = newCost
                frontier.push(next)
                cameFrom[next.key] = current
            }
        }
    }

    return {
        costs: costSoFar,
        cameFrom,
    }
}

const getBestPath = (paths, start, end) => {
    const path = []
    let current = end

    while (current.key !== start.key) {
        path.push(current)
        current = paths[current.key]
    }

    return path
}

const getLowerTotalRisk = input => {
    const map = input.map(line => line.split('').map(Number))
    const start = { x: 0, y: 0, key: '0,0', cost: 0 }

    const width = map[0].length - 1
    const height = map.length - 1
    const end = {
        x: width,
        y: height,
        key: `${width},${height}`,
        cost: map[height][width],
    }

    const { cameFrom: paths, costs } = getAllPaths(map, start, end)
    const bestPath = getBestPath(paths, start, end)
    const bestCost = bestPath.reduce((cost, cur) => cost + cur.cost, 0)
    console.log(bestCost, costs[end.key])
    return bestCost
}

const input = importFile(__dirname)
console.log(getLowerTotalRisk(input))

module.exports = {
    getLowerTotalRisk,
}
