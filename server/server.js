// Enable access to .env file
require('dotenv').config()
require('./itemCompiler')
const routes = require('./routes/routes')
const express = require('express')
const app = express()
const path = require('path')
const {
  getSummonerName2,
  getRank2,
  getMaps2,
  getQueues2,
  getLive2,
  getMatchList2,
} = require('./controllers/summoner')
const { getChampInfo, getChampInfo2 } = require('./controllers/champions')
const {
  getSummonerMasteries,
  getSummonerMatches,
} = require('./controllers/utils')
const port = process.env.PORT || 5000

// Allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/api', routes)

let maps
getMaps2().then((res) => (maps = res))
let queues
getQueues2().then((res) => (queues = res))

getChampInfo('11.6.1').then((champInfo) => {
  const region = 'NA1'
  const matches = 2
  getSummonerName2('warpathv2', region).then((summonerRes) => {
    getSummonerMasteries(summonerRes.id, region, champInfo)
    getRank2(summonerRes.id, region)
    getLive2(summonerRes.id, region)

    getSummonerMatches(summonerRes.accountId, region, queues, matches)
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
