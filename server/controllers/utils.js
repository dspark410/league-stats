const { getMasteries2, getMatchList2, getMatchDetails2 } = require('./summoner')

exports.getSummonerMasteries = (id, region, champInfo) =>
  getMasteries2(id, region).then((masteryRes) => {
    const champObject = []

    let champMastery = 5

    masteryRes.length < 5 && champMastery === masteryRes.length

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
  })

exports.getSummonerMatches = (summonerRes, region, queues, champInfo) => {
  return getMatchList2(summonerRes.accountId, region).then((matchList) => {
    const matches = matchList.matches.length < 7 ? matchList.matches.length : 7
    return createGameObject(
      summonerRes,
      region,
      queues,
      matches,
      champInfo,
      matchList
    )
  })
}

const createGameObject = (
  summonerRes,
  region,
  queues,
  matches,
  champInfo,
  matchList
) => {
  const matchArr = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < matches; i++) {
      getMatchDetails2(matchList.matches[i].gameId, region).then(
        (matchDetails) => {
          const matchObj = queues
            .filter((queue) => queue.queueId === matchDetails.queueId)
            .map((queue) => {
              const object = {
                map: queue.map,
                gameType: queue.description,
                gameCreation: new Date(matchDetails.gameCreation).toString(),
                originalDate: matchDetails.gameCreation,
                gameDuration: matchDetails.gameDuration,
                gameVersion: matchDetails.gameVersion
                  .split('.')
                  .slice(0, 2)
                  .join('.'),
                players: [],
                participants: matchDetails.participants,
                platformId: matchDetails.platformId,
              }

              return object
            })[0]

          let playerObj

          matchDetails.participantIdentities.forEach((id) => {
            if (
              id.player.accountId === summonerRes.accountId ||
              id.player.summonerId === summonerRes.id
            ) {
              matchObj.participantId = id.participantId
            }
            // Champion Icon for summoner and summoner name

            matchDetails.participants.forEach((part) => {
              if (id.participantId === part.participantId) {
                playerObj = {
                  id: id.participantId,
                  name: id.player.summonerName,
                  champId: part.championId,
                }
              }
              champInfo.forEach((key) => {
                if (playerObj.champId === +key.key) {
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
            if (matchObj.playerInfo.championId === +champ.key) {
              matchObj.championName = champ.name
              matchObj.championImage = champ.image.full
            }
          })

          matchArr.push(matchObj)
          if (matchArr.length === matches) {
            resolve()
          }
        }
      )
    }
  }).then(() => matchArr)
}

exports.getMoreMatches = async (index, gameId, region) => {
  try {
    const matchArr = []
    for (let i = index; i < index + 5; i++) {
      if (i < playerMatches.length) {
        await axios
          .get(`${url}/matchDetails/${playerMatches[i].gameId}/${region}`, {
            cancelToken: source.token,
          })
          .then(async (res) => {
            if (res.status > 500) return

            const newMatch = createGameObject(res.data, queues, champInfo)
            matchArr.push(newMatch)
          })
      }
    }
  } catch (error) {
    console.log(error)
  }
}
