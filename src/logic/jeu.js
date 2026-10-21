/*
1. préparer le tableau de résultats (tout "absent" au départ)
Création du tableau ou il y aura stocke les 6 mots : le mot a trouvé qui lui sera caché et les 5 chances de trouvé le mot donc 5 mots en plus
*/

/*
2. préparer la liste des lettres du mot caché
J'ai pas trop compris ça
*/

/*
3. passe 1 : les verts
On fait une boucle qui parcour de la premiere lettre a la derniere lettre seuelemnt pour savoir si la lettre est a la bonne place
*/

/*
4. passe 2 : les oranges
On fait une boucle qui parcour de la premiere lettre a la derniere lettre seuelemnt pour savoir si la lettre est dans le mot
*/

/*
5. renvoyer le résultat
faire un print pour afficher le resultat final (victoire ou defaite puis la révélation du mot)
*/



export function comparerMots(motCache, proposition) {
    const resultat = Array(motCache.length).fill("absent")
    const lettres = motCache.split("")

    for (let i = 0; i < motCache.length; i++) {
        if (motCache[i] === proposition[i]) {
            resultat[i] = "vert"
            lettres[i] = null
        }
    }

    for (let i = 0; i < motCache.length; i++) {
        if (resultat[i] !== "vert" && lettres.includes(proposition[i])) {
            resultat[i] = "jaune"
            lettres[lettres.indexOf(proposition[i])] = null
        }
    }

    return resultat
}