import { Grid2, Position } from '../../helpers/grid';
import $ from '../../helpers/index';

type Path = Coord[]
type Coord = [number, number]
type GridSizes = { maxCi: number; minCi: number; maxRi: number; minRi: number; }

function parseInput(input: string[]): Path[] {
    return input.map(line => {
        const groups = line.match(/\d+,\d+/g)
        return groups.map(s => {
            const pair = s.split(',')
            return pair.map(Number) as [number, number]
        })
    })
}

function getGridSize(paths: Path[]): GridSizes {
    return paths.reduce((sizes, path) => {
        return path.reduce((sizes, coord) => {
            return {
                maxCi: Math.max(sizes.maxCi, coord[0]),
                maxRi: Math.max(sizes.maxRi, coord[1]),
                minCi: Math.min(sizes.minCi, coord[0]),
                minRi: Math.min(sizes.minRi, coord[1])
            }
        }, sizes)
    }, {
        minCi: Infinity,
        minRi: Infinity,
        maxCi: 0,
        maxRi: 0,
    })
}

function createGrid(gridSizes: GridSizes, paths: Path[]) {
    const cOffset = gridSizes.minCi - 1
    const grid = $.grid.init2<boolean>(gridSizes.maxCi - gridSizes.minCi + 3, gridSizes.maxRi + 2, false)

    paths.forEach(path => {
        for (let i = 1; i < path.length; i++) {
            const coord = path[i]
            const previousCoord = path[i - 1]
            if (coord[0] === previousCoord[0]) {
                for (let j = Math.min(coord[1], previousCoord[1]); j <= Math.max(coord[1], previousCoord[1]); j++) {
                    grid.set({ r: j, c: coord[0] - cOffset}, true)
                }
            }
            if (coord[1] === previousCoord[1]) {
                for (let j = Math.min(coord[0], previousCoord[0]); j <= Math.max(coord[0], previousCoord[0]); j++) {
                    grid.set({ r: coord[1], c: j - cOffset }, true)
                }
            }
        }
    })
    return grid
}

function fillWithSand(grid: Grid2<boolean>, gridSizes: GridSizes, stopCondition: (pos: Position) => boolean): number {
    const cOffset = gridSizes.minCi - 1
    const emitter = { r: 0, c: 500 - cOffset }
    let lastSandRi: number
    let nbSand = 0
    while (lastSandRi !== 0) {
        let ri = emitter.r
        let ci = emitter.c
        let pos = { ...emitter }
        do {
            if (grid.bottom(pos) === true) {
                if (grid.bottomLeft(pos) === true) {
                    ci++
                } else {
                    ci--
                }
            }
            ri++
            pos = { r: ri, c: ci }
        } while (ri + 1 <= gridSizes.maxRi && (grid.bottom(pos) === false ||
            grid.bottomLeft(pos) === false ||
            grid.bottomRight(pos) === false))
        grid.set(pos, true)
        nbSand++
        if (stopCondition(pos)) {
            return nbSand
        }
    }
    return 0

}

export function puzzle1(input: string[]): number {
    const paths = parseInput(input)
    const gridSizes = getGridSize(paths)
    const grid = createGrid(gridSizes, paths)

    return fillWithSand(grid, gridSizes, pos => pos.r === gridSizes.maxRi) - 1
}

export function puzzle2(input: string[]): number {
    const paths = parseInput(input)
    const gridSizes = getGridSize(paths)
    gridSizes.maxRi += 1
    gridSizes.minCi = 500 - gridSizes.maxRi
    gridSizes.maxCi = 500 + gridSizes.maxRi
    const cOffset = gridSizes.minCi - 1
    const grid = createGrid(gridSizes, paths)

    const res = fillWithSand(grid, gridSizes, pos => pos.r === 1 && pos.c === 501 - cOffset)
    return res + 1
}