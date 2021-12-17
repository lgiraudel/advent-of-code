const { importFile } = require('../../helpers')

const countOnes = str => str.split('1').length - 1

const isOneMostCommon = (input, digit) => {
    const columnStr = input.map(line => line[digit]).join('')
    return countOnes(columnStr) >= columnStr.length / 2
}

const getPowerConsumption = input => {
    let gamma = ''
    let epsilon = ''

    for (let i = 0; i < input[0].length; i++) {
        const oneIsMostCommon = isOneMostCommon(input, i)

        gamma += Number(oneIsMostCommon)
        epsilon += Number(!oneIsMostCommon)
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

const mostFrequentDigit = (input, digit) => {
    return isOneMostCommon(input, digit) ? '1' : '0'
}

const leastFrequentDigit = (input, digit) => {
    return isOneMostCommon(input, digit) ? '0' : '1'
}

const getElementConsumption = (input, predicate) => {
    let validValues = input

    let currentDigit = 0
    while (validValues.length > 1) {
        validValues = validValues.filter(
            value =>
                value[currentDigit] === predicate(validValues, currentDigit)
        )
        currentDigit++
    }

    return parseInt(validValues[0], 2)
}

const getOxygenConsumption = input =>
    getElementConsumption(input, mostFrequentDigit)

const getCO2Consumption = input =>
    getElementConsumption(input, leastFrequentDigit)

const getPowerConsumptionV2 = input => {
    return getOxygenConsumption(input) * getCO2Consumption(input)
}

const input = importFile(__dirname)
console.log(getPowerConsumption(input))
console.log(getPowerConsumptionV2(input))

module.exports = {
    getPowerConsumption,
    getPowerConsumptionV2,
}
