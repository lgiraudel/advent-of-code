const { sumRiskLevels, multiplyBiggestBasins } = require('.')

const sample = `2199943210
3987894921
9856789892
8767896789
9899965678`.split('\n')

describe('Day 09', () => {
    test('Puzzle 09.1', () => {
        expect(sumRiskLevels(sample)).toBe(15)
    })

    test('Puzzle 09.2', () => {
        expect(multiplyBiggestBasins(sample)).toBe(1134)
    })
})
