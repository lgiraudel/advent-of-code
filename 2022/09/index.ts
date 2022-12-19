import $, { Grid } from '../../helpers-ts';

enum Direction {
    UP = 'U',
    DOWN = 'D',
    RIGHT = 'R',
    LEFT = 'L',
}

type Move = {
    direction: Direction;
    size: number;
}

function processInput(input: string[]): Move[] {
    return input.map(line => {
        const groups = line.match(/^(R|U|L|D) (\d+)$/)

        if (!groups || groups.length <= 2) {
            throw new Error('Oupsy!')
        }

        return { direction: groups[1] as Direction, size: Number(groups[2]) }
    })
}

function findGridSize(moves: Move[]): {width: number, height: number, initRow: number; initCol: number} {
    const res = moves.reduce((acc, move) => {
        switch (move.direction) {
            case Direction.UP:
                acc.currentHorizontally += move.size
                break;
            case Direction.DOWN:
                acc.currentHorizontally -= move.size
                break
            case Direction.RIGHT:
                acc.currentVertically += move.size
                break
            case Direction.DOWN:
                acc.currentVertically -= move.size
        }
        acc.horizontalRange = [Math.min(acc.horizontalRange[0], acc.currentHorizontally), Math.max(acc.horizontalRange[1], acc.currentHorizontally)]
        acc.verticalRange = [Math.min(acc.verticalRange[0], acc.currentVertically), Math.max(acc.verticalRange[1], acc.currentVertically)]

        return acc
    }, {
        currentVertically: 0,
        currentHorizontally: 0,
        verticalRange: [0, 0],
        horizontalRange: [0, 0],
    })
    console.log(res)
    return {
        width: res.verticalRange[1] - res.verticalRange[0],
        height: res.horizontalRange[1] - res.horizontalRange[0],
        initRow: 0 - res.horizontalRange[0],
        initCol: 0 - res.verticalRange[0]
    }
}

function moveHead([ci, ri]: [number, number], direction: Direction): [number, number] {
    switch (direction) {
        case Direction.UP:
            return [ci, ri + 1]
        case Direction.DOWN:
            return [ci, ri - 1]
        case Direction.RIGHT:
            return [ci + 1, ri]
        case Direction.LEFT:
            return [ci - 1, ri]
    }
}

function moveTail([headCi, headRi]: [number, number], [tailCi, tailRi]: [number, number]): [number, number] {
    let newTailCi = tailCi
    let newTailRi = tailRi
    // console.log('head', [headCi, headRi], 'tail (before)', [tailCi, tailRi])
    if (Math.abs(headCi - tailCi) > 1) {
        newTailCi += Math.abs(headCi - tailCi) / (headCi - tailCi)
    }
    if (Math.abs(headRi - tailRi) > 1) {
        newTailRi += Math.abs(headRi - tailRi) / (headRi - tailRi)
    }
    return [newTailCi, newTailRi]
}

function processMoves(moves: Move[], grid: Grid<boolean>, [initCol, initRow]: [number, number]): Grid<boolean> {
    let head: [number, number] = [initCol, initRow]
    let tail: [number, number] = [initCol, initRow]

    // console.log(moves)
    moves.forEach(move => {
        for (let i = 0; i < move.size; i++) {
            head = moveHead(head, move.direction)
            tail = moveTail(head, tail)
            // console.log(tail)
            grid[tail[1]][tail[0]] = true
        }
    })

    // console.log(grid)
    return grid
}

export function puzzle1(input: string[]): number {
    const moves = processInput(input)
    const {width, height, initRow, initCol} = findGridSize(moves)
    console.log(width, height, initRow, initCol)

    const grid = $.grid.init(width, height, false)

    const updatedGrid = processMoves(moves, grid, [initCol, initRow])
    // console.log(updatedGrid)

    return $.grid.flatMap<boolean, boolean>(updatedGrid, v => v).filter(Boolean).length
}

export function puzzle2(input: string[]): number {
    return 0
}