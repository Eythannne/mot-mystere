import { Link } from 'react-router-dom'
import { useState } from 'react'
import { comparerMots, estGagne } from '../logic/jeu.js'


function Partie() {
    const motCache = "ARBRE"
    const [resultat, setResultat] = useState([])
    const [saisie, setSaisie] = useState("")
        return (
        <div>
            <h1>La Partie</h1>
            <p>Bienvenue dans la partie !</p>
            <input value={saisie} onChange={(e) => setSaisie(e.target.value)} />
            <p>{saisie}</p>
            <Link to="/">Retour</Link>
            <button onClick={() => setResultat(comparerMots(motCache, saisie))}>
                Soumettre
            </button>
            <p>{resultat.join(" ")}</p>
        </div>
    );
}
export default Partie;