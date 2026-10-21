import { Link } from 'react-router-dom'

function Partie() {
  return (
    <div>
      <h1>La Partie</h1>
      <p>Bienvenue dans la partie !</p>
      <Link to="/accueil">Retour</Link>
    </div>
  );
}

export default Partie;