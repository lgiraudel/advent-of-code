const { importFile } = require('../../helpers')

const getPairInsertions = input => {
    return input.filter(Boolean).reduce((pairInsertions, pairInsertion) => {
        const [pair, element] = pairInsertion.split(' -> ')
        pairInsertions[pair] = element
        return pairInsertions
    }, {})
}

const processPairInsertions = (
    polymerTemplate,
    pairInsertions,
    maxIterations
) => {
    console.log(maxIterations)
    let newPolymerTemplate = [polymerTemplate[0]]
    const length = polymerTemplate.length
    for (let i = 1; i < length; i++) {
        const pairToSearch = polymerTemplate[i - 1] + polymerTemplate[i]
        const elementToInsert = pairInsertions[pairToSearch]

        if (elementToInsert) {
            newPolymerTemplate.push(elementToInsert)
        }
        newPolymerTemplate.push(polymerTemplate[i])
    }
    if (maxIterations === 1) {
        return newPolymerTemplate
    }
    return processPairInsertions(
        newPolymerTemplate,
        pairInsertions,
        maxIterations - 1
    )
}

const countMaxAndMinElements = polymerTemplate => {
    const elementsMap = polymerTemplate.reduce((elements, element) => {
        elements[element] = elements[element] || 0
        elements[element]++
        return elements
    }, {})
    const values = Object.values(elementsMap)
    const max = values.reduce((max, cur) => Math.max(max, cur), values[0])
    const min = values.reduce((min, cur) => Math.min(min, cur), values[0])
    return [max, min]
}

const processElementsDiff = (input, maxIterations) => {
    const inputCopy = [...input]
    const polymerTemplate = inputCopy.shift()
    const pairInsertions = getPairInsertions(inputCopy)
    const newPolymerTemplate = processPairInsertions(
        polymerTemplate.split(''),
        pairInsertions,
        maxIterations
    )
    const [maxElement, minElement] = countMaxAndMinElements(newPolymerTemplate)
    return maxElement - minElement
}

const input = importFile(__dirname)
//console.log(processElementsDiff(input, 10))

module.exports = {
    processElementsDiff,
}
