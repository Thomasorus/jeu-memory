# Jeu memory

Un simple jeu de memory utilisant HTML/CSS/JavaScript pour le front et Express/Mysql pour le back.

Pour profiter pleinement de l'expérience de jeu il est conseillé de mettre des écouteurs, d'activer la musique via le bouton se trouvant en haut à droite de la page, et d'aimer les chiens.

## Choix techniques

Le projet est construit en **JavaScript** natif avec un unique fichier de template en HTML et un ensemble de fichiers de style. Il utilise express comme serveur et mysql comme base de données. 

En tenant compte que le jeu pourrait servir comme support de cours et que ceux qui y seraient confrontés seraient des développeurs débutants ou junior, j'ai choisi de faire un maximum de logique en JavaScript afin de faire découvrir des fonctionnalités basiques et utiles. 

Parmi celles-ci:

- `fetch` qui est un moyen simple de faire des requêtes, avec notamment les requêtes asynchrones via `await`. 
- Les méthodes `querySelector`, `createElement` et `setAttribute` pour la manipulation d'éléments du DOM, au lieu de passer par jquery ou de faire des templates dans des strings.
- `setInterval` pour la gestion du temps, même si c'est ici très particulier comme usage.
- Diverses manipulations comme le fait de manipuler et déclencher du son. Je trouvais ça ludique.

Pour le **CSS**, j'ai utilisé SASS et organisé le CSS en suivant globalement les principes de CUBE CSS car cette méthodologie permet une manière intéressante de voir le CSS, notamment la cascade. 

Je me suis permis un design un peu excentrique pour utiliser certaines fonctionnalités modernes ou tape à l'oeil du CSS. Ce sont souvent de bonnes sources de motivation pour les débutants et elles produisent des résultats amusants.

Pour le backend mon choix s'est porté sur express et mysql pour ces raisons :

- Express est le serveur le plus utilisé dans l'industrie dès qu'on touche au backend JS.
- Mysql est le système de BDD le plus répandu et les commandes SQL sont claires et souvent un bon exercice de logique pour des débutants.



## Installation, lancement, dev...

### Frontend et express:

- `git clone url-du-repo`
- `cd jeu-memory`
- `npm install`

### BDD Mysql

Pour mysql, créer une BDD nommée `memory` avec une table `scores` et `temps` comme nom de colonne et `int` comme type.

```sql
CREATE DATABASE memory;
USE memory;
CREATE TABLE scores (temps int);
```

Dans `index.js` ligne 14, indiquer vos identifiants de connexion mysql.

### Lancer l'application

- `node index.js`

### Compiler le SCSS

- `npm run watch` pour le dev
- `npm run build` pour la prod

