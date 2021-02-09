// LES VARIABLES D'ÉTAT
// Ces variables sont partagées par l'ensemble du jeu et seront modifiées en fonction des actions du joueur

// Premièrement, nous stockons quelles cartes le joueur a retourné
let premiereCarte = null
let secondeCarte = null
// Nos vérifions si une carte est déjà retournée, ce qui nous permet de savoir si c'est la première ou la seconde fois que le joueur retourne une carte
let uneCarteEstRetournee = false
// Quand le joueur a retourné deux cartes il faut l'empêcher d'en retourner d'autres ! On va donc parfois bloquer le jeu
let bloquerGrille = false
// Pour savoir quand le joueur a trouvé toutes les cartes il faut savoir combien on en a au départ
let cartesTrouvees = 18
// Le temps alloué à la partie
let tempsDeJeu = 300

// Cette fonction met en place une partie de memory !
// Comme notre HTML ne contient aucune carte, il va falloir les créer et les afficher.
// On lui donne en argument le nombre de cartes que l'on veut créer (ici 18 car nous avons 18 fruits)
function creationJeu (nombreDeCartes) {
  // On crée un tableau pour stocker l'ensemble de nos cartes.
  const toutesLesCartes = []

  // On fait une boucle for qui va s'éxecuter autant de fois qu'il y a de cartes.
  for (let i = 1; i <= nombreDeCartes; i++) {
    // Le memory nécessite d'avoir deux fois la même carte
    // On crée donc les variables carte1 et carte2 avec la fonction creationCarte()
    const carte1 = creationCarte(i)
    const carte2 = creationCarte(i)

    // Une fois les cartes récupérées, on les ajoute dans notre tableau de cartes
    toutesLesCartes.push(carte1, carte2)
  }

  // Problème : nos cartes sont dans l'ordre ! On doit les mélanger !
  melangerCartes(toutesLesCartes)

  // On va chercher l'endroit dans la page où insérer les cartes
  const tableauDeJeu = document.querySelector('#tableau')

  // Pour chaque carte dans notre tas de cartes, on l'ajoute dans la page
  toutesLesCartes.forEach(element => {
    tableauDeJeu.append(element)
  })

  // On affiche le tableau et le compteur, qui se trouvent tous les deux
  // dans la balise article
  document.querySelector('article').setAttribute('data-visible', true)

  // On cache le bouton qui permet de lancer le jeu
  document.querySelector('#lancerJeu').setAttribute('data-visible', false)

  // On lance le temps du jeu
  lancerTimer()
}

// Cette fonction sert à créer nos cartes HTML via du JavaScript!
// Pour ce faire on va utiliser les méthodes de manipulations d'éléments HTML
// On lui donne en argument la carte actuelle
function creationCarte (numeroCarte) {
  // On veut que chaque carte soit dans un conteneur
  // On utilise donc la méthode createElement pour créer une div.
  const conteneurCarte = document.createElement('div')

  // Ce conteneur doit avoir un style, on utilise donc setAttribute
  // pour lui donner l'attribut classe et la valeur conteneur-carte
  conteneurCarte.setAttribute('class', 'conteneur-carte')

  // Rebelote pour notre image, on crée un élément img et on lui donne une classe
  const carte = document.createElement('img')
  carte.setAttribute('class', 'carte')

  // On lui donne un attribut data-flipped qui va nous servir à cacher ou afficher l'image
  carte.setAttribute('data-flipped', false)

  // On veut pouvoir voir la carte quand on clique dessus.
  // On ajoute donc l'attribut onClick avec la valeur notre fonction voirCarte
  // Notons la this en argument : this désigne la carte qu'on vient de cliquer
  carte.setAttribute('onClick', 'voirCarte(this)')

  // Enfin évidemment, on créer l'attribut src qui permet de renseigner
  // l'url de l'image
  carte.setAttribute('src', `${numeroCarte}.png`)

  // Il reste à mettre notre image dans notre conteneur
  // On peut le faire avec la fonction append
  conteneurCarte.append(carte)

  // Et on renvoie cet ensemble HTML conteneur + image
  return conteneurCarte
}

