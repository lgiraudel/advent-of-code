const { getPowerConsumption, getPowerConsumptionV2 } = require('.')

const sample = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`.split('\n')

describe('Day 03', () => {
    test('Puzzle 3.1', () => {
        expect(getPowerConsumption(sample)).toBe(198)
    })

    test('Puzzle 3.2', () => {
        expect(getPowerConsumptionV2(sample)).toBe(230)
    })
})
