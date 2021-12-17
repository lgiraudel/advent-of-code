const { countPaths, countPathsV2 } = require('.')

const sample1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`.split('\n')

const sample2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`.split('\n')

const sample3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`.split('\n')

describe('Day 12', () => {
    test('Puzzle 12.1', () => {
        expect(countPaths(sample1, false)).toBe(10)
        expect(countPaths(sample2, false)).toBe(19)
        expect(countPaths(sample3, false)).toBe(226)
    })

    test('Puzzle 12.2', () => {
        expect(countPaths(sample1, true)).toBe(36)
        expect(countPaths(sample2, true)).toBe(103)
        expect(countPaths(sample3, true)).toBe(3509)
    })
})
