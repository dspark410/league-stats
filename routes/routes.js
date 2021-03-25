const express = require('express')
const router = express.Router()
const axios = require('axios')
const backupItem = require('../Items/backupItems.json')
const { getSummonerName } = require('../controllers/summoner')
const { getSummonerId } = require('../controllers/leaderboard')

// Call from frontend along with summoner name to retrieve puuid/summoner_id/account_id
router.get('/getSummonerName/:summoner/:region', getSummonerName)

// Call from frontend along with summoner id
router.get('/getSummonerId/:summoner/:region', getSummonerId)

// Call from frontend with id to retrieve a summoner's masteries
router.get('/masteries/:id/:region', async (req, res) => {
  try {
    const id = req.params.id
    const region = req.params.region
    const api = process.env.API_KEY
    const masteriesData = await axios.get(
      `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${api}`
    )
    res.json(masteriesData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call from frontend with id to retrieve a summoner's rank
router.get('/rank/:id/:region', async (req, res) => {
  try {
    const id = req.params.id
    const region = req.params.region
    const api = process.env.API_KEY
    const rankData = await axios.get(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api}`
    )
    res.json(rankData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call from frontend to retrieve free champion rotation for the week
router.get('/getChampionRotation/:region', async (req, res) => {
  try {
    const region = req.params.region
    const api = process.env.API_KEY
    const rotationData = await axios.get(
      `https://${region}.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api}`
    )
    res.json(rotationData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call from frontend to retrieve list of LOL maps
router.get('/mapList', async (req, res) => {
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
router.get('/queueType', async (req, res) => {
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
router.get('/matchList/:id/:region', async (req, res) => {
  try {
    const id = req.params.id
    const region = req.params.region
    const api = process.env.API_KEY
    const matchListData = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?api_key=${api}`
    )
    res.json(matchListData.data)
  } catch (error) {
    res.send(error)
  }
})

// Call from frontend with game ID to retrieve specific details of a single match
router.get('/matchDetails/:id/:region', async (req, res) => {
  try {
    const id = req.params.id
    const region = req.params.region
    const api = process.env.API_KEY
    const matchDetailsData = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v4/matches/${id}?api_key=${api}`
    )
    res.json(matchDetailsData.data)
  } catch (error) {
    console.log(error)
    res.json(error.response.status)
  }
})

// Call to get all solo ranks
router.get('/leaderboard/:region/:rank/:division/:page', async (req, res) => {
  try {
    const api = process.env.API_KEY
    const region = req.params.region

    const leaderboardData = await axios.get(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/RANKED_SOLO_5x5/${req.params.rank}/${req.params.division}?page=${req.params.page}&api_key=${api}`
    )
    res.json(leaderboardData.data)
  } catch (error) {
    console.log(error)
  }
})

// Call to get challenger solo ranks
router.get('/leaderboard/:tier/:region', async (req, res) => {
  try {
    const api = process.env.API_KEY
    const region = req.params.region
    const tier = req.params.tier.toLowerCase()
    const leaderboardData = await axios.get(
      `https://${region}.api.riotgames.com/lol/league/v4/${tier}leagues/by-queue/RANKED_SOLO_5x5?api_key=${api}`
    )
    res.json(leaderboardData.data)
  } catch (error) {
    console.log(error)
  }
})

//na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-f3372fe9-4a88-4d2f-917b-54974292c5f6

//Call for live game for summoner
router.get('/live/:summonerId/:region', async (req, res) => {
  try {
    const api = process.env.API_KEY
    const region = req.params.region
    const liveData = await axios.get(
      `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${req.params.summonerId}?api_key=${api}`
    )
    res.json(liveData.data)
  } catch (error) {
    console.log('Not in Live Game')
  }
})

//Call for live game for summoner
router.get('/backupjson', async (req, res) => {
  try {
    res.json(backupItem)
  } catch (error) {
    console.log('Not in Live Game')
  }
})

module.exports = router
