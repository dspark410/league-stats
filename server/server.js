/** @format */

// Enable access to .env file
require('dotenv').config()
require('./itemCompiler')
const routes = require('./routes/routes')
const express = require('express')
const app = express()
const path = require('path')
const {
  getSummonerName,
  getRank,
  getMaps,
  getQueues,
  getLive,
  getMatchList,
  getVersion,
} = require('./controllers/summoner')
const { getChampInfo } = require('./controllers/champions')
const {
  getSummonerMasteries,
  getSummonerMatches,
  getMoreMatches,
} = require('./controllers/utils')
const port = process.env.PORT || 5000

// Allow CORS
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://league-stats.com',
    'https://league-stats.com',
    'http://localhost:3000',
  ]
  const origin = req.headers.origin

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  next()
})

app.use('/api', routes)

let maps
let queues
let version
let champInfo

getMaps().then((res) => (maps = res))
getQueues().then((res) => (queues = res))
getVersion().then((res) => {
  version = res
  getChampInfo(res).then((response) => (champInfo = response))
})

app.get('/getSummonerInfo/:summoner/:region', async (req, response) => {
  try {
    const summoner = req.params.summoner
    const region = req.params.region

    getSummonerName(summoner, region)
      .then((summonerRes) => {
        if (summonerRes.id) {
          Promise.all([
            getSummonerMasteries(summonerRes.id, region, champInfo),
            getRank(summonerRes.id, region),
            getLive(summonerRes.id, region, queues),
            getSummonerMatches(summonerRes, region, queues, champInfo),
            getMatchList(summonerRes.accountId, region),
          ]).then((res) => {
            response.json({
              summonerInfo: summonerRes,
              mastery: res[0],
              rank: res[1],
              live: res[2],
              matchHistory: res[3],
              matchList: res[4],
              rgn: region,
            })
          })
        }
      })
      .catch(() => response.send('summoner not found...'))
  } catch (error) {
    console.log(error)
  }
})

app.get(
  '/getMoreMatches/:gameIds/:summonerInfo/:region',
  async (req, response) => {
    const summonerRes = JSON.parse(req.params.summonerInfo)
    const gameIds = JSON.parse(req.params.gameIds)
    const region = req.params.region
    console.log(
      'gameIds',
      gameIds,
      'summonerRes',
      summonerRes,
      'region',
      region
    )
    try {
      getMoreMatches(gameIds, summonerRes, region, queues, champInfo).then(
        (res) => response.json(res)
      )
    } catch (error) {
      console.log(error)
    }
  }
)

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  // Sends static folder
  app.use(express.static('../frontend/build'))

  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else next()
  })

  app.get('/*', function (req, res) {
    res.sendFile(
      path.join(__dirname, '../frontend/build/index.html'),
      function (err) {
        if (err) {
          res.status(500).send(err)
        }
      }
    )
  })
}

app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`)
})
