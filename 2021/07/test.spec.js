const { getFuelAmount, getFuelAmountV2 } = require('.')

const sample = `16,1,2,0,4,2,7,1,2,14`.split('\n')

describe('Day 07', () => {
    test('Puzzle 07.1', () => {
        expect(getFuelAmount(sample)).toBe(37)
    })

    test('Puzzle 07.2', () => {
        expect(getFuelAmountV2(sample)).toBe(168)
    })
})
