import { countOverlapingSections, countPairsWithOneRangeInTheOther } from ".";

const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`.split('\n');

describe('Day 02', () => {
    test('Puzzle 4.1', () => {
        expect(countPairsWithOneRangeInTheOther(sample)).toBe(2)
    })

    test('Puzzle 4.2', () => {
        expect(countOverlapingSections(sample)).toBe(4)
    })
})