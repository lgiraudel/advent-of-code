const getRanges = (line: string): number[][] => line.split(',').map(range => range.split('-').map(Number))

export function countPairsWithOneRangeInTheOther(input: string[]): number {
    const isFullyOverlapping = (range1: number[], range2: number[]): boolean => {
        return range1[0] <= range2[0] && range1[1] >= range2[1]
            || range1[0] >= range2[0] && range1[1] <= range2[1]
    }
    
    return input.filter((line: string) => {
        const [rangeElve1, rangeElve2] = getRanges(line)

        return isFullyOverlapping(rangeElve1, rangeElve2)
    }).length
}

export function countOverlapingSections(input: string[]): number {
    const getOverlappingSections = (range1: number[], range2: number[]): number => {
        // AAA...
        // ..BBB.
        if (range1[0] <= range2[0] && range1[1] >= range2[0] && range1[1] <= range2[1]) {
            return range1[1] - range2[0] + 1
        }

        // ..AAAAA...
        // .BBBBBBB..
        if (range1[0] >= range2[0] && range1[1] <= range2[1]) {
            return range1[1] - range1[0] + 1
        }

        // ...AAA
        // .BBB..
        if (range1[0] >= range2[0] && range1[0] <= range2[1] && range1[1] >= range2[1]) {
            return range2[1] - range1[0] + 1            
        }

        // .AAAAA.
        // ..BBB..
        if (range1[0] <= range2[0] && range1[1] >= range2[1]) {
            return range2[1] - range2[0] + 1
        }

        return 0
    }

    return input.filter((line: string) => {
        const [rangeElve1, rangeElve2] = getRanges(line)

        return getOverlappingSections(rangeElve1, rangeElve2)
    }).length
}