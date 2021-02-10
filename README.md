# Jeu memory

Un simple jeu de memory utilisant HTML/CSS/JavaScript pour le front et Express/Mysql pour le back.

## Choix techniques

Le projet est principalement construit en JavaScript natif avec un fichier de template en HTML et un ensemble de fichiers de style. Il utilise express comme serveur et mysql comme base de données. 

En tenant compte que le jeu pourrait servir comme support de cours et que ceux qui y seraient confrontés seraient des développeurs débutants ou junior, j'ai choisi de faire un maximum de logique en JavaScript afin de faire découvrir des fonctionnalités basiques et utiles. Parmi celles-ci:

- `fetch` qui est un moyen simple de faire des requêtes, avec notamment les requêtes asynchrones et `await`. 
- Les méthodes `querySelector`, `createElement` et `setAttribute` pour la manipulation d'éléments du DOM, au lieu de passer par jquery ou de faire des templates dans des strings.
- `setInterval` pour la gestion du temps, même si c'est ici très particulier comme usage.

Pour le backend mon choix s'est porté sur express et mysql pour ces raisons :

- Express est le serveur le plus utilisé dans l'industrie dès qu'on touche au backend JS
- J'ai un temps considéré mongoDB pour stocker les scores/temps des joueurs (pas besoin de BDD relationelle) mais me suis dis que Mysql était plus répandu et surtout que les commandes SQL étaient plus claires et souvent un bon exercice de logique.

J'ai envisagé pendant un temps de faire une version où toute la logique du jeu serait gérée côté backend. Cela a de multiples avantages comme éviter la triche, mais j'ai changé d'avis car cela créait un projet trop complexe pour des élèves débutants. Si le but de l'exercice est de créer un simili support de cours, alors il valait mieux, selon moi, en profiter pour exploiter des 