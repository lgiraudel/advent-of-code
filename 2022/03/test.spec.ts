import { getBadgesSum, getWronglyLoadedItemsPrioritySum } from ".";

const sample = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`.split('\n');

describe('Day 02', () => {
    test('Puzzle 3.1', () => {
        expect(getWronglyLoadedItemsPrioritySum(sample)).toBe(157)
    })

    test('Puzzle 3.2', () => {
        expect(getBadgesSum(sample)).toBe(70)
    })
})