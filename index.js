const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const mysql = require('mysql')

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'images')))

const connexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'memory'
})

connexion.connect(function (err) {
  if (err) throw err
  console.log('Connected to DB...')
})

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, './')
  })
})

app.get('/getScores', (req, res) => {
  connexion.query('SELECT * FROM scores', function (error, results, fields) {
    if (error) throw error
    return res.send(results)
  })
})

app.get('/enregistrerScore/:temps', (req, res) => {
  const score = req.params.temps
  connexion.query(`INSERT INTO scores (temps) VALUES (${score})`, function (error, results, fields) {
    if (error) throw error
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
