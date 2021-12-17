const fs = require('fs')
const path = require('path')

const importFile = (dirname, filename = 'input.txt') =>
    fs.readFileSync(path.join(dirname, filename), 'utf-8').split('\n')

const unique = arr => [...new Set(arr)]

module.exports = {
    importFile,
    unique,
}
