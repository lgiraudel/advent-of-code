const { countLanternfish } = require('.')

const sample = `3,4,3,1,2`.split('\n')

describe('Day 06', () => {
    test('Puzzle 06.1', () => {
        expect(countLanternfish(sample, 80)).toBe(5934)
    })

    test('Puzzle 06.2', () => {
        expect(countLanternfish(sample, 256)).toBe(26984457539)
    })
})
