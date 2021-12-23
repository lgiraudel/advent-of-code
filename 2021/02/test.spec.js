const { getFinalPosition, getFinalPositionV2 } = require('.')

const sample = `forward 5
down 5
forward 8
up 3
down 8
forward 2`.split('\n')

describe('Day 02', () => {
    test('Puzzle 2.1', () => {
        expect(getFinalPosition(sample)).toBe(150)
    })

    test('Puzzle 2.2', () => {
        expect(getFinalPositionV2(sample, true)).toBe(900)
    })
})
