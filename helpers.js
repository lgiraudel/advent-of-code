const fs = require('fs')
const path = require('path')

const importFile = (dirname, filename = 'input.txt') =>
    fs.readFileSync(path.join(dirname, filename), 'utf-8').split('\n')

const unique = arr => [...new Set(arr)]

const cache = (fn, cacheKey) => {
    const cacheObj = {}
    return (...args) => {
        const key = cacheKey(...args)
        cacheObj[key] = cacheObj[key] || fn(...args)
        return cacheObj[key]
    }
}

const _dichotomicSeach = (start, end, getValFn, comparisonFn) => {
    while (start <= end) {
        const mid = Math.floor((start + end) / 2)
        const cmp = comparisonFn(getValFn(mid))
        if (cmp < 0) {
            end = mid - 1
        } else if (cmp > 0) {
            start = mid + 1
        } else {
            return mid
        }
    }
}

const dichotomicSeach = (range, comparisonFn) => {
    range = unique(range)

    const index = _dichotomicSeach(
        0,
        range.length - 1,
        i => range[i],
        comparisonFn
    )
    return range[index]
}

const dichotomicSearchInRange = (start, end, comparisonFn) => {
    return _dichotomicSeach(start, end, v => v, comparisonFn)
}

const intersection = (arr1, arr2) => arr1.filter(x => arr2.includes(x))
const diff = (arr1, arr2) => arr1.filter(x => !arr2.includes(x))

const sum = (tab, fn = val => val) =>
    tab.reduce((sum, el, i) => sum + fn(el, i), 0)

const _default = (el, defaultValue) => (el !== undefined ? el : defaultValue)

module.exports = {
    importFile,
    unique,
    cache,
    dichotomicSeach,
    dichotomicSearchInRange,
    intersection,
    diff,
    sum,
    _default,
}
