import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Accueil() {
    const [pseudo, setPseudo] = useState(localStorage.getItem("pseudo") || "")
    const navigate = useNavigate()

    function lancer() {
        if (pseudo.trim() === "") {
            alert("Vous n'avez pas défini de pseudo")
            return
        }
        localStorage.setItem("pseudo", pseudo.trim())
        navigate("/partie")
    }

    return (
        <div>
            <h1>Le Mot Mystère</h1>
            <p>Bienvenue sur le jeu du mot mystère !</p>
            <input
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") lancer() }}
                placeholder="Entrez votre pseudo"
            />
            <button onClick={lancer}>Lancer la partie</button>
            <nav className="menu">
                <Link to="/scores">Tableau des scores</Link>
                <Link to="/stats">Mes statistiques</Link>
                <Link to="/regles">Règles du jeu</Link>
            </nav>
        </div>
    )
}

export default Accueil
