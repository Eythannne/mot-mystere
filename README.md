# Le Mot Mystère

Un jeu de type Wordle développé en React : le joueur doit deviner un mot de 5 lettres en 6 essais maximum. Après chaque essai, les lettres sont colorées (vert, jaune, gris) pour guider la suite. Les propositions sont vérifiées auprès du Wiktionnaire.

## Palier visé
**Palier 3 (le confort de jeu).**

## État des paliers
| Palier | État |
|---|---|
| 1 – Le jeu jouable | Terminé |
| 2 – Le dictionnaire (API Wiktionnaire) | Terminé |
| 3 – Le confort de jeu | Terminé |
| 4 – Le mot du jour (Vercel) | Non commencé |
| 5 – Les variantes | Non commencé |
| 6 – Les quatre grilles | Non commencé |

## Lancer le projet
```
npm install
npm run dev
```
Puis ouvrir http://localhost:5173

Autres commandes : `npm run build` (compilation), `npm run lint` (vérification du code).

## Pages de l'application
| Adresse | Écran |
|---|---|
| `/` | Accueil : pseudo, accès à la partie, aux scores, aux statistiques et aux règles |
| `/partie` | La partie |
| `/scores` | Tableau des scores (10 meilleures parties) |
| `/stats` | Statistiques du joueur |
| `/regles` | Règles du jeu avec exemple des trois couleurs |

## Bibliothèques utilisées
- **react-router-dom** : pour gérer les différents écrans avec une adresse propre à chacun, sans recharger la page.

Aucune autre bibliothèque : la vérification des mots, les animations (CSS), le clavier, les scores et les statistiques sont codés à la main.

## Organisation du code
- `src/logic/` : toute la logique, sans React
  - `jeu.js` : comparaison des mots (couleurs), points, accents, couleurs du clavier
  - `wiktionnaire.js` : **le seul fichier qui appelle l'API** du Wiktionnaire
  - `stockage.js` : lecture/écriture dans le localStorage
  - `stats.js` : classement et statistiques calculés à partir des parties
- `src/pages/` : un fichier par écran
- `src/components/Clavier.jsx` : le clavier à l'écran
- `src/data/` : la liste des mots mystères et la table des accents

## Mes choix
- **Essais** : 6 maximum.
- **Points** : 700 − (100 × nombre d'essais) si le mot est trouvé (600 en 1 essai … 100 en 6), 0 si perdu.
- **Lettres en double** : la comparaison se fait en deux passes. La première marque les lettres bien placées (vert), la seconde marque les lettres présentes ailleurs (jaune) en « consommant » les lettres du mot secret, pour ne pas colorer plus de lettres qu'il n'y en a.
- **Saisie** : au clavier de l'ordinateur ou avec le clavier à l'écran (souris / doigt). Les touches du clavier à l'écran prennent la meilleure couleur connue de chaque lettre (vert > jaune > gris).
- **Pseudo, parties, scores et statistiques** : enregistrés dans le `localStorage` du navigateur. Chaque partie terminée (gagnée ou perdue) est ajoutée à une liste. Le tableau des scores et les statistiques sont calculés à partir de cette liste, donc plusieurs joueurs peuvent se succéder sur le même ordinateur et sont conservés entre deux visites. Le tableau des scores affiche les 10 meilleures parties gagnées ; les statistiques sont celles du pseudo en cours.

### Vérification des mots (palier 2)
- Avant d'être colorée, chaque proposition est vérifiée avec l'API du Wiktionnaire. Les mots se jouent sans accents, or la page « ecole » n'existe pas (seule « école » existe) : on utilise donc la **recherche** du Wiktionnaire, qui ignore les accents, et on demande en même temps si la page trouvée est dans la catégorie **« français »**. Un mot est accepté si une page au titre identique (sans accents, en minuscules pour écarter les noms propres) est dans cette catégorie.
- Un mot refusé **ne compte pas comme un essai** : un message l'indique et la ligne passe en rouge et tremble.
- Pendant la vérification, un message « Vérification… » s'affiche, et les touches ainsi que le bouton *Soumettre* sont bloqués (un verrou empêche aussi une double validation).
- **Si l'API ne répond pas** (réseau coupé, erreur, ou plus de 6 secondes) : le joueur est prévenu et **le mot est accepté sans vérification**. Justification : ne pas bloquer la partie à cause d'un problème indépendant du joueur ; le risque (accepter un mot inexistant) est faible comparé au risque de rendre le jeu inutilisable.
- À la fin de la partie, le mot mystère est affiché **avec ses accents** (table `src/data/accents.json`, la liste fournie étant sans accents) et un lien vers sa page du Wiktionnaire.
- La requête contient `origin=*` (obligatoire depuis le navigateur) et un en-tête `Api-User-Agent` qui identifie le projet.

### Confort de jeu (palier 3)
- Les lettres se retournent une à une à la validation (animation CSS).
- La ligne tremble quand un mot est refusé.
- Clavier à l'écran, tableau des scores, statistiques (parties jouées, % de victoires, série en cours, meilleure série, total des points, répartition des victoires par nombre d'essais), écran de règles avec exemple des trois couleurs.

## Travail réalisé
Projet réalisé seul.
