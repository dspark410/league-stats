// Enable access to .env file
require('dotenv').config()
require('./itemCompiler')
const routes = require('./routes/routes')
const express = require('express')
const app = express()
const path = require('path')
const {
  getSummonerName,
  getSummonerName2,
  getMasteries2,
  getRank2,
} = require('./controllers/summoner')
const { getChampInfo } = require('./controllers/champions')
const { getSummonerMasteries } = require('./controllers/utils')
const { resolve } = require('path')
const port = process.env.PORT || 5000

// Allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/api', routes)

getChampInfo('11.6.1').then((champInfo) => {
  getSummonerName2('chiew510', 'NA1').then((summonerRes) => {
    getSummonerMasteries(summonerRes.id, 'NA1', champInfo)

    getRank2(summonerRes.id, 'NA1').then((res) => console.log(res))
  })
})

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  // Sends static folder
  app.use(express.static('frontend/build'))

  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else next()
  })

  app.get('/*', function (req, res) {
    res.sendFile(
      path.join(__dirname, './frontend/build/index.html'),
      function (err) {
        if (err) {
          res.status(500).send(err)
        }
      }
    )
  })
}

// Requested by Riot
app.get('/riot.txt', async (req, res) => {
  res.sendFile(__dirname + '/riot.txt')
})
app.get('//riot.txt', async (req, res) => {
  res.sendFile(__dirname + '/riot.txt')
})

app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`)
})
