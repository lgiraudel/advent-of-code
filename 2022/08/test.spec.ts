import { puzzle1, puzzle2 } from '.'

const sample = `30373
25512
65332
33549
35390`.split('\n')

describe('Day 08', () => {
    test('Puzzle 08.1', () => {
        expect(puzzle1(sample)).toBe(21)
    })

    test('Puzzle 08.2', () => {
        expect(puzzle2(sample)).toBe(8)
    })
})