import { findSmallestDirectoryToFreeEnoughSpace, getSumOfDirectoriesSize } from "."

const sample = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`.split('\n')

describe('Day 07', () => {
    test('Puzzle 7.1', () => {
        expect(getSumOfDirectoriesSize(sample)).toBe(95437)
    })

    test('Puzzle 7.2', () => {
        expect(findSmallestDirectoryToFreeEnoughSpace(sample)).toBe(24933642)
    })
})