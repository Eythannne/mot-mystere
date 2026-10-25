import { Link } from 'react-router-dom'
import { chargerParties } from '../logic/stockage.js'
import { statistiques } from '../logic/stats.js'

function Stats() {
    const pseudo = localStorage.getItem("pseudo") || ""
    const stats = statistiques(chargerParties(), pseudo)
    const maxRepartition = Math.max(1, ...stats.repartition)

    return (
        <div>
            <h1>Statistiques</h1>
            <p>Joueur : {pseudo || "Anonyme"}</p>
            <Link to="/">Retour</Link>

            <div className="stats">
                <div className="stat"><strong>{stats.jouees}</strong><span>Parties jouées</span></div>
                <div className="stat"><strong>{stats.pourcentage}%</strong><span>Victoires</span></div>
                <div className="stat"><strong>{stats.serieEnCours}</strong><span>Série en cours</span></div>
                <div className="stat"><strong>{stats.meilleureSerie}</strong><span>Meilleure série</span></div>
                <div className="stat"><strong>{stats.totalPoints}</strong><span>Total des points</span></div>
            </div>

            <h2>Victoires selon le nombre d'essais</h2>
            <div className="repartition">
                {stats.repartition.map((nb, i) => (
                    <div key={i} className="barre-ligne">
                        <span className="barre-label">{i + 1}</span>
                        <div className="barre-fond">
                            <div className="barre" style={{ width: (nb / maxRepartition) * 100 + "%" }}></div>
                        </div>
                        <span className="barre-valeur">{nb}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stats
