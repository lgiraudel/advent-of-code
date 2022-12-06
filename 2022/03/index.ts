const sumPriorities = (items: string[]): number => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    return items.reduce((sum: number, char: string) => {
        return sum + chars.indexOf(char) + 1
    }, 0)
}

export function getWronglyLoadedItemsPrioritySum(input: string[]): number {
    const wronglyLoadedItems = input.reduce((wronglyLoadedItems: string[], line: string) => {
        const [left, right] = [line.slice(0, line.length / 2), line.slice(line.length / 2)]
        wronglyLoadedItems.push(left.split('').find(char => right.indexOf(char) !== -1)!);
        return wronglyLoadedItems;
    }, [])

    return sumPriorities(wronglyLoadedItems)
}

export function getBadgesSum(input: string[]): number {
    const groups = input.reduce((groups: string[][], line: string, i: number) => {
        if (i % 3 === 0) {
            groups.push([line])
        } else {
            groups[groups.length - 1].push(line)
        }
        return groups
    }, [])

    const itemIsInGroups2And3 = (item: string, group2: string, group3: string): boolean => {
        return group2.indexOf(item) !== -1 && group3.indexOf(item) !== -1
    }

    const badges = groups.reduce((badges: string[], group: string[]) => {
        badges.push(group[0].split('').find(char => itemIsInGroups2And3(char, group[1], group[2]))!)
        return badges
    }, [])

    return sumPriorities(badges)
}