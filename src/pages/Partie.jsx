import { Link } from 'react-router-dom'
import { useState } from 'react'

function Partie() {
  const [saisie, setSaisie] = useState("")
    return (
    <div>
      <h1>La Partie</h1>
      <p>Bienvenue dans la partie !</p>
      <input value={saisie} onChange={(e) => setSaisie(e.target.value)} />
      <p>{saisie}</p>
      <Link to="/">Retour</Link>
    </div>
  );
}

export default Partie;