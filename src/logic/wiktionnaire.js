import { sansAccents } from './jeu.js'

const URL_API = "https://fr.wiktionary.org/w/api.php"
const IDENTIFIANT = "LeMotMystere/1.0 (projet etudiant Sup de Vinci; contact: ethanpassard@gmail.com)"
const DELAI_MAX = 6000

export async function motExiste(mot) {
    const recherche = mot.toLowerCase()

    const params = new URLSearchParams({
        action: "query",
        generator: "search",
        gsrsearch: "intitle:" + recherche,
        gsrnamespace: "0",
        gsrlimit: "50",
        prop: "categories",
        clcategories: "Catégorie:français",
        cllimit: "max",
        format: "json",
        origin: "*",
    })

    const controle = new AbortController()
    const minuteur = setTimeout(() => controle.abort(), DELAI_MAX)

    try {
        const reponse = await fetch(URL_API + "?" + params, {
            signal: controle.signal,
            headers: { "Api-User-Agent": IDENTIFIANT },
        })
        if (!reponse.ok) {
            throw new Error("Erreur HTTP " + reponse.status)
        }
        const donnees = await reponse.json()
        const pages = donnees.query ? Object.values(donnees.query.pages) : []

        for (const page of pages) {
            const memeMot = sansAccents(page.title) === recherche
            const minuscule = page.title === page.title.toLowerCase()
            const estFrancais = page.categories !== undefined
            if (memeMot && minuscule && estFrancais) {
                return true
            }
        }
        return false
    } finally {
        clearTimeout(minuteur)
    }
}

export function lienWiktionnaire(mot) {
    return "https://fr.wiktionary.org/wiki/" + encodeURIComponent(mot)
}
