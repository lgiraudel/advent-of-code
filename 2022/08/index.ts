const colors = require('colors')
import { Grid } from '../../helpers/grid';
import { grid } from '../../helpers/index';

type Tree = {
    size: number;
    visible?: boolean;
    scenicScore?: number;
}

const printGrid = <T>(grid: Grid<T>, f: (item: T) => string): void => {
    const output = grid.map(line =>
        line.map(f).join('')
    ).join('\n')
    console.log(output)
}

const printTrees = (trees: Tree[][]): void => {
    printGrid<Tree>(trees, tree => tree.visible ? colors.green(tree.size) : colors.red(tree.size))
    // const output = trees.map(treeLine =>
    //     treeLine.map(tree => tree.visible ? colors.green(tree.size) : colors.red(tree.size)).join('')
    // ).join('\n')
    // console.log(output)
}



export function puzzle1(input: string[]): number {
    const treeGrid = grid.create<Tree>(input, value => ({
        size: Number(value),
        visible: false
    }))

    const height = treeGrid.length
    const width = treeGrid[0].length
    const trees = grid.map<Tree, Tree>(treeGrid, (tree, ri, ci) => {
        const isSmaller = (t: Tree) => t.size < tree.size

        let visible = false

        if (ri === 0 || ri === height - 1) visible = true
        if (ci === 0 || ci === width - 1) visible = true

        if (treeGrid[ri].slice(0, ci).every(isSmaller)) visible = true
        if (treeGrid[ri].slice(ci + 1).every(isSmaller)) visible = true

        if (grid.column(treeGrid, ci).slice(0, ri).every(isSmaller)) visible = true
        if (grid.column(treeGrid, ci).slice(ri + 1).every(isSmaller)) visible = true

        return { ... tree, visible }
    })

    // printTrees(trees)
    return trees.flat().filter(tree => tree.visible).length
}

export function puzzle2(input: string[]): number {
    const treeGrid = grid.create<Tree>(input, value => ({
        size: Number(value),
        scenicScore: 0
    }))

    const height = treeGrid.length
    const width = treeGrid[0].length
    const scenicScoreGrid = grid.flatMap<Tree, number>(treeGrid, (tree, ri, ci) => {
        const isSmaller = (t: Tree) => t.size < tree.size

        const visibleTree = () => {
            let blocked = false
            return (t: Tree) => {
                const treeIsVisible = !blocked
                blocked = blocked || !isSmaller(t)
                return treeIsVisible
            }
        }

        const left = ci !== 0 ? treeGrid[ri].slice(0, ci).reverse().filter(visibleTree()).length : 0
        const right = ci !== width - 1 ? treeGrid[ri].slice(ci + 1).filter(visibleTree()).length : 0
        const top = ri !== 0 ? grid.column(treeGrid, ci).slice(0, ri).reverse().filter(visibleTree()).length : 0
        const bottom = ri !== height - 1 ? grid.column(treeGrid, ci).slice(ri + 1).filter(visibleTree()).length : 0

        return left * top * right * bottom
    })

    return Math.max(...scenicScoreGrid)
}