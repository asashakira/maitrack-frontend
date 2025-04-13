export function getScoreRank(accuracy: string) {
    const acc = parseFloat(accuracy.replace('%', ''))

    if (isNaN(acc)) return 'Invalid'

    if (acc >= 100.5) return 'SSS+'
    if (acc >= 100) return 'SSS'
    if (acc >= 99.5) return 'SS+'
    if (acc >= 99) return 'SS'
    if (acc >= 98) return 'S+'
    if (acc >= 97) return 'S'
    if (acc >= 94) return 'AAA'
    if (acc >= 90) return 'AA'
    if (acc >= 80) return 'A'
    if (acc >= 75) return 'BB'
    if (acc >= 60) return 'B'
    if (acc >= 50) return 'C'
    return 'D'
}
