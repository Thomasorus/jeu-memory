# Jeu memory

Un simple jeu de memory utilisant HTML/CSS/JavaScript pour le front et Express/Mysql pour le back.

Pour profiter pleinement de l'expérience de jeu il est conseillé de mettre des écouteurs, d'activer la musique via le bouton se trouvant en haut à droite de la page, et d'aimer les chiens.

## Choix techniques

Le projet est construit en **JavaScript** natif avec un unique fichier de template en HTML et un ensemble de fichiers de style. Il utilise express comme serveur et mysql comme base de données. 

### Javascript

En tenant compte que le jeu pourrait servir comme support de cours et que ceux qui y seraient confrontés seraient des développeurs débutants ou junior, j'ai choisi de faire un maximum de logique en JavaScript afin de faire découvrir des fonctionnalités basiques et utiles. 

Parmi celles-ci:

- `fetch` qui est un moyen simple de faire des requêtes, avec notamment les requêtes asynchrones via `await`. 
- Les méthodes `querySelector`, `createElement` et `setAttribute` pour la manipulation d'éléments du DOM, au lieu de passer par jquery ou de faire des templates dans des strings.
- `setInterval` pour la gestion du temps, même si c'est ici très particulier comme usage.
- Diverses manipulations comme le fait de manipuler et déclencher du son. Je trouvais ça ludique.

Beaucoup de choses auraient pu être faites autrement (notamment les variables d'environnement dans le global qui ne sont pas une bonne pratique) mais j'ai préféré rester sur un exercice simple et contenu dans un unique fichier qui, même si imparfait, évite que cela ne tourne au cours magistral. Par exemple l'exercice n'aborde pas les classes ou l'instanciation pour éviter de rentrer dans des concepts avancés d'organisation du code à un moment où un débutant aura déjà des difficultés à comprendre la logique métier du jeu memory.

### CSS

Pour le **CSS**, j'ai utilisé SASS et organisé le CSS en suivant globalement les principes de CUBE CSS car cette méthodologie permet une manière intéressante de voir le CSS, notamment l'utilisation de la cascade, là où faire du BEM tout simple annule son fonctionnement. 

Je me suis permis un design un peu excentrique pour utiliser certaines fonctionnalités modernes ou tape à l'oeil du CSS telles que `mix-blend-mode`, `filter`, `transform`, sans oublier des classiques du layout comme `flex` et `grid` qui pour moi sont les nouvelles bases que des devs doivent acquérir. 

Faire du flashy et du rigolo est souvent une bonne source de motivation pour les débutants.

### Backend

Pour le backend mon choix s'est porté sur express et mysql pour ces raisons :

- Express est le serveur le plus utilisé dans l'industrie dès qu'on touche au backend JS.
- Mysql est le système de BDD le plus répandu et les commandes SQL sont claires et souvent un bon exercice de logique pour des débutants.

A noter que les identifiants de connexion sont en dur dans le fichier au lieu d'utiliser un `.env`: **c'est fait exprès**. Déjà cet exercice suppose une connaissance de NPM et de l'écosystème JS, ce qui n'est pas forcément donné à tout le monde. Sachant cela, mon but était de ne pas aller plus loin que les prérequis pour express et se connecter à mysql. Créer encore plus d'abstractions pour des choses telles que les identifiants ou la livraison me semblait détourner du but de l'exercice pour un débutant.

## Installation, lancement, dev...

L'installation nécessite nodejs, npm et mysql. A noter que le jeu peut fonctionner sans BDD, un message sera alors affiché dans la console côté backend précisant que les scores ne seront pas enregistrés.

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

J'ai utilisé Parcel pour la compilation du SCSS. C'est un outil tout en un avec zéro configuration qui installe de par lui-même ses dépendances. Il est parfait pour les débutants, contrairement à un webpack qui demande beaucoup de configuration.

- `npm run watch` pour le dev
- `npm run build` pour la prod

