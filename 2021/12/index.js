const { importFile, unique } = require('../../helpers')

const buildGraph = input => {
    return input.reduce((nodes, edge) => {
        const [node1, node2] = edge.split('-')

        nodes[node1] = nodes[node1] || { name: node1, siblings: [] }
        nodes[node2] = nodes[node2] || { name: node2, siblings: [] }

        nodes[node1].siblings.push(node2)
        nodes[node2].siblings.push(node1)
        return nodes
    }, {})
}

const isUpperCase = str => str.toUpperCase() === str
const isLowerCase = str => str.toLowerCase() === str

const parseNode = (currentNodeName, previousNodes, graph, isValidSibling) => {
    const currentNode = graph[currentNodeName]
    previousNodes = previousNodes.concat([currentNode.name])
    if (currentNode.name === 'end') {
        return [previousNodes]
    }

    const parsableSiblings = currentNode.siblings.filter(
        isValidSibling(previousNodes)
    )
    return parsableSiblings.reduce((paths, siblingName) => {
        return paths.concat(
            parseNode(siblingName, previousNodes, graph, isValidSibling)
        )
    }, [])
}

const isValidSibling = withDuplicate => previousNodes => siblingName => {
    if (siblingName === 'start') {
        return false
    }
    if (isUpperCase(siblingName) || !previousNodes.includes(siblingName)) {
        return true
    }
    if (withDuplicate) {
        const lowerCaseSiblings = previousNodes.filter(isLowerCase)
        return lowerCaseSiblings.length < unique(lowerCaseSiblings).length + 1
    }
    return false
}

const countPaths = (input, withDuplicate) => {
    const graph = buildGraph(input)
    const paths = parseNode('start', [], graph, isValidSibling(withDuplicate))
    return paths.length
}

const input = importFile(__dirname)
console.log(countPaths(input, false))
console.log(countPaths(input, true))

module.exports = {
    countPaths,
}
