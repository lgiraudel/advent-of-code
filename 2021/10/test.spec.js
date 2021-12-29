const { countSyntaxErrorScore, countIncompleteScore } = require('.')

const sample = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`.split('\n')

describe('Day 10', () => {
    test('Puzzle 10.1', () => {
        expect(countSyntaxErrorScore(sample)).toBe(26397)
    })

    test('Puzzle 10.2', () => {
        expect(countIncompleteScore(sample)).toBe(288957)
    })
})
