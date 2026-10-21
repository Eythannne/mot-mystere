import { comparerMots, estGagne } from "./src/logic/jeu.js"

console.log(estGagne(comparerMots("ARBRE", "ARBRE")))   // true
console.log(estGagne(comparerMots("ARBRE", "TABLE")))   // false