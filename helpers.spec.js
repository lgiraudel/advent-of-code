const { dichotomicSeach, dichotomicSearchInRange } = require('./helpers')

describe('Helpers tests', () => {
    test('dichotomicSearch', () => {
        const values = [1, 10, 100, 1000, 10000]
        const findFirstBinaryWith10Digits = value => {
            const binary = value.toString(2)

            return 10 - binary.length
        }
        expect(dichotomicSeach(values, findFirstBinaryWith10Digits)).toBe(1000)
    })

    test('dichotomicInRange', () => {
        const findFirstBinaryWith10Digits = value => {
            const binary = value.toString(2)
            const previousBinary = (value - 1).toString(2)

            if (binary.length === 10 && previousBinary.length === 10) {
                return -1
            }

            return 10 - binary.length
        }
        expect(
            dichotomicSearchInRange(
                0,
                100000,
                findFirstBinaryWith10Digits
            ).toString(2)
        ).toBe('1000000000')
    })
})
