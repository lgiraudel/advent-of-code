const getMaxCaloriesOfNElves = (input, n) => {
    input.push('')
    const result = input.reduce((result, currentCaloriesAsString) => {
        const currentCalories = Number(currentCaloriesAsString)
        if (currentCaloriesAsString) {
            return {
                ...result,
                current: result.current + currentCalories
            }
        } else {
            return {
                max: result.max.concat(result.current).sort((a, b) => b - a).splice(0, n),
                current: 0
            }
        }
    }, {max: [], current: 0})

    return result.max.reduce((sum, cur) => sum + cur, 0)
}

export const getMaxCalories = input => getMaxCaloriesOfNElves(input, 1)
export const getMaxCaloriesOf3Elves = input => getMaxCaloriesOfNElves(input, 3)
