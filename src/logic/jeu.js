import ACCENTS from '../data/accents.json'

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

export function nbPoints(nbEssais, gagne) {
    if (!gagne) {
        return 0
    }
    return 700 - (nbEssais * 100)
}

export function sansAccents(texte) {
    return texte
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/œ/g, "oe")
        .replace(/æ/g, "ae")
        .toLowerCase()
}

export function motAvecAccents(mot) {
    const minuscule = mot.toLowerCase()
    return ACCENTS[minuscule] || minuscule
}

export function statutsLettres(essais) {
    const rang = { absent: 1, jaune: 2, vert: 3 }
    const statuts = {}
    for (const essai of essais) {
        for (let i = 0; i < essai.mot.length; i++) {
            const lettre = essai.mot[i]
            const statut = essai.resultat[i]
            if (!statuts[lettre] || rang[statut] > rang[statuts[lettre]]) {
                statuts[lettre] = statut
            }
        }
    }
    return statuts
}
