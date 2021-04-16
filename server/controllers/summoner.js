const axios = require('axios')
const backupItem = require('../Items/backupItems.json')

exports.getSummonerName = async (summoner, region) => {
  try {
    const api = process.env.API_KEY
    const summonerData = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
        summoner
      )}?api_key=${api}`
    )
    // console.log(summonerData.data)
    return summonerData.data
  } catch (error) {
    console.log('Summoner not Found')
  }
}

exports.getMasteries = async (id, region) => {
  try {
    const api = process.env.API_KEY
    const masteriesData = await axios.get(
      `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${api}`
    )
    return masteriesData.data
  } catch (error) {
    console.log('Masteries not found')
  }
}

// Call with id to retrieve a summoner's rank
exports.getRank = async (id, region) => {
  try {
    const api = process.env.API_KEY
    const rankData = await axios.get(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api}`
    )
    return rankData.data
  } catch (error) {
    console.log('Error with Rank')
  }
}

exports.getVersion = async (req, res) => {
  try {
    const versionData = await axios.get(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    )

    return versionData.data[0]
  } catch (error) {
    console.log('Error with Version')
  }
}

exports.getMaps = async (req, res) => {
  try {
    const mapListData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/maps.json`
    )
    return mapListData.data
  } catch (error) {
    console.log('Error with Maps')
  }
}

exports.getQueues = async (req, res) => {
  try {
    const queueTypeData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/queues.json`
    )
    return queueTypeData.data
  } catch (error) {
    console.log('Error with Queues')
  }
}

exports.getMatchList = async (id, region) => {
  try {
    const api = process.env.API_KEY
    const matchList = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?api_key=${api}`
    )
    return matchList.data
  } catch (error) {
    if (error.response.status === 404) return { matches: [] }
  }
}

exports.getMatchDetails = async (id, region) => {
  try {
    const api = process.env.API_KEY
    const matchDetails = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v4/matches/${id}?api_key=${api}`
    )
    return matchDetails.data
  } catch (error) {
    if (error.response.status >= 500) {
      console.log(
        'Error with Match Details Error with Match Details Error with Match Details Error with Match Details Error with Match Details Error with Match Details Error with Match Details Error with Match Details Error with Match Details Error with Match Details Error with Match Details Error with Match Details Error with Match Details  '
      )
      return this.getMatchDetails(id, region)
    }
  }
}

exports.getLive = async (id, region) => {
  try {
    const api = process.env.API_KEY
    const liveData = await axios.get(
      `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${api}`
    )
    const liveRankArray = []
    liveData.data.participants.forEach(async (player) => {
      const res = await axios.get(
        `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.summonerId}?api_key=${api}`
      )

      liveRankArray.push(res.data)

      if (liveRankArray.length === liveData.data.participants.length) {
        liveData.data['rankArray'] = liveRankArray
      }
    })

    return liveData.data
  } catch (error) {
    console.log('Not in Live Game')
    return 'Not In Live Game'
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
