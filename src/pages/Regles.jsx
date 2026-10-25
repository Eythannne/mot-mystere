import { Link } from 'react-router-dom'

function Exemple({ mot, couleurs, texte }) {
    return (
        <div className="exemple">
            <div className="ligne">
                {mot.split("").map((lettre, i) => (
                    <span key={i} className={"case " + couleurs[i]}>{lettre}</span>
                ))}
            </div>
            <p>{texte}</p>
        </div>
    )
}

function Regles() {
    return (
        <div>
            <h1>Règles du jeu</h1>
            <Link to="/">Retour</Link>

            <p className="message">Trouve le mot mystère de 5 lettres en 6 essais maximum.</p>
            <ul className="regles">
                <li>Chaque proposition doit être un vrai mot français (vérifié sur le Wiktionnaire).</li>
                <li>Les mots se jouent sans accents : « école » se joue ECOLE.</li>
                <li>Après chaque essai, les lettres changent de couleur :</li>
            </ul>

            <Exemple
                mot="TARTE"
                couleurs={["vert", "absent", "absent", "absent", "absent"]}
                texte="Vert : la lettre T est dans le mot, à la bonne place."
            />
            <Exemple
                mot="PLAGE"
                couleurs={["absent", "absent", "jaune", "absent", "absent"]}
                texte="Jaune : la lettre A est dans le mot, mais à une autre place."
            />
            <Exemple
                mot="BRUIT"
                couleurs={["absent", "absent", "absent", "absent", "absent"]}
                texte="Gris : ces lettres ne sont pas dans le mot (ou pas autant de fois)."
            />

            <h2>Points</h2>
            <table className="tableau">
                <thead>
                    <tr><th>Essais</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>Perdu</th></tr>
                </thead>
                <tbody>
                    <tr><td>Points</td><td>600</td><td>500</td><td>400</td><td>300</td><td>200</td><td>100</td><td>0</td></tr>
                </tbody>
            </table>
        </div>
    )
}

export default Regles
