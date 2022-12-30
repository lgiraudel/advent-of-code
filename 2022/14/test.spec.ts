import { puzzle1, puzzle2 } from '.'

const sample = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`.split('\n')

describe('Day 14', () => {
    test('Puzzle 14.1', () => {
        expect(puzzle1(sample)).toBe(24)
    })

    test('Puzzle 14.2', () => {
        expect(puzzle2(sample)).toBe(93)
    })
})