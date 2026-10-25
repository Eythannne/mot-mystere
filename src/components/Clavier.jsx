import { statutsLettres } from '../logic/jeu.js'

const RANGEES = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["ENTRER", "W", "X", "C", "V", "B", "N", "EFFACER"],
]

function Clavier({ essais, onTouche }) {
    const statuts = statutsLettres(essais)

    return (
        <div className="clavier">
            {RANGEES.map((rangee, n) => (
                <div key={n} className="rangee">
                    {rangee.map((touche) => {
                        const speciale = touche === "ENTRER" || touche === "EFFACER"
                        return (
                            <button
                                key={touche}
                                className={"touche " + (speciale ? "large " : "") + (statuts[touche] || "")}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => onTouche(touche)}
                            >
                                {touche === "ENTRER" ? "Entrée" : touche === "EFFACER" ? "⌫" : touche}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default Clavier
