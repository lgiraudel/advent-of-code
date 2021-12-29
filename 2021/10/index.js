const { sum, importFile } = require('../../helpers')

const OPENING_SYMBOLS = '{[(<'
const CLOSING_SYMBOLS = '}])>'
const WRONGSYMBOL_SCORE_MAPPING = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

const processLines = input =>
    input.map(line => {
        const stack = []
        const wrongSymbol = line.split('').find(symbol => {
            if (OPENING_SYMBOLS.includes(symbol)) {
                stack.push(symbol)
            } else {
                if (
                    stack.pop() !==
                    OPENING_SYMBOLS[CLOSING_SYMBOLS.indexOf(symbol)]
                ) {
                    return symbol
                }
            }
        })

        return { wrongSymbol: wrongSymbol, unclosedSymbols: stack }
    })

const countSyntaxErrorScore = input =>
    sum(
        processLines(input)
            .filter(res => res.wrongSymbol)
            .map(res => WRONGSYMBOL_SCORE_MAPPING[res.wrongSymbol])
    )

const INCOMPLETE_SYMBOLS_SCORE_MAPPING = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
}
const countIncompleteScore = input => {
    const points = processLines(input)
        .filter(res => !res.wrongSymbol)
        .map(res => res.unclosedSymbols)
        .map(line =>
            line
                .reverse()
                .reduce(
                    (total, symbol) =>
                        total * 5 + INCOMPLETE_SYMBOLS_SCORE_MAPPING[symbol],
                    0
                )
        )
        .sort((a, b) => a - b)

    return points[(points.length - 1) / 2]
}

const input = importFile(__dirname)
console.log(countSyntaxErrorScore(input))
console.log(countIncompleteScore(input))

module.exports = {
    countSyntaxErrorScore,
    countIncompleteScore,
}
