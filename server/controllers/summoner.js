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

exports.getMatchList = async (id, region) => {
  try {
    const api = process.env.API_KEY
    const matchList = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?api_key=${api}`
    )
    return matchList.data
  } catch (error) {
    return { matches: [] }
  }
}

exports.getMatchDetails = async (id, region) => {
  try {
    const api = process.env.API_KEY
    // if (id === 3722895943) id = 2229249294305829485290; // Error on purpose, remove after finish
    const matchDetails = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v4/matches/${id}?api_key=${api}`
    )
    return matchDetails.data
  } catch (error) {
    if (error.response.status)
      return { participantIdentities: [], participants: [] }
  }
}

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

//Call for live game for summoner
exports.getBackup = async (_, res) => {
  try {
    res.json(backupItem)
  } catch (error) {
    res.send('Backup not available')
  }
}
