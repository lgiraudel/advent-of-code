import { getStartOfMessageMarkerPosition, getStartOfPacketMarkerPosition } from "."

describe('Day 06', () => {
    test('Puzzle 6.1', () => {
        expect(getStartOfPacketMarkerPosition('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7)
        expect(getStartOfPacketMarkerPosition('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5)
        expect(getStartOfPacketMarkerPosition('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6)
        expect(getStartOfPacketMarkerPosition('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10)
        expect(getStartOfPacketMarkerPosition('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11)
    })

    test('Puzzle 6.2', () => {
        expect(getStartOfMessageMarkerPosition('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19)
        expect(getStartOfMessageMarkerPosition('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23)
        expect(getStartOfMessageMarkerPosition('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23)
        expect(getStartOfMessageMarkerPosition('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29)
        expect(getStartOfMessageMarkerPosition('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26)
    })
})