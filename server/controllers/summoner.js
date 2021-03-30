const axios = require('axios')
const backupItem = require('../Items/backupItems.json')

// Call with summoner name to retrieve puuid/summoner_id/account_id
exports.getSummonerName = async (req, res) => {
  try {
    const summoner = encodeURIComponent(req.params.summoner)
    const region = req.params.region
    const api = process.env.API_KEY
    const summonerData = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${api}`
    )

    res.json(summonerData.data)
  } catch (error) {
    console.log(error)
    res.send('summoner not found...')
  }
}

exports.getSummonerName2 = async (summoner, region) => {
  try {
    const api = process.env.API_KEY
    const summonerData = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${api}`
    )
    // console.log(summonerData.data)
    return summonerData.data
  } catch (error) {
    console.log(error)
  }
}

// Call  with id to retrieve a summoner's masteries
exports.getMasteries = async (req, res) => {
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
}

exports.getMasteries2 = async (id, region) => {
  try {
    const api = process.env.API_KEY
    const masteriesData = await axios.get(
      `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${api}`
    )
    return masteriesData.data
  } catch (error) {
    console.log(error)
  }
}

// Call with id to retrieve a summoner's rank
exports.getRank = async (req, res) => {
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
}

// Call with id to retrieve a summoner's rank
exports.getRank2 = async (id, region) => {
  try {
    const api = process.env.API_KEY
    const rankData = await axios.get(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api}`
    )
    return rankData.data
  } catch (error) {
    console.log(error)
  }
}

// Call from frontend to retrieve list of LOL maps
exports.getMaps = async (req, res) => {
  try {
    const mapListData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/maps.json`
    )
    res.json(mapListData.data)
  } catch (error) {
    console.log(error)
  }
}

exports.getMaps2 = async (req, res) => {
  try {
    const mapListData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/maps.json`
    )
    return mapListData.data
  } catch (error) {
    console.log(error)
  }
}

// Call from frontend to retrieve list of game types
exports.getQueues = async (req, res) => {
  try {
    const queueTypeData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/queues.json`
    )
    res.json(queueTypeData.data)
  } catch (error) {
    console.log(error)
  }
}

exports.getQueues2 = async (req, res) => {
  try {
    const queueTypeData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/queues.json`
    )
    return queueTypeData.data
  } catch (error) {
    console.log(error)
  }
}

// Call from frontend with summoner id to retrieve list of recently played matches
exports.getMatchList = async (req, res) => {
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
}

exports.getMatchList2 = async (id, region) => {
  try {
    const api = process.env.API_KEY
    return axios.get(
      `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?api_key=${api}`
    )
  } catch (error) {
    console.log(error)
  }
}

// Call from frontend with game ID to retrieve specific details of a single match
exports.getMatchDetails = async (req, res) => {
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
}

exports.getMatchDetails2 = async (id, region) => {
  try {
    const api = process.env.API_KEY
    return axios.get(
      `https://${region}.api.riotgames.com/lol/match/v4/matches/${id}?api_key=${api}`
    )
  } catch (error) {
    console.log(error)
  }
}

//Call for live game for summoner
exports.getLive = async (req, res) => {
  try {
    const api = process.env.API_KEY
    const region = req.params.region
    const liveData = await axios.get(
      `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${req.params.summonerId}?api_key=${api}`
    )
    res.json(liveData.data)
  } catch (error) {
    res.send('Not in Live Game')
  }
}

exports.getLive2 = async (id, region) => {
  try {
    const api = process.env.API_KEY
    const liveData = await axios.get(
      `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${api}`
    )
    return liveData.data
  } catch (error) {
    return 'Not in Live Game'
  }
}

//Call for live game for summoner
exports.getBackup = async (req, res) => {
  try {
    res.json(backupItem)
  } catch (error) {
    res.send('Backup not available')
  }
}
