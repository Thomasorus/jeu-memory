const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const mysql = require('mysql')

// Afin que Express puisse servir nos fichiers statiques, il convient d'indiquer leurs dossiers.
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'images')))

// Nos identifiants de connexion MYSQL
const connexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'memory'
})

// Une fois l'objet contenant les informations de connexion créé, on peut se connecter.
connexion.connect(function (err) {
  if (err) {
    console.log(err)
    console.log('Erreur de connexion à la base de données. Les scores ne seront pas récupérés.')
  } else {
    console.log('Connecté à la base de données')
  }
})


// Les app.get interceptent les adresses
// Ainsi un app.get sur / signifie que la racine du site a été atteinte par un utilisateur
// On peut l'intercepter et décider quoi faire

// Si un utilisateur arrive sur la racine du site, on lui renvoie index.html, notre template de base
app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, './')
  })
})

// L'adresse /getScores ne retourne pas un template mais des données !
// Elle est donc utilisée pour uniquement récupérer des données, l'affichage
// du contenu sera géré côté navigateur
app.get('/getScores', (req, res) => {
  // On utilise l'object connexion et une requête SQL pour récupérer tous nos scores
  connexion.query('SELECT * FROM scores', function (error, results, fields) {
    if (error) {
      console.log('Erreur : impossible de récupérer les scores')
      console.log(error)
    } else {
      return res.send(results)
    }
  })
})

// Encore une adresse qui ne retourne pas de template HTML
// Notons l'adresse suivie d'un :temps. Dans ce cas, :temps récupère les données se trouvant
// après /enregistrerScore
app.get('/enregistrerScore/:temps', (req, res) => {
  // On récupère le score via l'onjet req
  const score = req.params.temps
  // On insère le score dans la base de données via une requête SQL
  connexion.query(`INSERT INTO scores (temps) VALUES (${score})`, function (error, results, fields) {
    if (error) {
      console.log("Erreur : impossible d'enregistrer le score")
      console.log(error)
    }
  })
})

// Express a besoin de cette fonction pour 'écouter' ce qui se passe, notamment les adresses
// que nous utilisons
app.listen(port, () => {
  console.log(`Écoute de l'adresse http://localhost:${port}`)
})
