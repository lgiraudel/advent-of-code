const { importFile } = require('../../helpers')

const loopOnGrid = (grid, fn) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            fn(grid[i][j], i, j)
        }
    }
}

const incEnergy = grid => loopOnGrid(grid, octopus => octopus.val++)

const incOctopus = octopus => {
    if (octopus) {
        octopus.val++
    }
}

const flashOctopuses = grid => {
    let flashed = 0
    loopOnGrid(grid, (octopus, i, j) => {
        if (octopus.val > 9 && !octopus.flashed) {
            incOctopus(grid[i - 1]?.[j - 1])
            incOctopus(grid[i - 1]?.[j])
            incOctopus(grid[i - 1]?.[j + 1])
            incOctopus(grid[i][j - 1])
            incOctopus(grid[i][j + 1])
            incOctopus(grid[i + 1]?.[j - 1])
            incOctopus(grid[i + 1]?.[j])
            incOctopus(grid[i + 1]?.[j + 1])
            octopus.flashed = true
            flashed++
        }
    })
    if (flashed) {
        flashed += flashOctopuses(grid)
    }
    return flashed
}

const resetFlashed = grid => {
    loopOnGrid(grid, octopus => {
        if (octopus.flashed) {
            octopus.flashed = false
            octopus.val = 0
        }
    })
}

const makeGrid = input =>
    input.map(line =>
        line.split('').map(val => ({ val: Number(val), flashed: false }))
    )

const countFlashes = (input, steps) => {
    const grid = makeGrid(input)

    let flashed = 0
    for (let step = 1; step <= steps; step++) {
        incEnergy(grid)
        flashed += flashOctopuses(grid)
        resetFlashed(grid)
    }
    return flashed
}

const simultaneousFlashStep = input => {
    const grid = makeGrid(input)

    let step = 1
    while (true) {
        incEnergy(grid)
        flashOctopuses(grid)
        resetFlashed(grid)
        if (grid.every(line => line.every(octopus => octopus.val === 0))) {
            return step
        }
        step++
    }
}

const input = importFile(__dirname)
console.log(countFlashes(input, 100))
console.log(simultaneousFlashStep(input))

module.exports = { countFlashes, simultaneousFlashStep }
