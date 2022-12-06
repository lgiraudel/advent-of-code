export function getTotalScore(input: string[]): number {
    const ROCK = 'A'
    const PAPER = 'B'
    const SCISSOR = 'C'
    const YOUR_ROCK = 'X'
    const YOUR_PAPER = 'Y'
    const YOUR_SCISSOR = 'Z'
    const YOUR_CHOICES = [YOUR_ROCK, YOUR_PAPER, YOUR_SCISSOR]
    
    return input.reduce((sum: number, line: string) => {
        const [opponentChoice, yourChoice] = line.split(' ') as [typeof ROCK | typeof PAPER | typeof SCISSOR, typeof YOUR_ROCK | typeof YOUR_PAPER | typeof YOUR_SCISSOR];

        const scores = {
            [ROCK]: [YOUR_SCISSOR, YOUR_ROCK, YOUR_PAPER],
            [PAPER]: [YOUR_ROCK, YOUR_PAPER, YOUR_SCISSOR],
            [SCISSOR]: [YOUR_PAPER, YOUR_SCISSOR, YOUR_ROCK],
        }

        return sum + scores[opponentChoice].indexOf(yourChoice) * 3 + YOUR_CHOICES.indexOf(yourChoice) + 1
    }, 0)
}

export function getTotalScoreV2(input: string[]): number {
    const LOOSE = 'X'
    const DRAW = 'Y'
    const WIN = 'Z'
    const ROCK = 'A'
    const PAPER = 'B'
    const SCISSOR = 'C'

    const choiceToMake = {
        [DRAW]: {
            [ROCK]: ROCK,
            [PAPER]: PAPER,
            [SCISSOR]: SCISSOR,
        },
        [LOOSE]: {
            [ROCK]: SCISSOR,
            [PAPER]: ROCK,
            [SCISSOR]: PAPER,
        },
        [WIN]: {
            [ROCK]: PAPER,
            [PAPER]: SCISSOR,
            [SCISSOR]: ROCK,
        }
    }
    return input.reduce((sum: number, line: string) => {
        const [opponentChoice, requiredEnd] = line.split(' ') as [typeof ROCK | typeof PAPER | typeof SCISSOR, typeof DRAW | typeof LOOSE | typeof WIN];

        let yourChoice = choiceToMake[requiredEnd][opponentChoice];
        const roundScore = [LOOSE, DRAW, WIN].indexOf(requiredEnd) * 3 + [ROCK, PAPER, SCISSOR].indexOf(yourChoice) + 1;

        return sum + roundScore;
    }, 0)
}