// Cette fonction permet de changer l'ordre des éléments d'un tableau
// Dans notre cas, on l'utilise pour mélanger les cartes
function melangerCartes (tableauDeCartes) {

  // On parcourt le tableau avec une boucle for
  for (let i = tableauDeCartes.length - 1; i > 0; i--) {

    // Nous n'allons pas créer un nouveau tableau mais bouger l'ordre de ses élements.
    // On crée un nombre au hasard entre 0 et 1 via la méthode Math.random().
    // On le multiplie par le numéro de notre boucle + 1 (afin d'éviter de multiplier par 0)
    const nombreInconnu = Math.random() * (i + 1)

    // On arrondit au plus petit avec la méthode Math.floor
    const nombreInconnuEntier = Math.floor(nombreInconnu)

    // Afin de la réutiliser plus tard, on stocke notre carte actuelle dans une variable
    const carteActuelle = tableauDeCartes[i]
    const carteAuHasard = tableauDeCartes[nombreInconnuEntier]

    // On remplace la carte de notre boucle par la carte prise au hasard
    tableauDeCartes[i] = carteAuHasard
    // On remplace la carte prise au hasard par notre carte actuelle
    tableauDeCartes[nombreInconnuEntier] = carteActuelle
  }

  // Les éléments du tableau ont été mélangés, on le renvoie !
  return tableauDeCartes
}

// Cette fonction permet de lancer et afficher le temps de jeu
function lancerTimer () {
  // On définit d'abord le temps alloué au joueur

  // On sélectionne où afficher le temps, ici via la balise HTML <progress>
  const progressbar = document.querySelector('progress')

  // Pour compter le temps, on va utiliser la méthode setInterval, qui permet d'éxécuter
  // du code à chaque intervalle donné (ici 1000ms soit chaque seconde)

  // On stocke notre compteur dans une variable et on lance le setInterval
  const compteur = setInterval(function () {
    // En premier, on vérifie si le temps est à zéro ou si les cartes ont été trouvées
    if (tempsDeJeu <= 0 || cartesTrouvees <= 0) {
      // Si c'est le cas, on arrête le setInterval avec la méthode clearInterval
      clearInterval(compteur)
      // Et on bloque la grille du jeu, afin que le joueur ne puisse pas continuer
      bloquerGrille = true

      // Si toutes les cartes ont été trouvées, on enregistre le score
      if (cartesTrouvees === 0) {
        const temps = 300 - tempsDeJeu
        enregistrerScores(temps)
      }
    }
    // A chaque intervale d'une seconde, on diminue de 1 seconde le temps restant
    tempsDeJeu -= 1
    // A chaque intervalle, on met à jour les informations de la barre de progression
    // via son attribut value. Le HTML se charge de l'affichage, c'est pratique.
    progressbar.setAttribute('value', `${tempsDeJeu}`)
  }, 1000)
}

