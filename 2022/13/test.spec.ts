import { puzzle1, puzzle2 } from '.'

const sample = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`.split('\n')

describe('Day 13', () => {
    test('Puzzle 13.1', () => {
        expect(puzzle1(sample)).toBe(13)
    })

    test('Puzzle 13.2', () => {
        expect(puzzle2(sample)).toBe(140)
    })
})