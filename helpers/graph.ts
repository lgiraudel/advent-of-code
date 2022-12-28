export type Graph = Record<NodeId, Node>

type NodeId = string;
type Distance = number;

export type Node = {
    id: NodeId;
    siblings: Record<NodeId, Distance>;
}

const shortestDistanceNode = (distances: Record<NodeId, Distance>, visited: NodeId[]): NodeId => {
    let shortest: NodeId = null
    for (let node in distances) {
        let currentIsShortest = shortest === null || distances[node] < distances[shortest]

        if (currentIsShortest && !visited.includes(node)) {
            shortest = node
        }
    }
    return shortest
}

const findShortestPath = (graph: Graph, startNode: NodeId, endNode: NodeId): { distance: Distance; path: NodeId[] } => {
    let distances: Record<NodeId, Distance> = {} // distances from the start node
    distances[endNode] = Infinity
    distances = Object.assign(distances, graph[startNode].siblings)

    // track paths using a hash object
    const parents: Record<NodeId, NodeId> = { [endNode]: null }
    for (let child in graph[startNode]) {
        parents[child] = startNode
    }

    // collect visited nodes
    const visited: NodeId[] = []

    // find the nearest node
    let node = shortestDistanceNode(distances, visited)

    // for that node
    while (node) {
        // find its distance from the start node & its child nodes
        const distance = distances[node]
        const children = graph[node].siblings

        // for each of those child nodes
        for (let child in children) {
            // make sure each child node is not the start
            if (child === startNode) {
                continue
            } else {
                // save the distance from the start node to the child node
                let newDistance = distance + children[child]

                // if there's no recorded distance from the start node to the child node in the distance object
                // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
                if (!distances[child] || distances[child] > newDistance) {
                    // save the distance to the object
                    distances[child] = newDistance
                    // record the path
                    parents[child] = node
                }
            }
        }
        // move the current node to the visited set
        visited.push(node)

        // move to the nearest neighbor node
        node = shortestDistanceNode(distances, visited)
    }

    // using the stored paths from start node to end node
    // record the shortest path
    const shortestPath = [endNode]
    let parent = parents[endNode]
    while (parent) {
        shortestPath.push(parent)
        parent = parents[parent]
    }
    shortestPath.reverse()

    // this is the shortest path
    return {
        distance: distances[endNode],
        path: shortestPath
    }
}

export default {
    dijkstra: findShortestPath
}