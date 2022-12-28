import * as Graph from 'node-dijkstra'
import { Grid } from '../../helpers/grid'
import $ from '../../helpers/index'

const elevation = (c: string): number => {
    if (c === 'S') c = 'a'
    if (c === 'E') c = 'z'
    return c.charCodeAt(0)
}

const canGo = (c1: string, c2: string): number | null => {
    const elevationDiff = elevation(c2) - elevation(c1)
    if (elevationDiff <= 1) {
        return 1
    }
    return null
}

const getId = (ri: number, ci: number): string => `${ci};${ri}`

const gridToGraph = (grid: Grid<string>): Graph => {
    const route = new Graph()
    const width = $.grid.getWidth(grid)
    const height = $.grid.getHeight(grid)
    $.grid.forEach(grid, (nodeValue, ri, ci) => {
        const id = getId(ri, ci)
        const siblings = {}
        if (ri > 0 && canGo(nodeValue, grid[ri - 1][ci])) {
            siblings[getId(ri - 1, ci)] = 1
        }
        if (ri < height - 1 && canGo(nodeValue, grid[ri + 1][ci])) {
            siblings[getId(ri + 1, ci)] = 1
        }
        if (ci > 0 && canGo(nodeValue, grid[ri][ci - 1])) {
            siblings[getId(ri, ci - 1)] = 1
        }
        if (ci < width - 1 && canGo(nodeValue, grid[ri][ci + 1])) {
            siblings[getId(ri, ci + 1)] = 1
        }
        route.addNode(id, siblings)
    })
    return route
}

export function puzzle1(input: string[]): number {
    const grid = $.grid.create<string>(input)
    const route = gridToGraph(grid)
    const start = $.grid.find(grid, nodeId => nodeId === 'S')
    const end = $.grid.find(grid, nodeId => nodeId === 'E')
    return route.path(getId(start.ri, start.ci), getId(end.ri, end.ci)).length - 1
}

export function puzzle2(input: string[]): number {
    const grid = $.grid.create<string>(input)
    const route = gridToGraph(grid)

    const end = $.grid.find(grid, nodeId => nodeId === 'E')

    return $.grid.reduce<string, number>(grid, (min, current, ri, ci) => {
        if (current === 'a' || current === 'S') {
            const path = route.path(getId(ri, ci), getId(end.ri, end.ci))
            return Math.min(min, path ? path.length - 1 : min)
        }
        return min
    }, Infinity)
}