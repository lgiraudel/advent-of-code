const { importFile, sum } = require('../../helpers')

const checkTable = table => {
    // check lines
    const hasFullLine = table
        .map(line => !line.some(v => v !== null))
        .some(Boolean)

    if (hasFullLine) {
        return table
    }

    // check rows
    for (let i = 0; i < table[0].length; i++) {
        let hasFullRow = true
        for (let j = 0; j < table.length; j++) {
            if (table[j][i] !== null) {
                hasFullRow = false
                break
            }
        }
        if (hasFullRow) {
            return table
        }
    }

    return false
}

const getCalledNumbers = input => input.shift().split(',').map(Number)

const getTables = input =>
    input
        .join('\n')
        .split('\n\n')
        .map(table =>
            table
                .split('\n')
                .filter(Boolean)
                .map(line =>
                    line.trim().replace(/  /g, ' ').split(' ').map(Number)
                )
        )

const getFinalScore = input => {
    const inputCopy = [...input]
    const calledNumbers = getCalledNumbers(inputCopy)
    const tables = getTables(inputCopy)

    let winningTable = null
    let winningValue = null
    while (!winningTable) {
        const nextNumber = calledNumbers.shift()
        for (let i = 0; i < tables.length; i++) {
            let found = false
            tables[i].forEach(line => {
                while (line.includes(nextNumber)) {
                    found = true
                    line.splice(line.indexOf(nextNumber), 1, null)
                }
            })
            if (found) {
                winningTable = checkTable(tables[i])
                winningValue = nextNumber
                if (winningTable) {
                    break
                }
            }
        }
    }

    return winningValue * sum(winningTable, line => sum(line))
}

const getLastFinalScore = input => {
    const inputCopy = [...input]
    const calledNumbers = getCalledNumbers(inputCopy)
    const tables = getTables(inputCopy)

    let winningTable = null
    let winningValue = null
    while (tables.length) {
        const nextNumber = calledNumbers.shift()
        let tablesIndexesToRemove = []
        for (let i = 0; i < tables.length; i++) {
            let found = false
            tables[i].forEach(line => {
                while (line.includes(nextNumber)) {
                    found = true
                    line.splice(line.indexOf(nextNumber), 1, null)
                }
            })
            if (found) {
                winningTable = checkTable(tables[i])
                winningValue = nextNumber
                if (winningTable) {
                    tablesIndexesToRemove.push(i)
                }
            }
        }
        tablesIndexesToRemove.reverse().forEach(index => {
            tables.splice(index, 1)
        })
    }

    return winningValue * sum(winningTable, line => sum(line))
}
const input = importFile(__dirname)
console.log(getFinalScore(input))
console.log(getLastFinalScore(input))

module.exports = {
    getFinalScore,
    getLastFinalScore,
}
