const { importFile, intersection, diff } = require('../../helpers')

const explodeLine = line =>
    line
        .split(' | ')
        .map(bloc =>
            bloc.split(' ').map(word => word.split('').sort().join(''))
        )

const countDigits = input => {
    const lines = input.map(explodeLine)

    return lines.reduce((total, [_left, right]) => {
        return (
            total +
            right.filter(word => [2, 3, 4, 7].includes(word.length)).length
        )
    }, 0)
}

/**
 * This function returns the characters present in exactly {count} words of the {words} array
 * For instance present(2, ['abc', 'cde', 'efg']) will return ['c', 'e'] because they are present in exactly 2 words
 */
const present = (count, words) =>
    'abcdefg'
        .split('')
        .filter(
            letter =>
                words.reduce(
                    (total, word) =>
                        total + (word.indexOf(letter) !== -1 ? 1 : 0),
                    0
                ) === count
        )

const uncryptedDigitsTable = {
    abcefg: '0',
    cf: '1',
    acdeg: '2',
    acdfg: '3',
    bcdf: '4',
    abdfg: '5',
    abdefg: '6',
    acf: '7',
    abcdefg: '8',
    abcdfg: '9',
}

const uncryptRightDigits = (righDigits, encryptionTable) => {
    return Number(
        righDigits.reduce((rightValue, encryptedDigit) => {
            const decryptedDigit = encryptedDigit
                .split('')
                .map(segment => encryptionTable[segment])
                .sort()
                .join('')

            return rightValue + uncryptedDigitsTable[decryptedDigit]
        }, '')
    )
}

const decypherLine = ([leftCryptedDigits, rightEncryptedDigits]) => {
    /*
    Rules summary
    =============
    [a] = diff(7, 1)

    [b, d] = diff(4, 1)
    [b, e] = present(1, [2, 3, 5])
    [b] = intersection([b, e], [b, d])
    [d] = diff([b, d], [b])
    [e] = diff([b, e], [b])

    [c, d, e] = present(2, [0, 6, 9])
    [c] = diff([c, d, e], [c])

    [c, f] = intersect(7, 1)
    [f] = diff([c, f], [c])

    [g] = diff(8, [a, b, c, d, e, f])
    */

    const one = leftCryptedDigits.find(d => d.length === 2).split('')
    const seven = leftCryptedDigits.find(d => d.length === 3).split('')
    const four = leftCryptedDigits.find(d => d.length === 4).split('')
    const eight = leftCryptedDigits.find(d => d.length === 7).split('')
    const twoAndThreeAndFive = leftCryptedDigits.filter(d => d.length === 5)
    const zeroAndSixAndNine = leftCryptedDigits.filter(d => d.length === 6)

    // The only segment in 7 which is not in 1 is "a"
    const a = diff(seven, one)[0]

    // The diff between 4 and 1 are segments b & d
    const b_and_d = diff(four, one)
    // Segments b & e are the only ones availables in only one digit among 2, 3 and 5
    const b_and_e = present(1, twoAndThreeAndFive)
    const b = intersection(b_and_d, b_and_e)[0]
    const d = diff(b_and_d, [b])[0]
    const e = diff(b_and_e, [b])[0]

    // Segments c, d & e are the only ones available in only two digits among 0, 6 and 5
    const c_and_d_and_e = present(2, zeroAndSixAndNine)
    const c = diff(c_and_d_and_e, [d, e])[0]

    // The intersection between 7 and 1 are segments c & f
    const c_and_f = intersection(seven, one)
    const f = diff(c_and_f, [c])[0]

    const g = diff(eight, [a, b, c, d, e, f])[0]

    const encryptionTable = {
        [a]: 'a',
        [b]: 'b',
        [c]: 'c',
        [d]: 'd',
        [e]: 'e',
        [f]: 'f',
        [g]: 'g',
    }

    return uncryptRightDigits(rightEncryptedDigits, encryptionTable)
}

const sumDigits = input => {
    return input.reduce((total, line) => {
        return total + decypherLine(explodeLine(line))
    }, 0)
}

const input = importFile(__dirname)
console.log(countDigits(input))
console.log(sumDigits(input))

module.exports = {
    countDigits,
    sumDigits,
    decypherLine,
    explodeLine,
}