// Cette fonction est la plus importante de tout le jeu !
// Chaque fois que l'utilisateur va regarder une carte, il va falloir mettre à jour
// l'état du jeu et déclencher des actions en fonction de celui-ci.
// En premier lieu, on donne en argument la carte que le joueur vient de cliquer.
function voirCarte (carte) {
  // Mais est-ce que le joueur a le droit de retourner cette carte ?
  // Pour le savoir, on vérifie la variable bloquerGrille
  // Si elle est sur True, alors le joueur n'a pas le droit et on arrête tout.
  if (bloquerGrille) {
    return
  }

  // Mais s'il a le droit... C'est là qu'on vérifie où il en est dans la partie.
  
  // Première interrogation : est-ce la première ou la seconde carte qu'il retourne ?
  // Pour le savoir, on vérifie la variable uneCarteEstRetournee.
  // Si elle est fausse, cela veut dire que c'est la première fois qu'il tourne une carte.
  if (!uneCarteEstRetournee) {
    // On change l'attribut data-flipped afin d'afficher l'image
    carte.setAttribute('data-flipped', true)
    // On informe le jeu qu'une première carte a été retournée
    uneCarteEstRetournee = true
    // On stocke cette première carte pour la réutiliser plus tard
    premiereCarte = carte

    // Et puis c'est tout ! Il n'y a rien de plus à faire quand c'est la première carte.

  } else {
    // Et dans le cas où le joueur avait déjà retourné une carte ?
    // On lui montre l'image de la carte évidemment
    carte.setAttribute('data-flipped', true)

    // Comme il a retourné deux cartes, on bloque la grille pour l'empêcher d'en retourner d'autres.
    bloquerGrille = true
    // On stocke la seconde carte
    secondeCarte = carte

    // A ce stade, on a désormais deux cartes retournées.
    // Ce qu'onv veut, c'est savoir si ces cartes sont une paire.
    // Pour cela, on va vérifier si elles ont la même image.
    if (premiereCarte.getAttribute('src') === secondeCarte.getAttribute('src')) {
      // C'est une paire !
      // Afin d'empêcher le joueur de recliquer dessus
      // On enlève les attributs data-flipped et onClick
      // Ces cartes deviennent donc statiques
      premiereCarte.removeAttribute('data-flipped')
      premiereCarte.removeAttribute('onClick')
      secondeCarte.removeAttribute('data-flipped')
      secondeCarte.removeAttribute('onClick')

      // Maintenant il faut "remettre à zéro" le jeu
      premiereCarte = null
      secondeCarte = null
      uneCarteEstRetournee = false
      bloquerGrille = false

      // On retire une parie de cartes de notre total
      cartesTrouvees -= 1

      // On vérifie si le joueur a trouvé toutes les paires
      if (cartesTrouvees === 0) {
        console.log('fin du game')
      }
    } else {
      // Mais si les deux cartes retournées ne correspondent pas, que faire ?
      // Il faut laisser au joueur le temps de voir la carte, puis les cacher à nouveau
      // On utilise donc setTimeout pour créer un intervale d'une seconde avant de
      // remettre le jeu à zéro
      setTimeout(() => {
        // On cache à nouveau les cartes
        premiereCarte.setAttribute('data-flipped', false)
        secondeCarte.setAttribute('data-flipped', false)

        // On remet à zéro les cartes retournées
        premiereCarte = null
        secondeCarte = null

        // On informe le jeu qu'aucune carte n'est tournée
        uneCarteEstRetournee = false

        // On débloque la grille
        bloquerGrille = false
      }, 1000)
    }
  }
}

// La fonction RecupererScores interroge le serveur pour avoir les scores
// Puis elle les affiche dans la page
async function RecupererScores () {
  // On fait un appel au serveur pour récupérer les cores en utilisant la méthode FETCH
  const requeteDesScores = await fetch('getScores').then(function (response) {
    // On récupère le résultat de la requête et on le transforme en format JSON
    return response.json()
  })

  // On crée un tableau des scores et on y insère tous les temps
  const tableauDesScores = []
  requeteDesScores.forEach(score => {
    tableauDesScores.push(score.temps)
  })

  // On trie du plus petit au plus grand et on inverse l'ordre.
  const tableauFinal = tableauDesScores.sort().reverse()

  // On récupère l'endroit dans la page où l'on va insérer les scores
  const tableauHtml = document.querySelector('#tableauDesScores')

  // On itère sur le tableau des scores
  tableauFinal.forEach(function (score) {
    // On crée un élément liste pour y stocker le score
    const playerScoreHtml = document.createElement('li')

    // Ajoute le score sous forme de texte
    playerScoreHtml.innerText = score

    // On insère les scores dans la page
    tableauHtml.append(playerScoreHtml)
  })
}

// Cette fonction envoie au serveur le temps réalisé par le joueur
function enregistrerScores (temps) {
  const requeteDesScores = fetch(`enregistrerScore/${temps}`).then(function (response) {
    // On récupère le résultat de la requête et on le transforme en format JSON
    return response.json()
  })
}