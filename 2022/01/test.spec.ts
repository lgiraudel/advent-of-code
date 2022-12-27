import { getMaxCalories, getMaxCaloriesOf3Elves } from '.';

const sample = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`.split('\n');

describe('Day 01', () => {
    test('Puzzle 1.1', () => {
        expect(getMaxCalories(sample)).toBe(24000)
    })

    test('Puzzle 1.2', () => {
        expect(getMaxCaloriesOf3Elves(sample)).toBe(45000)
    })
})