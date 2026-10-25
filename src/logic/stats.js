export function meilleuresParties(parties) {
    return parties
        .filter((p) => p.gagne)
        .sort((a, b) => b.points - a.points)
        .slice(0, 10)
}

export function statistiques(parties, pseudo) {
    const cle = (pseudo || "").trim().toLowerCase()
    const siennes = parties.filter((p) => p.pseudo.trim().toLowerCase() === cle)

    const victoires = siennes.filter((p) => p.gagne).length
    const repartition = [0, 0, 0, 0, 0, 0]
    let totalPoints = 0
    let serieEnCours = 0
    let meilleureSerie = 0

    for (const partie of siennes) {
        totalPoints += partie.points
        if (partie.gagne) {
            repartition[partie.essais - 1]++
            serieEnCours++
            meilleureSerie = Math.max(meilleureSerie, serieEnCours)
        } else {
            serieEnCours = 0
        }
    }

    return {
        jouees: siennes.length,
        pourcentage: siennes.length === 0 ? 0 : Math.round((victoires / siennes.length) * 100),
        serieEnCours,
        meilleureSerie,
        totalPoints,
        repartition,
    }
}
