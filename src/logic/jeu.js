export function comparerMots(motCache, proposition) {
    const resultat = Array(motCache.length).fill("absent")
    const lettres = motCache.split("")

    for (let i = 0; i < motCache.length; i++) {
        if (motCache[i] === proposition[i]) {
            resultat[i] = "vert"
            lettres[i] = null
        }
    }

    for (let i = 0; i < motCache.length; i++) {
        if (resultat[i] !== "vert" && lettres.includes(proposition[i])) {
            resultat[i] = "jaune"
            lettres[lettres.indexOf(proposition[i])] = null
        }
    }

    return resultat
}

export function estGagne(resultat) {
    for (let i = 0; i < resultat.length; i++) {
        if (resultat[i] !== "vert") {
            return false
        }
    }
    return true
}