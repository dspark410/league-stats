const { getMasteries, getMatchList, getMatchDetails } = require('./summoner')

// Call to get only 5 highest mastery champions
exports.getSummonerMasteries = async (id, region, champInfo) => {
  const masteryRes = await getMasteries(id, region)
  const champObject = []
  if (masteryRes.length === 0) return champObject
  const champMastery = masteryRes.length < 5 ? masteryRes.length : 5

  for (let i = 0; i < champMastery; i++) {
    champInfo.forEach((champ) => {
      if (+champ.key === masteryRes[i].championId) {
        const name = champ.name
        const key = masteryRes[i].championId
        const image = champ.image.full
        const level = masteryRes[i].championLevel
        const points = masteryRes[i].championPoints
        const id = champ.id

        const object = {
          name,
          id,
          key,
          image,
          level,
          points,
        }
        champObject.push(object)
      }
    })
  }
  return champObject
}

// Call to get only 7 matches from the list of match ids
exports.getSummonerMatches = async (summonerRes, region, queues, champInfo) => {
  const matchList = await getMatchList(summonerRes.puuid, region)

  const matchArr = []
  if (matchList.length === 0) return matchArr
  // Change to 7 before going to production
  const matches = matchList.length < 7 ? matchList.length : 7

  return new Promise(async (resolve) => {
    for (let i = 0; i < matches; i++) {
      const matchDetails = await getMatchDetails(matchList[i], region)
      matchArr.push(
        createGameObject(summonerRes, queues, champInfo, matchDetails)
      )
      if (matchArr.length === matches) {
        resolve()
      }
    }
  })
    .then(() => matchArr)
    .catch((err) => console.log('matchDetails rejected', err))
}

// Call to append 5 more matches from the list of match ids
exports.getMoreMatches = (gameIds, summonerRes, region, queues, champInfo) => {
  const matchArr = []
  return new Promise(async (resolve) => {
    for (let i = 0; i < gameIds.length; i++) {
      const matchDetails = await getMatchDetails(gameIds[i], region)

      matchArr.push(
        createGameObject(summonerRes, queues, champInfo, matchDetails)
      )
      if (matchArr.length === gameIds.length) {
        resolve()
      }
    }
  }).then(() => matchArr)
}

// Fxn to create a custom object of extensive details for each match
const createGameObject = (summonerRes, queues, champInfo, matchDetails) => {
  const matchObj = queues
    .filter((queue) => queue.queueId === matchDetails.queueId)
    .map((queue) => {
      const object = {
        map: queue.map,
        gameType: queue.description,
        gameCreation: new Date(matchDetails.gameCreation).toString(),
        originalDate: matchDetails.gameCreation,
        gameDuration: matchDetails.gameDuration,
        gameVersion: matchDetails.gameVersion.split('.').slice(0, 2).join('.'),
        players: [],
        participants: matchDetails.participants,
        platformId: matchDetails.platformId,
      }
      return object
    })[0]

  let playerObj

  matchDetails.participants.forEach((id) => {
    if (id.puuid === summonerRes.puuid || id.summonerId === summonerRes.id) {
      matchObj.participantId = id.participantId
    }
    // Champion Icon for summoner and summoner name

    matchDetails.participants.forEach((part) => {
      if (id.participantId === part.participantId) {
        playerObj = {
          id: id.participantId,
          name: id.name,
          champId: part.championId,
          champName: part.championName,
        }
      }
      champInfo.forEach((key) => {
        if (playerObj.champName.toLowerCase() == key.id.toLowerCase()) {
          playerObj.image = key.image.full
        }
      })
    })
    matchObj.players.push(playerObj)
  })

  // finds matching participantId from matchObj and keeps all data from matching participants
  matchDetails.participants.forEach((data) => {
    if (data.participantId === matchObj.participantId) {
      const playerStats = data
      matchObj.playerInfo = playerStats
    }
  })

  // get relevant image for player's champion for that game
  champInfo.forEach((champ) => {
    if (
      matchObj?.playerInfo?.championName.toLowerCase() ===
      champ.id.toLowerCase()
    ) {
      matchObj.championName = champ.name
      matchObj.championImage = champ.image.full
    }
  })

  return matchObj
}
