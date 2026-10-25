import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { comparerMots, estGagne, nbPoints, motAvecAccents } from '../logic/jeu.js'
import { motExiste, lienWiktionnaire } from '../logic/wiktionnaire.js'
import { enregistrerPartie } from '../logic/stockage.js'
import Clavier from '../components/Clavier.jsx'
import MOTS from '../data/mots-solutions.json'

const nb_essais_max = 6

function tirerMot() {
    return MOTS[Math.floor(Math.random() * MOTS.length)].toUpperCase()
}

function Partie() {
    const [motCache, setMotCache] = useState(tirerMot)
    const [saisie, setSaisie] = useState("")
    const [essais, setEssais] = useState([])
    const [verification, setVerification] = useState(false)
    const [refus, setRefus] = useState(0)
    const [info, setInfo] = useState("")

    const gagne = essais.length > 0 && estGagne(essais[essais.length - 1].resultat)
    const perdu = essais.length >= nb_essais_max && !gagne
    const fini = gagne || perdu
    const mot = saisie.toUpperCase()
    const points = nbPoints(essais.length, gagne)
    const pseudo = localStorage.getItem("pseudo") || "Anonyme"
    const motFinal = motAvecAccents(motCache)

    async function valider() {
        if (fini || verification) return

        if (mot.length !== motCache.length) {
            setInfo("Le mot doit contenir " + motCache.length + " lettres.")
            setRefus(refus + 1)
            return
        }

        setVerification(true)
        setInfo("")

        let existe = true
        try {
            existe = await motExiste(mot)
        } catch {
            setInfo("Le Wiktionnaire ne répond pas : le mot a été accepté sans vérification.")
        }

        setVerification(false)

        if (!existe) {
            setInfo(mot + " n'est pas un mot français du Wiktionnaire (essai non compté).")
            setRefus(refus + 1)
            return
        }

        const nouveauxEssais = [...essais, { mot: mot, resultat: comparerMots(motCache, mot) }]
        setEssais(nouveauxEssais)
        setSaisie("")

        const victoire = estGagne(nouveauxEssais[nouveauxEssais.length - 1].resultat)
        if (victoire || nouveauxEssais.length >= nb_essais_max) {
            enregistrerPartie({
                pseudo: pseudo,
                mot: motCache,
                gagne: victoire,
                essais: nouveauxEssais.length,
                points: nbPoints(nouveauxEssais.length, victoire),
                date: new Date().toISOString(),
            })
        }
    }

    function appuyer(touche) {
        if (fini || verification) return

        if (touche === "ENTRER") {
            valider()
        } else if (touche === "EFFACER") {
            setSaisie(saisie.slice(0, -1))
            setRefus(0)
            setInfo("")
        } else if (saisie.length < motCache.length) {
            setSaisie(saisie + touche)
            setRefus(0)
            setInfo("")
        }
    }

    function nouvellePartie() {
        setMotCache(tirerMot())
        setEssais([])
        setSaisie("")
        setInfo("")
        setRefus(0)
    }

    useEffect(() => {
        function onKeyDown(e) {
            if (e.ctrlKey || e.metaKey || e.altKey) return

            if (e.key === "Enter") {
                e.preventDefault()
                appuyer("ENTRER")
            } else if (e.key === "Backspace") {
                appuyer("EFFACER")
            } else if (e.key.match(/^[A-Z]$/i)) {
                appuyer(e.key.toUpperCase())
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [saisie, essais, fini, verification])

    return (
        <div>
            <h1>La Partie</h1>
            <p>Bienvenue dans la partie {pseudo} !</p>
            <Link to="/">Retour</Link>
            <button disabled={fini || verification} onClick={valider}>Soumettre</button>
            <div className={"mot-cache " + (gagne ? "gagne" : perdu ? "perdu" : "")}>
                <h2>Mot Mystère</h2>
                {motCache.split('').map((lettre, i) => (
                    <span key={i} className="case">
                        {fini ? lettre : "?"}
                    </span>
                ))}
            </div>
            <div className="grille">
                {essais.map((essai, n) => (
                    <div key={n} className="ligne">
                        {essai.mot.split('').map((lettre, i) => (
                            <span
                                key={i}
                                className={"case flip " + essai.resultat[i]}
                                style={{ animationDelay: i * 0.3 + "s" }}
                            >
                                {lettre}
                            </span>
                        ))}
                    </div>
                ))}

                {Array(nb_essais_max - essais.length).fill(null).map((_, n) => (
                    <div key={n === 0 ? "saisie" + refus : n} className={"ligne" + (n === 0 && refus > 0 ? " refuse" : "")}>
                        {motCache.split('').map((_, i) => (
                            <span key={i} className="case vide">{n === 0 ? mot[i] : ""}</span>
                        ))}
                    </div>
                ))}
            </div>

            {verification && <p className="message chargement">Vérification dans le Wiktionnaire…</p>}
            {info && !verification && <p className="message info">{info}</p>}

            {gagne && <p className="message">Bravo, tu as trouvé le mot mystère !</p>}
            {perdu && <p className="message">Perdu, réessaye une prochaine fois !</p>}
            {fini && (
                <p className="message">
                    Le mot était :{" "}
                    <a href={lienWiktionnaire(motFinal)} target="_blank" rel="noreferrer">{motFinal}</a>
                </p>
            )}
            {fini && <p className="message">Ton score : {points} points</p>}
            {fini && <button onClick={nouvellePartie}>Nouvelle Partie</button>}

            <Clavier essais={essais} onTouche={appuyer} />
        </div>
    );
}

export default Partie;
