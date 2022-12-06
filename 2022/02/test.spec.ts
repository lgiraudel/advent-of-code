import { getTotalScore, getTotalScoreV2 } from '.';

const sample = `A Y
B X
C Z`.split('\n');

describe('Day 02', () => {
    test('Puzzle 2.1', () => {
        expect(getTotalScore(sample)).toBe(15)
    })

    test('Puzzle 2.2', () => {
        expect(getTotalScoreV2(sample)).toBe(12)
    })
})