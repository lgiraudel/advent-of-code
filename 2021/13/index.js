const { importFile } = require('../../helpers')

const extractDotCoordinates = input => {
    const emptyLineIndex = input.indexOf('')
    return input.slice(0, emptyLineIndex)
}

const extractFoldActions = input => {
    const emptyLineIndex = input.indexOf('')
    return input
        .slice(emptyLineIndex + 1)
        .map(action => action.replace('fold along ', '').split('='))
}

const buildTransparentPaper = dotCoordinates => {
    const coordinatesAsInt = dotCoordinates.map(coordinates =>
        coordinates.split(',').map(Number)
    )

    return {
        dots: dotCoordinates,
        coordinates: coordinatesAsInt,
    }
}

const printTransparentPaper = transparentPaper => {
    const width =
        Math.max(...transparentPaper.coordinates.map(([x, _y]) => x)) + 1
    const height =
        Math.max(...transparentPaper.coordinates.map(([_x, y]) => y)) + 1

    const output = Array(height)
        .fill(undefined)
        .map((_, y) =>
            Array(width)
                .fill(undefined)
                .map((_, x) =>
                    transparentPaper.dots.includes(`${x},${y}`) ? '#' : ' '
                )
                .join('')
        )
        .join('\n')
    console.log(output)
}

const foldVertically = (transparentPaper, foldCoord) => {
    const newTransparentPaper = {
        coordinates: [],
        dots: [],
    }

    transparentPaper.coordinates.forEach(([x, y]) => {
        if (x < foldCoord) {
            newTransparentPaper.coordinates.push([x, y])
            newTransparentPaper.dots.push(`${x},${y}`)
        } else {
            const newDot = [foldCoord - (x - foldCoord), y]
            if (transparentPaper.dots.includes(newDot.join(','))) {
                return
            }
            newTransparentPaper.coordinates.push(newDot)
            newTransparentPaper.dots.push(newDot.join(','))
        }
    })
    return newTransparentPaper
}
const foldHorizontally = (transparentPaper, foldCoord) => {
    const newTransparentPaper = {
        coordinates: [],
        dots: [],
    }

    transparentPaper.coordinates.forEach(([x, y]) => {
        if (y < foldCoord) {
            newTransparentPaper.coordinates.push([x, y])
            newTransparentPaper.dots.push(`${x},${y}`)
        } else {
            const newDot = [x, foldCoord - (y - foldCoord)]
            if (transparentPaper.dots.includes(newDot.join(','))) {
                return
            }
            newTransparentPaper.coordinates.push(newDot)
            newTransparentPaper.dots.push(newDot.join(','))
        }
    })
    return newTransparentPaper
}

const foldTransparentPaper = (transparentPaper, foldAction) => {
    const [axe, coordStr] = foldAction
    switch (axe) {
        case 'y': {
            return foldHorizontally(transparentPaper, Number(coordStr))
        }
        case 'x': {
            return foldVertically(transparentPaper, Number(coordStr))
        }
    }
}

const countVisibleDotsAfterFirstFold = input => {
    const dotCoordinates = extractDotCoordinates(input)
    const foldActions = extractFoldActions(input)
    let transparentPaper = buildTransparentPaper(dotCoordinates)
    transparentPaper = foldTransparentPaper(
        transparentPaper,
        foldActions.shift()
    )
    return transparentPaper.dots.length
}

const printResultCode = input => {
    const dotCoordinates = extractDotCoordinates(input)
    const foldActions = extractFoldActions(input)
    let transparentPaper = buildTransparentPaper(dotCoordinates)
    foldActions.forEach(action => {
        transparentPaper = foldTransparentPaper(transparentPaper, action)
    })
    printTransparentPaper(transparentPaper)
}

const input = importFile(__dirname)
printResultCode(input)

module.exports = {
    countVisibleDotsAfterFirstFold,
}
