import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Accueil() {
    const [pseudo, setPseudo] = useState(localStorage.getItem("pseudo") || "")
    const navigate = useNavigate()

function lancer() {
    if (pseudo.trim() === "") {
        alert("Vous n'avez pas définis de pseuodo")
        return
    }
    localStorage.setItem("pseudo", pseudo)
    navigate("/partie")
}    

    return (
        <div>
        <h1>Le Mot Mystère</h1>
        <p>Bienvenue sur le jeu du mot mystère !</p>
        <input value={pseudo} onChange={(e) => setPseudo(e.target.value)} placeholder="Entrez votre pseudo" />
        <button onClick={lancer}>Lancer la partie</button>
    </div>
    );
}

export default Accueil;