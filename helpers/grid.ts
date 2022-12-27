export type Grid<T> = T[][]

const loop = <T, U>(handler: 'forEach' | 'map' | 'flatMap') =>
    (grid: Grid<T>, callback: (item: T, ri: number, ci: number) => U) => {
        const f = grid[handler].bind(grid) as CallableFunction
        return f((row: T[], ri: number) => {
            const g = row[handler].bind(row) as CallableFunction
            return g((item: T, ci: number) => callback(item, ri, ci))
        })
    }

function forEach<T>(grid: Grid<T>, callback: (item: T, ri: number, ci: number) => void): void {
    return loop<T, void>('forEach')(grid, callback)
}
function map<T, U>(grid: Grid<T>, callback: (item: T, ri: number, ci: number) => U): U[][] {
    return loop<T, U>('map')(grid, callback)
}
function flatMap<T, U>(grid: Grid<T>, callback: (item: T, ri: number, ci: number) => U): U[] {
    return loop<T, U>('flatMap')(grid, callback)
}

type Mapper<T> = (value: string, ri: number, ci: number) => T
const identity: Mapper<string> = (value: string, _ri: number, _ci: number) => value
const createGrid = <T>(rows: string[], mapper: Mapper<T> = identity as Mapper<T>) =>
    rows.map((row, ri) => row.split('').map((value, ci) => mapper(value, ri, ci)))

const column = <T>(grid: Grid<T>, index: number) => grid.map(row => row[index])

function isCallable<T>(maybeFunc: T | ((ri: number, ci: number) => T)): maybeFunc is (ri: number, ci: number) => T {
    return typeof maybeFunc === 'function';
}

const initGrid = <T>(width: number, height: number, value: T | ((ci: number, ri: number) => T)): Grid<T> =>
    Array.from({ length: height }, (_, ri) =>
        Array.from({ length: width }, (_, ci) => 
            isCallable<T>(value) ? value(ci, ri) : value
        )
    )

export default {
    create: createGrid,
    forEach,
    map,
    flatMap,
    column,
    init: initGrid,
}