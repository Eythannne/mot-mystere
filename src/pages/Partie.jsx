import { Link } from 'react-router-dom'
import { useState } from 'react'
import { comparerMots, estGagne } from '../logic/jeu.js'

function Partie() {
    const motCache = "ARBRE"
    const [saisie, setSaisie] = useState("")
    const [essais, setEssais] = useState([])
    const gagne = essais.length > 0 && estGagne(essais[essais.length - 1].resultat)
    const perdu = essais.length >= 5 && !gagne
    const fini = gagne || perdu


    return (
        <div>
            <h1>La Partie</h1>
            <p>Bienvenue dans la partie !</p>
            <input value={saisie} onChange={(e) => setSaisie(e.target.value)} />
            <Link to="/">Retour</Link>
            <button disabled={fini} onClick={() => {
                setEssais([...essais, { mot: saisie, resultat: comparerMots(motCache, saisie) }])
            }}>
                Soumettre
            </button>
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
            </div>
            {gagne && <p className="message">Bravo, tu as trouvé le mot mystère !</p>}
            {perdu && <p className="message">Perdu, réessaye une prochaine fois !</p>}
        </div>
    );
}

export default Partie;  