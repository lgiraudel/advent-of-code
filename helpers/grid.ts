import { Graph, Node } from "./graph"

export type Grid<T> = T[][]

const loop = <T, U>(handler: 'forEach' | 'map' | 'flatMap' | 'find') =>
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
type Coord = { ri: number; ci: number }
function find<T>(grid: Grid<T>, callback: (item: T) => boolean): Coord {
    let res = null
    loop<T, void>('find')(grid, (item: T, ri: number, ci: number) => {
        if (callback(item) === true) {
            res = {
                ri, ci
            }
        }
    })
    return res
}

function reduce<T, U>(grid: Grid<T>, callback: (acc: U, current: T, ci: number, ri: number) => U, starter: U): U {
    return grid.reduce((acc: U, curr: T[], ri) => {
        return curr.reduce((acc, curr, ci) => callback(acc, curr, ri, ci), acc)
    }, starter)
}

type Mapper<T> = (value: string, ri: number, ci: number) => T
const identity: Mapper<string> = (value: string, _ri: number, _ci: number) => value
const createGrid = <T>(rows: string[], mapper: Mapper<T> = identity as Mapper<T>) =>
    rows.map((row, ri) => row.split('').map((value, ci) => mapper(value, ri, ci)))

const column = <T>(grid: Grid<T>, index: number) => grid.map(row => row[index])

function isCallable<T>(maybeFunc: T | ((ri: number, ci: number) => T)): maybeFunc is (ri: number, ci: number) => T {
    return typeof maybeFunc === 'function';
}

const init = <T>(width: number, height: number, value: T | ((ci: number, ri: number) => T)): Grid<T> =>
    Array.from({ length: height }, (_, ri) =>
        Array.from({ length: width }, (_, ci) => 
            isCallable<T>(value) ? value(ci, ri) : value
        )
    )

const print = <T>(grid: Grid<T>, f: (item: T) => string): void => {
    const output = grid.map(line =>
        line.map(f).join('')
    ).join('\n')
    console.log(output)
}

const getWidth = (grid: Grid<unknown>): number => {
    return grid[0].length
}

const getHeight = (grid: Grid<unknown>): number => {
    return grid.length
}

const toGraph = <T>(grid: Grid<T>, canGo: (node: T, sibling: T) => number | null): Graph => {
    const graph: Graph = {}
    const width = getWidth(grid)
    const height = getHeight(grid)

    const getId = (ri: number, ci: number): string => `${ci};${ri}`

    forEach(grid,  (nodeValue, ri, ci) => {
        const id = getId(ri, ci)
        let newNode: Node = {
            id,
            siblings: {}
        }
        let node = graph[id] || newNode
        const siblings: { id: string; value: T }[] = []
        if (ri > 0) {
            siblings.push({
                id: getId(ri - 1, ci),
                value: grid[ri - 1][ci]
            })
        }
        if (ri < height - 1) {
            siblings.push({
                id: getId(ri + 1, ci),
                value: grid[ri + 1][ci]
            })
        }
        if (ci > 0) {
            siblings.push({
                id: getId(ri, ci - 1),
                value: grid[ri][ci - 1]
            })
        }
        if (ci < width - 1) {
            siblings.push({
                id: getId(ri, ci + 1),
                value: grid[ri][ci + 1]
            })
        }
        node.siblings = siblings.reduce((accessibleSiblings, sibling) => {
            const val = canGo(nodeValue, sibling.value)
            if (val !== null && !Object.keys(accessibleSiblings).includes(sibling.id)) {
                accessibleSiblings[sibling.id] = val
            }
            return accessibleSiblings
        }, node.siblings)
        graph[id] = node
    })

    return graph
}
    
export default {
    create: createGrid,
    forEach,
    map,
    flatMap,
    column,
    init,
    print,
    find,
    reduce,
    getWidth,
    getHeight,
    toGraph,
}