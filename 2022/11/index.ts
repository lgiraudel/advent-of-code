type Monkey = {
    id: number;
    items: number[];
    operation: (old: number) => number;
    divisibleBy: number;
    sendToIfTrue: number;
    sendToIfFalse: number;
    inspectedItems: number;
}

function parseInput(input: string[], v1: boolean): Monkey[] {
    const regex = /Monkey (?<monkey>\d):\n\s*Starting items: (?<startingItems>\d+(?:, \d+)*)\n\s*Operation: (?<operation>.*)\n\s*Test: divisible by (?<divisibleBy>\d+)\n\s*If true: throw to monkey (?<sendToIfTrue>\d)\n\s*If false: throw to monkey (?<sendToIfFalse>\d)/gm

    let match: RegExpExecArray;

    const monkeys: Monkey[] = []

    while ((match = regex.exec(input.join('\n'))) !== null) {
        const { monkey, startingItems, operation, divisibleBy, sendToIfTrue, sendToIfFalse } = match.groups
        const operationFn = v1
            ? new Function('old', `${operation.replace('new', 'v')}; return Math.floor(v / 3)`) as (a: number) => number
            : new Function('old', `${operation.replace('new', 'v')}; return v`) as (a: number) => number

        monkeys.push({
            id: Number(monkey),
            items: startingItems.split(', ').map(Number),
            operation: operationFn,
            divisibleBy: Number(divisibleBy),
            sendToIfTrue: Number(sendToIfTrue),
            sendToIfFalse: Number(sendToIfFalse),
            inspectedItems: 0
        })
    }

    return monkeys
}

const product = (array, init = 1) => array.reduce((a, b) => a * b, init)

function loop(input: string[], v1: boolean = true) {
    const monkeys = parseInput(input, v1)

    const productOfDivisibleBy = product(monkeys.map(monkey => monkey.divisibleBy))

    const nbRounds = v1 ? 20 : 10000
    for (let i = 0; i < nbRounds; i++) {
        monkeys.forEach(monkey => {
            while (monkey.items.length) {
                monkey.inspectedItems++
                const item = monkey.items.shift()
                let worryLevel = monkey.operation(item)
                if (!v1) {
                    worryLevel %= productOfDivisibleBy
                }
                if (worryLevel % monkey.divisibleBy === 0) {
                    monkeys[monkey.sendToIfTrue].items.push(worryLevel)
                } else {
                    monkeys[monkey.sendToIfFalse].items.push(worryLevel)
                }
            }
        })
    }

    return monkeys.map(monkey => monkey.inspectedItems)
        .sort((a, b) => a > b ? -1 : 1)
        .slice(0, 2)
        .reduce((acc, curr) => acc * curr, 1)
}

export const puzzle1 = (input: string[]): number => loop(input, true)
export const puzzle2 = (input: string[]): number => loop(input, false)