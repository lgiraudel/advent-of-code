import { puzzle1, puzzle2 } from '.'

const sample = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`.split('\n')

describe('Day 12', () => {
    test('Puzzle 12.1', () => {
        expect(puzzle1(sample)).toBe(31)
    })

    test('Puzzle 12.2', () => {
        expect(puzzle2(sample)).toBe(29)
    })
})