const getDrawingLines = (lines: string[]): string[] => {
    let foundEnd = false
    const drawingLines = lines.filter(line => {
        if (foundEnd || line === '') {
            foundEnd = true
            return false
        }
        return true
    })
    drawingLines.pop()
    return drawingLines
}


const getMoveLines = (lines: string[]): string[] => {
    let foundStart = false
    return lines.filter(line => {
        if (foundStart) {
            return true
        }
        if (line === '') {
            foundStart = true
            return false
        }
    })
}

const getInitialCrates = (lines: string[]): string[][] => {
    let elements: string[][] = Array((lines[0].split('').length + 1) / 4);
    lines.forEach(line => {
        const chars = line.split('')

        chars.forEach((char, i) => {
            if (![' ', '[', ']'].includes(char)) {
                const columnIndex = Math.floor(i / 4);
                elements[columnIndex] = elements[columnIndex] || []
                elements[columnIndex].unshift(char)
            }
        })
    })
    return elements
}

const processFinalWord = (crates: string[][]): string => {
    return crates.reduce((word, crateItems) => {
        return word + crateItems.pop()
    }, '')
}

const parseMoveLine = (moveLine: string): { number: number; from: number; to: number } => {
    const match = moveLine.match(/move (\d+) from (\d) to (\d)/)
    const number = Number(match![1])
    const from = Number(match![2])
    const to = Number(match![3])
    return {
        number,
        from,
        to
    }
}

export function getFinalWord(input: string[]): string {
    const drawingLines = getDrawingLines(input)
    const initialCrates = getInitialCrates(drawingLines)

    const moveLines = getMoveLines(input)

    moveLines.forEach(moveLine => {
        const { number, from, to } = parseMoveLine(moveLine)

        const removedItems = initialCrates[from - 1].splice(0 - number)
        initialCrates[to - 1].push(...removedItems.reverse())
    })

    return processFinalWord(initialCrates)
}

export function getFinalWordV2(input: string[]): string {
    const drawingLines = getDrawingLines(input)
    const initialCrates = getInitialCrates(drawingLines)

    const moveLines = getMoveLines(input)

    moveLines.forEach(moveLine => {
        const { number, from, to } = parseMoveLine(moveLine)

        const removedItems = initialCrates[from - 1].splice(0 - number)
        initialCrates[to - 1].push(...removedItems)
    })

    return processFinalWord(initialCrates)
}