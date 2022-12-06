import { getFinalWord, getFinalWordV2 } from "."

const sample = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.split('\n')

describe('Day 05', () => {
    test('Puzzle 5.1', () => {
        expect(getFinalWord(sample)).toBe('CMZ')
    })

    test('Puzzle 5.2', () => {
        expect(getFinalWordV2(sample)).toBe('MCD')
    })
})