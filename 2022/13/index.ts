type Item = number | Item[]
type Line = Item[]
type Pair = [Line, Line]

function comparePairs(left: Item, right: Item): number {
    if (typeof left === 'undefined' && typeof right !== 'undefined') {
        return 1
    } else if (typeof left !== 'undefined' && typeof right === 'undefined') {
        return -1
    } else if (typeof left === 'undefined' && typeof right === 'undefined') {
        return 0
    } else if (typeof left === 'number' && typeof right === 'number') {
        if (right === left) {
            return 0
        }
        return (right - left) / Math.abs(right - left)
    } else {
        if (!Array.isArray(left)) left = [left]
        if (!Array.isArray(right)) right = [right]
        for (let i = 0; i < Math.max(left.length, right.length); i++) {
            const comp = comparePairs(left[i], right[i])
            if (comp !== 0) {
                return comp
            }
        }
    }
    return 0
}

export function puzzle1(input: string[]): number {
    const pairs: Pair[] = []
    let currentPair = []
    input.forEach(line => {
        if (line === '') return

        const arr: Line = eval(line)
        currentPair.push(arr)
        if (currentPair.length === 2) {
            pairs.push(currentPair as Pair)
            currentPair = []
        }
    })
    pairs.push(currentPair as Pair)

    return pairs.reduce((sum, pair, index) => {
        const comp = comparePairs(pair[0], pair[1])
        if (comp === 1) {
            return sum + index + 1
        }
        return sum
    }, 0)
}

export function puzzle2(input: string[]): number {
    const lines: Line[] = []

    input.forEach(line => {
        if (line === '') return
        lines.push(eval(line))
    })
    const divider1 = [[6]]
    const divider2 = [[2]]
    lines.push(divider1)
    lines.push(divider2)

    lines.sort(comparePairs).reverse()

    return (lines.indexOf(divider1) + 1) * (lines.indexOf(divider2) + 1)
}