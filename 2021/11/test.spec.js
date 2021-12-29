const { countFlashes, simultaneousFlashStep } = require('.')

const sample = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`.split('\n')

describe('Day 11', () => {
    test('Puzzle 11.1', () => {
        expect(countFlashes(sample, 100)).toBe(1656)
    })

    test('Puzzle 11.2', () => {
        expect(simultaneousFlashStep(sample)).toBe(195)
    })
})
