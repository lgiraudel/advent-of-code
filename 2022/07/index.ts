type CD = {
    type: 'cd';
    path: '/' | '..' | string;
}
type LS = { type: 'ls' };
type Command = CD | LS;
type File = {
    type: 'file';
    name: string;
    size: number;
}
type Dir = {
    type: 'dir';
    name: string;
}
type Output = File | Dir;
type Line = Command | Output;

class Node {
    name: string;
    parent?: DirNode;
    size: number;
    level: number;

    constructor(name: string, parent?: DirNode, size: number = 0) {
        this.name = name
        this.size = size
        this.parent = parent
        this.level = (parent?.level ?? -1) + 1
    }
}

class FileNode extends Node {}
class DirNode extends Node {
    children: Node[];

    constructor(name: string, parent?: DirNode, size: number = 0) {
        super(name, parent, size)
        this.children = []
    }
    
    add(node: Node) {
        if (node instanceof FileNode) {
            this.incrementSize(node.size)
        }
        this.children.push(node)
    }

    incrementSize(size: number) {
        this.size += size
        this.parent?.incrementSize(size)
    }

    findDir(name: string): DirNode | undefined {
        return this.children.find(child => child instanceof DirNode && child.name === name) as DirNode
    }

    findFile(name: string): FileNode | undefined {
        return this.children.find(child => child instanceof FileNode && child.name === name) as FileNode
    }
}

const parseLine = (input: string): Line => {
    switch (true) {
        case !!input.match(/^\$ cd .*$/): {
            const groups = input.match(/^\$ cd (.*)$/)
            return {
                type: 'cd',
                path: groups![1]
            }
        }
        case !!input.match(/^dir .*/): {
            const groups = input.match(/^dir (.*)/)
            return {
                type: 'dir',
                name: groups![1]
            }
        }
        case !!input.match(/^[0-9]+ .*$/): {
            const groups = input.match(/^([0-9]+) (.*)$/)
            return {
                type: 'file',
                size: Number(groups![1]),
                name: groups![2]
            }
        }
    }
    return { type: 'ls' };
}

const buildDirectoriesTree = (lines: Line[]): DirNode => {
    const root = new DirNode('/');
    let current = root;
    lines.forEach(line => {
        if (line.type === 'cd') {
            if (line.path === '/') {
                current = root
            } else if (line.path !== '..') {
                const existingNode = current.findDir(line.path)

                if (existingNode) {
                    current = existingNode
                } else {
                    const newNode = new DirNode(line.path, current)
                    current.add(newNode)
                    current = newNode
                }
            } else {
                current = current.parent || root
            }
        } else if (line.type === 'file') {
            const alreadyExistingFile = current.findFile(line.name)
            if (!alreadyExistingFile) {
                const file = new FileNode(line.name, current, line.size)
                current.add(file)
            }
        }
    })
    return root
}

const sortNodes = (a: Node, b: Node): number => {
    return a.name > b.name ? 1 : -1
}

const traverseTree = <T>(node: Node, f: (acc: T, child: Node) => T, initValue: T): T => {
    let res = f(initValue, node);
    if (node instanceof DirNode) {
        res = node.children.sort(sortNodes).reduce((acc, child) => {
            return traverseTree(child, f, acc)
        }, res)
    }
    return res
}

// const printTree = (node: DirNode): void => {
//     console.log(traverseTree(node, (acc, node) => {
//         return acc + `${Array(node.level).fill(' ').join('')}- ${node.name} (${node instanceof DirNode ? 'dir' : 'file'}, size=${node.size})\n`
//     }, ''))
// }

export function getSumOfDirectoriesSize(input: string[], maxSize = 100000): number {
    const lines: Line[] = input.map(parseLine)
    const root = buildDirectoriesTree(lines)
    // printTree(root)
    return traverseTree(root, (acc, node) => {
        if (node instanceof DirNode && node.size < 100000) {
            acc += node.size
        }
        return acc
    }, 0)
}

export function findSmallestDirectoryToFreeEnoughSpace(input: string[]): number {
    const lines: Line[] = input.map(parseLine)
    const root = buildDirectoriesTree(lines)
    const neededSpace = 30000000 - (70000000 - root.size)

    return traverseTree(root, (sizeOfSmallerDirFound, node) => {
        if (node instanceof DirNode && node.size >= neededSpace && node.size < sizeOfSmallerDirFound) {
            return node.size
        }
        return sizeOfSmallerDirFound
    }, 70000000)
}