const { processElementsDiff } = require('.')

const sample = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`.split('\n')

describe('Day 14', () => {
    test('Puzzle 14.1', () => {
        expect(processElementsDiff(sample, 10)).toBe(1588)
    })

    test('Puzzle 14.2', () => {
        expect(processElementsDiff(sample, 40)).toBe(2188189693529)
    })
})
