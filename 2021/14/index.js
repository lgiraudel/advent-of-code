const { importFile } = require('../../helpers')

const getPairInsertions = input => {
    return input.filter(Boolean).reduce((pairInsertions, pairInsertion) => {
        const [pair, element] = pairInsertion.split(' -> ')
        pairInsertions[pair] = element
        return pairInsertions
    }, {})
}

const getInitialPairCountersFromPolymer = (polymerTemplate, pairInsertions) => {
    return Object.keys(pairInsertions).reduce((pairCounters, pair) => {
        pairCounters[pair] = (
            polymerTemplate.match(RegExp(pair, 'g')) || []
        ).length
        return pairCounters
    }, {})
}

const getInitialLettersCountersFromPolymer = polymerTemplate => {
    const letterCounters = polymerTemplate
        .split('')
        .reduce((counters, letter) => {
            counters[letter] = polymerTemplate.match(
                new RegExp(letter, 'g')
            ).length
            return counters
        }, {})
    return letterCounters
}

const processPairInsertions = (
    polymerTemplate,
    pairInsertions,
    maxIterations
) => {
    let pairCounters = getInitialPairCountersFromPolymer(
        polymerTemplate,
        pairInsertions
    )
    const letterCounters = getInitialLettersCountersFromPolymer(polymerTemplate)

    for (let i = 0; i < maxIterations; i++) {
        const newPairCounters = Object.entries(pairInsertions).reduce(
            (newCounters, [pair, elem]) => {
                const count = pairCounters[pair]
                const newPair1 = pair[0] + elem
                const newPair2 = elem + pair[1]

                letterCounters[elem] = (letterCounters[elem] || 0) + count

                newCounters[newPair1] = (newCounters[newPair1] || 0) + count
                newCounters[newPair2] = (newCounters[newPair2] || 0) + count
                newCounters[pair] =
                    (newCounters[pair] || 0) + pairCounters[pair] - count

                return newCounters
            },
            {}
        )

        pairCounters = newPairCounters
    }
    return letterCounters
}

const countMaxAndMinElements = letterCounters => [
    Math.max(...Object.values(letterCounters)),
    Math.min(...Object.values(letterCounters)),
]

const processElementsDiff = (input, maxIterations) => {
    const inputCopy = [...input]
    const polymerTemplate = inputCopy.shift()
    const pairInsertions = getPairInsertions(inputCopy)
    const letterCounters = processPairInsertions(
        polymerTemplate,
        pairInsertions,
        maxIterations
    )
    const [maxElement, minElement] = countMaxAndMinElements(letterCounters)
    return maxElement - minElement
}

const input = importFile(__dirname)
console.log(processElementsDiff(input, 10))
console.log(processElementsDiff(input, 40))

module.exports = {
    processElementsDiff,
}
