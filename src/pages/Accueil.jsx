import { Link } from 'react-router-dom'
  
function Accueil() {
  return (
    <div>
      <h1>Le Mot Mystère</h1>
      <p>Bienvenue sur le jeu du mot mystère !</p>
      <Link to="/partie">Allons jouer</Link>
    </div>
  );
}

export default Accueil;