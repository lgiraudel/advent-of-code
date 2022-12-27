import $ from '../../helpers/index'

const unique = $.array.unique

function getStartOfMarkerPosition(input: string, markerSize: number): number {
    const chars = input.split('')
    for (let i = markerSize - 1; i <= chars.length; i++) {
        if (unique(chars.slice(i - (markerSize - 1), i + 1)).length === markerSize) {
            return i + 1
        }
    }
    return 0
}

export function getStartOfPacketMarkerPosition(input: string): number {
    return getStartOfMarkerPosition(input, 4)
}

export function getStartOfMessageMarkerPosition(input: string): number {
    return getStartOfMarkerPosition(input, 14)
}