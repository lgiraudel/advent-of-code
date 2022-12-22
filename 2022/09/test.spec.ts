import { puzzle1, puzzle2 } from '.'

const sample = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`.split('\n')

const sample2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`.split('\n')

describe('Day 09', () => {
    test('Puzzle 09.1', () => {
        expect(puzzle1(sample)).toBe(13)
    })

    test('Puzzle 09.2', () => {
        expect(puzzle2(sample2)).toBe(36)
    })
})