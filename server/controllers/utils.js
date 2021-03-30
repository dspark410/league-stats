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

exports.getSummonerMatches = (id, region, queues, matches) => {
  getMatchList2(id, region).then((matchList) => {
    const matchArr = []
    const promise = []
    for (let i = 0; i < matches; i++) {
      promise.push(
        new Promise((resolve, reject) => {
          getMatchDetails2(matchList.data.matches[i].gameId, region).then(
            (matchDetails) => {
              queues
                .filter((queue) => queue.queueId === matchDetails.data.queueId)
                .map((queue) => {
                  const object = {
                    map: queue.map,
                    gameType: queue.description,
                    gameCreation: new Date(
                      matchDetails.data.gameCreation
                    ).toString(),
                    originalDate: matchDetails.data.gameCreation,
                    gameDuration: matchDetails.data.gameDuration,
                    gameVersion: matchDetails.data.gameVersion
                      .split('.')
                      .slice(0, 2)
                      .join('.'),
                    players: [],
                    participants: matchDetails.data.participants,
                    platformId: matchDetails.data.platformId,
                  }
                  matchArr.push(object)

                  resolve(matchArr)
                })
            }
          )
        })
      )
    }
    Promise.all(promise).then((res) => console.log(res))
  })
}
