const express = require('express')
const routes = require('./routes/routes')
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

require('dotenv').config()
require('./itemCompiler')

const app = express()
const port = process.env.PORT || 5000

let maps
let queues
let version
let champInfo

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

const getDependencies = async () => {
  maps = await getMaps()
  queues = await getQueues()
  version = await getVersion()
  champInfo = await getChampInfo(version)
}

getDependencies()

app.get('/getSummonerInfo/:summoner/:region', async (req, res) => {
  try {
    const summoner = req.params.summoner
    const region = req.params.region

    const summonerRes = await getSummonerName(summoner, region)

    try {
      if (summonerRes.id) {
        const data = await Promise.all([
          getSummonerMasteries(summonerRes.id, region, champInfo),
          getRank(summonerRes.id, region),
          getLive(summonerRes.id, region, queues),
          getSummonerMatches(summonerRes, region, queues, champInfo),
          getMatchList(summonerRes.puuid, region),
        ])

        res.json({
          summonerInfo: summonerRes,
          mastery: data[0],
          rank: data[1],
          live: data[2],
          matchHistory: data[3],
          matchList: data[4],
          rgn: region,
        })
      }
    } catch (error) {
      res.send('summoner not found...')
    }
  } catch (error) {
    console.log(error)
  }
})

app.get('/getMoreMatches/:gameIds/:summonerInfo/:region', async (req, res) => {
  const summonerRes = JSON.parse(req.params.summonerInfo)
  const gameIds = JSON.parse(req.params.gameIds)
  const region = req.params.region
  try {
    const data = await getMoreMatches(
      gameIds,
      summonerRes,
      region,
      queues,
      champInfo
    )
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  // Sends static folder
  app.use(express.static('../frontend/build'))

  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else next()
  })

  app.get('/*', (_, res) => {
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
  console.log(`Listening at https://localhost:${port}`)
})
