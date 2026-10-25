const CLE_PARTIES = "parties"

export function chargerParties() {
    try {
        const parties = JSON.parse(localStorage.getItem(CLE_PARTIES))
        return Array.isArray(parties) ? parties : []
    } catch {
        return []
    }
}

export function enregistrerPartie(partie) {
    const parties = chargerParties()
    parties.push(partie)
    localStorage.setItem(CLE_PARTIES, JSON.stringify(parties))
}
