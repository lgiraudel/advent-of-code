import * as fs from 'fs'
import * as path from 'path'

const importFile = (dirname, filename = 'input.txt') =>
    fs.readFileSync(path.join(dirname, filename), 'utf-8').split('\n')

export default {
    importFile
}