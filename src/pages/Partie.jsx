import { Link } from 'react-router-dom'
import { useState } from 'react'
import { comparerMots, estGagne } from '../logic/jeu.js'

function Partie() {
    const motCache = "ARBRE"
    const [saisie, setSaisie] = useState("")
    const [essais, setEssais] = useState([])

    return (
        <div>
            <h1>La Partie</h1>
            <p>Bienvenue dans la partie !</p>
            <input value={saisie} onChange={(e) => setSaisie(e.target.value)} />
            <Link to="/">Retour</Link>
            <button onClick={() => {
                setEssais([...essais, { mot: saisie, resultat: comparerMots(motCache, saisie) }])
            }}>
                Soumettre
            </button>
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
        </div>
    );
}

export default Partie;  