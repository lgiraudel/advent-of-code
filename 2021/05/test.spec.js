const { getTotalPoints, getTotalPointsWithDiagonals } = require('.')

const sample = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`.split('\n')

describe('Day 05', () => {
    test('Puzzle 05.1', () => {
        expect(getTotalPoints(sample)).toBe(5)
    })

    test('Puzzle 05.2', () => {
        expect(getTotalPointsWithDiagonals(sample)).toBe(12)
    })
})
