const { importFile, sum } = require('../../helpers')

const countLanternfish = (input, nbDays) => {
    let ages = input[0]
        .split(',')
        .map(Number)
        .reduce((ages, age) => {
            ages[age] = (ages[age] || 0) + 1
            return ages
        }, {})

    for (let i = 0; i < nbDays; i++) {
        const newAges = {}

        Object.entries(ages).forEach(([ageStr, count]) => {
            const age = Number(ageStr)
            if (age === 0) {
                newAges[6] = (newAges[6] || 0) + count
                newAges[8] = count
            } else {
                newAges[age - 1] = (newAges[age - 1] || 0) + count
            }
        })
        ages = newAges
    }
    return sum(Object.values(ages), age => age)
}

const input = importFile(__dirname)
console.log(countLanternfish(input, 80))
console.log(countLanternfish(input, 256))

module.exports = {
    countLanternfish,
}
