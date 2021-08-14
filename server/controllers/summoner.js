const axios = require('axios')
const backupItem = require('../Items/backupItems.json')

// Call to get summoner info
exports.getSummonerName = async (summoner, region) => {
  try {
    const api = process.env.API_KEY
    const summonerData = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
        summoner
      )}?api_key=${api}`
    )
    return summonerData.data
  } catch (error) {
    console.log('Summoner not Found')
  }
}

// Call to get masteries for the summoner entered
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
// Call to get current game version
exports.getVersion = async () => {
  try {
    const versionData = await axios.get(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    )

    return versionData.data[0]
  } catch (error) {
    console.log('Error with Version')
  }
}

// Call to get list of map ids
exports.getMaps = async () => {
  try {
    const mapListData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/maps.json`
    )
    return mapListData.data
  } catch (error) {
    console.log('Error with Maps')
  }
}

// Call to get list of queue ids
exports.getQueues = async () => {
  try {
    const queueTypeData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/queues.json`
    )
    return queueTypeData.data
  } catch (error) {
    console.log('Error with Queues')
  }
}

// Call to get list of match ids for the summoner - matchv5
exports.getMatchList = async (id, region) => {
  const convertRegion = (region) => {
    if (
      region === 'NA1' ||
      region === 'BR1' ||
      region === 'LA1' ||
      region === 'LA1' ||
      region === 'OC1'
    ) {
      return 'americas'
    } else if (
      region === 'EUN1' ||
      region === 'EUW1' ||
      region === 'RU' ||
      region === 'TR1'
    ) {
      return 'europe'
    } else if (region === 'JP1' || region === 'KR') {
      return 'asia'
    }
  }

  try {
    const api = process.env.API_KEY
    const matchList = await axios.get(
      `https://${convertRegion(
        region
      )}.api.riotgames.com/lol/match/v5/matches/by-puuid/${id}/ids?start=0&count=100&api_key=${api}`
    )

    return matchList.data
  } catch (error) {
    return []
  }
}

// Call to get match info with matchid - matchv5
exports.getMatchDetails = async (id, region) => {
  const convertRegion = (region) => {
    if (
      region === 'NA1' ||
      region === 'BR1' ||
      region === 'LA1' ||
      region === 'LA1' ||
      region === 'OC1'
    ) {
      return 'americas'
    } else if (
      region === 'EUN1' ||
      region === 'EUW1' ||
      region === 'RU' ||
      region === 'TR1'
    ) {
      return 'europe'
    } else if (region === 'JP1' || region === 'KR') {
      return 'asia'
    }
  }
  try {
    const api = process.env.API_KEY
    // if (id === 3722895943) id = 2229249294305829485290 // Error on purpose, remove after finish
    const matchDetails = await axios.get(
      `https://${convertRegion(
        region
      )}.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${api}`
    )
    return matchDetails.data.info
  } catch (error) {
    if (error.response.status) return { participants: [] }
  }
}

// Call to see if the summoner is in a currnet game
exports.getLive = async (id, region, queues) => {
  try {
    const api = process.env.API_KEY
    const liveData = await axios.get(
      `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${api}`
    )
    await Promise.all(
      liveData.data.participants.map(async (player) => {
        const response = await axios.get(
          `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.summonerId}?api_key=${api}`
        )
        return response.data
      })
    ).then((res) => {
      liveData.data['rankArray'] = res
    })

    queues.forEach((queue) => {
      if (liveData.data.gameQueueConfigId === queue.queueId) {
        liveData.data['queueName'] = queue.description
          .split(' ')
          .slice(0, 3)
          .join(' ')
      }
    })

    return liveData.data
  } catch (error) {
    console.log('Not in Live Game')
    return 'Not In Live Game'
  }
}

// Call for the backup item json
exports.getBackup = (_, res) => {
  try {
    res.json(backupItem)
  } catch (error) {
    res.send('Backup not available')
  }
}
