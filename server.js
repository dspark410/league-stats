// Enable access to .env file
require('dotenv').config()

const express = require('express')
const axios = require('axios')
const app = express()
const path = require('path')
const port = process.env.PORT || 5000

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// Call from frontend along with summoner name to retrieve puuid/summoner_id/account_id
app.get('/getSummonerName/:summoner', async (req, res) => {
  try {
    const summoner = encodeURIComponent(req.params.summoner)
    const api = process.env.API_KEY
    const summonerData = await axios.get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${api}`
    )
    res.json(summonerData.data)
  } catch (error) {
    console.log(error)
    res.send('Summoner not found')
  }
})

// Call from frontend along with summoner id
app.get('/getSummonerId/:summoner', async (req, res) => {
  try {
    const summoner = req.params.summoner
    const api = process.env.API_KEY
    const summonerData = await axios.get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/${summoner}?api_key=${api}`
    )
    res.json(summonerData.data)
  } catch (error) {
    console.log(error)
    res.send('Summoner not found')
  }
})

// Call from frontend with id to retrieve a summoner's masteries
app.get('/masteries/:id', async (req, res) => {
  try {
    const id = req.params.id
    const api = process.env.API_KEY
    const masteriesData = await axios.get(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${api}`
    )
    res.json(masteriesData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call from frontend with id to retrieve a summoner's rank
app.get('/rank/:id', async (req, res) => {
  try {
    const id = req.params.id
    const api = process.env.API_KEY
    const rankData = await axios.get(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api}`
    )
    res.json(rankData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call from frontend to retrieve free champion rotation for the week
app.get('/getChampionRotation', async (req, res) => {
  try {
    const api = process.env.API_KEY
    const rotationData = await axios.get(
      `https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api}`
    )
    res.json(rotationData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call from frontend to retrieve list of LOL maps
app.get('/mapList', async (req, res) => {
  try {
    const mapListData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/maps.json`
    )
    res.json(mapListData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call from frontend to retrieve list of game types
app.get('/queueType', async (req, res) => {
  try {
    const queueTypeData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/queues.json`
    )
    res.json(queueTypeData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call from frontend with summoner id to retrieve list of recently played matches
app.get('/matchList/:id', async (req, res) => {
  try {
    const id = req.params.id
    const api = process.env.API_KEY
    const matchListData = await axios.get(
      `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?api_key=${api}`
    )
    res.json(matchListData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call from frontend with game ID to retrieve specific details of a single match
app.get('/matchDetails/:id', async (req, res) => {
  try {
    const id = req.params.id
    const api = process.env.API_KEY
    const matchDetailsData = await axios.get(
      `https://na1.api.riotgames.com/lol/match/v4/matches/${id}?api_key=${api}`
    )
    res.json(matchDetailsData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call to get challenger solo ranks
app.get('/leaderboard/solo', async (req, res) => {
  try {
    const api = process.env.API_KEY

    const leaderboardData = await axios.get(
      ` https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${api}`
    )
    res.json(leaderboardData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call to get challenger solo ranks
app.get('/leaderboard/solo', async (req, res) => {
  try {
    const api = process.env.API_KEY
    const leaderboardData = await axios.get(
      ` https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${api}`
    )
    res.json(leaderboardData.data)
  } catch (error) {
    console.log(error)
  }
})

// app.get('/leaderboard/flex', async (req, res) => {
//   try {
//     const api = process.env.API_KEY
//     const leaderboardData = await axios.get(
//       ` https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_FLEX_SR?api_key=${api}`
//     )
//     res.json(leaderboardData.data)
//   } catch (error) {
//     console.log(error)
//   }
// })

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  // Sends static folder
  app.use(express.static('frontend/build'))

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
}

app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`)
})
