import { Link } from 'react-router-dom'
import { chargerParties } from '../logic/stockage.js'
import { meilleuresParties } from '../logic/stats.js'

function Scores() {
    const classement = meilleuresParties(chargerParties())

    return (
        <div>
            <h1>Tableau des scores</h1>
            <Link to="/">Retour</Link>

            {classement.length === 0 ? (
                <p className="message">Aucune partie gagnée pour le moment.</p>
            ) : (
                <table className="tableau">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pseudo</th>
                            <th>Mot</th>
                            <th>Essais</th>
                            <th>Points</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classement.map((partie, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{partie.pseudo}</td>
                                <td>{partie.mot}</td>
                                <td>{partie.essais}</td>
                                <td>{partie.points}</td>
                                <td>{new Date(partie.date).toLocaleDateString("fr-FR")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Scores
