import { Grid } from '../../helpers/grid';
import $ from '../../helpers/index';

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
            case Direction.LEFT:
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

    return {
        width: res.verticalRange[1] - res.verticalRange[0] + 1,
        height: res.horizontalRange[1] - res.horizontalRange[0] + 1,
        initRow: 0 - res.horizontalRange[0],
        initCol: 0 - res.verticalRange[0]
    }
}

function moveHead({x, y}: Segment, direction: Direction): Segment {
        switch (direction) {
        case Direction.UP:
            return { x, y: y + 1 }
        case Direction.DOWN:
            return { x, y: y - 1 }
        case Direction.RIGHT:
            return { x: x + 1, y }
        case Direction.LEFT:
            return { x: x - 1, y }
    }
}

const printGrid = <T>(grid: Grid<T>, f: (item: T) => string): void => {
    const output = grid.map(line =>
        line.map(f).join('')
    ).join('\n')
    console.log(output)
}

function processMoves(moves: Move[], grid: Grid<boolean>, [initCol, initRow]: [number, number]): Grid<boolean> {
    let head: Segment = {x: initCol, y: initRow}
    let tail: Segment = {x: initCol, y: initRow}

    moves.forEach(move => {
        for (let i = 0; i < move.size; i++) {
            head = moveHead(head, move.direction)
            tail = affectSegment(tail, head)

            grid[tail.y][tail.x] = true
        }
    })

    return grid
}

export function puzzle1(input: string[]): number {
    const moves = processInput(input)
    const {width, height, initRow, initCol} = findGridSize(moves)

    const grid = $.grid.init(width, height, false)

    const updatedGrid = processMoves(moves, grid, [initCol, initRow])

    return $.grid.flatMap<boolean, boolean>(updatedGrid, v => v).filter(Boolean).length
}

type Segment = { x: number; y: number }

const affectSegment = (segment: Segment, previousSegment: Segment): Segment => {
    let newX = segment.x
    let newY = segment.y

    if (Math.abs(previousSegment.x - segment.x) > 1 || Math.abs(previousSegment.y - segment.y) > 1) {
        if (previousSegment.x > segment.x) newX++
        else if (previousSegment.x < segment.x) newX--
        if (previousSegment.y > segment.y) newY++
        else if (previousSegment.y < segment.y) newY--
    }

    return { x: newX, y: newY }
}

export function puzzle2(input: string[]): number {
    const moves = processInput(input)

    const rope = Array(10).fill(undefined).map(x => ({x: 0, y: 0}))
    const lastPartCoords = {}
    const lastSegment = rope[rope.length - 1]
    lastPartCoords[`${lastSegment.x};${lastSegment.y}`] = true

    for (let move of moves) {
        for (let i = 0; i < move.size; i++) {
            if (move.direction === Direction.UP) {
                rope[0].y += 1
            }
            if (move.direction === Direction.DOWN) {
                rope[0].y -= 1
            }
            if (move.direction === Direction.RIGHT) {
                rope[0].x += 1
            }
            if (move.direction === Direction.LEFT) {
                rope[0].x -= 1
            }
            for (let j = 1; j < rope.length; j++) {
                rope[j] = affectSegment(rope[j], rope[j - 1])
            }
            const lastSegment = rope[rope.length - 1]
            lastPartCoords[`${lastSegment.x};${lastSegment.y}`] = true
        }
    }

    return Object.values(lastPartCoords).length
}