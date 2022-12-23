export function puzzle1(input: string[]): number {
    input = [...input]
    let X = 1
    let sum = 0

    let instruction = null
    for (let cycle = 1; cycle <= 220; cycle++) {
        if (instruction) {
            // there's already an isntruction started in previous cycle
            // we increment sum if needed, THEN we add the addx value to X
            sum += cycle % 40 === 20 ? cycle * X : 0

            if (instruction.match(/^addx (-?\d+)$/)) {
                const addXValue = Number(instruction.match(/^addx (-?\d+)$/)[1])
                X += addXValue
            }

            // instruction have been processed, let's clear it
            instruction = null
        } else {
            instruction = input.shift()

            if (instruction.match(/^noop$/)) {
                instruction = null
            }

            sum += cycle % 40 === 20 ? cycle * X : 0
        }
    }

    return sum
}

export function puzzle2(input: string[]): string {
    input = [...input]
    let X = 1

    let instruction = null
    const chars = []
    for (let cycle = 1; cycle <= 240; cycle++) {
        if ([X - 1, X, X + 1].includes(chars.length % 40)) {
            chars.push('#')
        } else {
            chars.push('.')
        }
        if (instruction) {
            if (instruction.match(/^addx (-?\d+)$/)) {
                const addXValue = Number(instruction.match(/^addx (-?\d+)$/)[1])
                X += addXValue
            }

            instruction = null
        } else {
            instruction = input.shift()

            if (instruction.match(/^noop$/)) {
                instruction = null
            }
        }
    }

    return charsToString(chars)
}

function charsToString(chars: string[][]): string {
    let output = []
    for (let i = 0; i < chars.length; i += 40) {
        output.push(chars.slice(i, i + 40));
    }
    return output.map(chars => chars.join('')).join('\n')
}