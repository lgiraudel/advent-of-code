const { countIncreases, countWindowIncreases } = require('.')

const sample = `199
200
208
210
200
207
240
269
260
263`.split('\n')

describe('Day 01', () => {
    test('Puzzle 1.1', () => {
        expect(countIncreases(sample)).toBe(7)
    })

    test('Puzzle 1.2', () => {
        expect(countWindowIncreases(sample)).toBe(5)
    })
})
