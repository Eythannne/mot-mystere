import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { comparerMots, estGagne, nbPoints } from '../logic/jeu.js'
import MOTS from '../data/mots-solutions.json'

const nb_essais_max = 6

function tirerMot() {
    return MOTS[Math.floor(Math.random() * MOTS.length)].toUpperCase()
}

function Partie() {
    const [motCache, setMotCache] = useState(tirerMot)
    const [saisie, setSaisie] = useState("")
    const [essais, setEssais] = useState([])
    const gagne = essais.length > 0 && estGagne(essais[essais.length - 1].resultat)
    const perdu = essais.length >= nb_essais_max && !gagne
    const fini = gagne || perdu
    const mot = saisie.toUpperCase()
    const points = nbPoints(essais.length, gagne)

    function valider() {
        if (mot.length !== motCache.length) {
                    alert("Le mot doit contenir " + motCache.length + " lettres.")
                    return
                }
                setEssais([...essais, { mot: mot, resultat: comparerMots(motCache, mot) }])
                setSaisie("")
            }

    function nouvellePartie() {
        setMotCache(tirerMot())
        setEssais([])
        setSaisie("")
    }

    useEffect(() => {
    function onKeyDown(e) {
        if(fini) return
        
        if(e.key === "Enter") {
            valider()
        }

        if(e.key === "Backspace") {
            setSaisie(saisie.slice(0, -1))
        }
        else if(e.key.match(/^[A-Z]$/i) && saisie.length < motCache.length) {
            setSaisie(saisie + e.key.toUpperCase())
        }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener( "keydown" , onKeyDown )}, [saisie, essais, fini])

    return (
        <div>
            <h1>La Partie</h1>
            <p>Bienvenue dans la partie !</p>
            {/* <input value={mot} onChange={(e) => setSaisie(e.target.value)} maxLength={motCache.length} /> */}
            <Link to="/">Retour</Link>
            <button disabled={fini} onClick={valider}>Soumettre</button>
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
                            <span key={i} className={"case " + essai.resultat[i]}>
                                {lettre}
                            </span>
                        ))}
                    </div>
                ))}

                {Array(nb_essais_max - essais.length).fill(null).map((_, n) => (
                    <div key={n} className="ligne">
                        {motCache.split('').map((_, i) => (
                            <span key={i} className="case vide">{n === 0 ? mot[i] : ""}</span>                        
                        ))}
                    </div>
                ))}
            </div>
            {gagne && <p className="message">Bravo, tu as trouvé le mot mystère !</p>}
            {perdu && <p className="message">Perdu, réessaye une prochaine fois !</p>}
            {fini && <p className="message">Ton score : {points} points</p>}
            {fini && <button onClick={nouvellePartie}>Nouvelle Partie</button>}
        </div>
    );
}

export default Partie;