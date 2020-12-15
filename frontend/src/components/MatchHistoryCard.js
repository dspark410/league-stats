import React, { useState, useEffect } from 'react'
import style from './matchhistory.module.css'
import Tooltip from './Tooltip'
import axios from 'axios'
import Loader from '../components/Loader'
import ItemHistory from '../components/ItemHistory'
import { runeDescriptions } from '../utils/constant'

// MATCH TIMESLINES API
// https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/3630397822?api_key=RGAPI-f3372fe9-4a88-4d2f-917b-54974292c5f6

function MatchHistoryCard({
  matchDetails,
  summonerInfo,
  champInfo,
  version,
  getPlayerName,
  queues,
}) {
  const [gameDetails, setGameDetails] = useState([])
  const [runes, setRunes] = useState([])
  const [spells, setSpells] = useState([])

  const [loading, setLoading] = useState(true)

  // Get info from Session Storage
  const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))

  useEffect(() => {
    // Validation to check if version is populated in props
    if (version !== '') {
      // Retrieve list of summoner spells from Riot API
      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`
        )
        .then((res) => {
          setSpells(Object.values(res.data.data))
        })
      // Retrieve list of runes from Riot APIf
      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`
        )
        .then((res) => {
          setRunes(res.data)
        })
    }
  }, [version])

  useEffect(() => {
    // console.log('matchDetails', matchDetails)
    // console.log('queue', queues)
    // console.log('summonerInfo', summonerInfo)
    // console.log('sessionData', sessionData)
    // console.log('champInfo', champInfo)

    // if (matchDetails.length === 6) {
    //   ;(async function () {
    //     const allMatch = await matchDetails.reduce((array, match) => {
    //       // Loops through queue state, to match game type ex. 5v5 , 3v3, summoners rift, ranked
    //       const matchObj = queues
    //         .filter((queue) => match.queueId === queue.queueId)
    //         .map((queue) => {
    //           const date = new Date(match.gameCreation).toString()

    //           const object = {
    //             map: queue.map,
    //             gameType: queue.description,
    //             gameCreation: date,
    //             gameDuration: match.gameDuration,
    //             gameVersion: match.gameVersion.split('.').slice(0, 2).join('.'),
    //             players: [],
    //           }

    //           return object
    //         })[0]

    //       // loops through current account id in session or summonerInfo
    //       // To grab the right info for match history card
    //       let playerObj
    //       match.participantIdentities.forEach((id) => {
    //         if (
    //           id.player.accountId === summonerInfo.accountId ||
    //           id.player.accountId === sessionData.accountId
    //         ) {
    //           matchObj.participantId = id.participantId
    //         }
    //         // Champion Icon for summoner and summoner name on sixth and seventh card
    //         match.participants.forEach((part) => {
    //           if (id.participantId === part.participantId) {
    //             playerObj = {
    //               id: id.participantId,
    //               name: id.player.summonerName,
    //               champId: part.championId,
    //             }
    //           }
    //           champInfo.forEach((key) => {
    //             if (playerObj.champId === +key.key) {
    //               playerObj.image = key.image.full
    //             }
    //           })
    //         })
    //         matchObj.players.push(playerObj)
    //       })
    //       // finds matching participantId from matchObj and keeps all data from matching participants
    //       match.participants.forEach((data) => {
    //         if (data.participantId === matchObj.participantId) {
    //           const playerStats = data
    //           matchObj.playerInfo = playerStats
    //         }
    //       })
    //       // get relevant image for player's champion for that game
    //       champInfo.forEach((champ) => {
    //         if (matchObj.playerInfo.championId === +champ.key) {
    //           matchObj.championName = champ.name
    //           matchObj.championImage = champ.image.full
    //         }
    //       })

    //       array.push(matchObj)
    //       return array
    //     }, [])
    //     setGameDetails(allMatch)
    //     setTimeout(() => {
    //       setLoading(false)
    //     }, 1000)
    //   })()
    // }

    const gameDetailsArr = []
    if (matchDetails.length === 6) {
      matchDetails.forEach((match) => {
        // Loops through queue state, to match game type ex. 5v5 , 3v3, summoners rift, ranked
        const matchObj = queues
          .filter((queue) => match.queueId === queue.queueId)
          .map((queue) => {
            const date = new Date(match.gameCreation).toString()

            const object = {
              map: queue.map,
              gameType: queue.description,
              gameCreation: date,
              gameDuration: match.gameDuration,
              gameVersion: match.gameVersion.split('.').slice(0, 2).join('.'),
              players: [],
            }

            return object
          })[0]

        // loops through current account id in session or summonerInfo
        // To grab the right info for match history card
        let playerObj
        match.participantIdentities.forEach((id) => {
          if (
            id.player.accountId === summonerInfo.accountId ||
            id.player.accountId === sessionData.accountId
          ) {
            matchObj.participantId = id.participantId
          }
          // Champion Icon for summoner and summoner name on sixth and seventh card
          match.participants.forEach((part) => {
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
        match.participants.forEach((data) => {
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
            gameDetailsArr.push(matchObj)
          }
        })
        setGameDetails(gameDetailsArr)
      })

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [matchDetails])

  return (
    <div className={style.matchContainer}>
      <h1>Match History</h1>

      {loading ? (
        <Loader />
      ) : (
        gameDetails.length === 6 &&
        gameDetails
          .sort(function (a, b) {
            return new Date(b.gameCreation) - new Date(a.gameCreation)
          })
          .map((game, i) => (
            <div
              className={
                game.playerInfo.stats.win
                  ? style.cardContainerWin
                  : style.cardContainerLose
              }
              key={i}
            >
              <div className={style.firstCard}>
                <p className={style.gameType}>
                  {game.gameType.split(' ').slice(0, 3).join(' ')}
                </p>
                <p className={style.gameCreation}>
                  {game.gameCreation.split(' ').slice(0, 4).join(' ')}
                </p>
                <p
                  className={game.playerInfo.stats.win ? style.win : style.loss}
                >
                  {game.playerInfo.stats.win ? 'Victory' : 'Defeat'}
                </p>
                <p className={style.gameDuration}>{`${Math.floor(
                  game.gameDuration / 60
                )}m ${Math.ceil(game.gameDuration % 60)}s `}</p>
              </div>

              <div className={style.secondCard}>
                <div className={style.imageContainer}>
                  <div className={style.championImg}>
                    <img
                      className={style.championImage}
                      alt={game.championImage}
                      src={`http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${game.championImage}`}
                    />
                  </div>

                  <div className={style.summonerSpellContainer}>
                    {spells.map(
                      (spell, i) =>
                        +spell.key === game.playerInfo.spell1Id && (
                          <Tooltip
                            key={i}
                            name={spell.name}
                            info={spell.description}
                          >
                            <img
                              alt={spell.name}
                              className={style.summonerSpell}
                              src={`http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/spell/${spell.id}.png`}
                            />
                          </Tooltip>
                        )
                    )}

                    {spells.map(
                      (spell, i) =>
                        +spell.key === game.playerInfo.spell2Id && (
                          <Tooltip
                            key={i}
                            name={spell.name}
                            info={spell.description}
                          >
                            <img
                              key={i}
                              alt={spell.name}
                              className={style.summonerSpell2}
                              src={`http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/spell/${spell.id}.png`}
                            />
                          </Tooltip>
                        )
                    )}
                  </div>
                  <div className={style.summonerSpellContainer}>
                    {runes
                      .filter((rune) => {
                        return (
                          rune.id === game.playerInfo.stats.perkPrimaryStyle
                        )
                      })
                      .map((rune, i) => {
                        const perk0 = game.playerInfo.stats.perk0
                        const perkImage = rune.slots[0].runes.filter((perk) => {
                          return perk.id === perk0
                        })
                        return (
                          <Tooltip
                            key={i}
                            name={perkImage[0].name}
                            info={perkImage[0].longDesc}
                          >
                            <img
                              alt='runes'
                              className={style.summonerSpell}
                              src={`http://raw.communitydragon.org/${
                                game.gameVersion
                              }/plugins/rcp-be-lol-game-data/global/default/v1/${perkImage[0].icon.toLowerCase()}`}
                            />
                          </Tooltip>
                        )
                      })}

                    {runes
                      .filter((rune) => {
                        return game.playerInfo.stats.perkSubStyle === rune.id
                      })
                      .map((rune, i) => (
                        <Tooltip
                          name={rune.name}
                          info={runeDescriptions
                            .filter(
                              (runeDescription) =>
                                runeDescription.key === rune.name &&
                                runeDescription.description
                            )
                            .map((rune) => rune.description)}
                          key={i}
                        >
                          <img
                            alt='summoner spell'
                            className={style.summonerSpell2}
                            src={`http://raw.communitydragon.org/${
                              game.gameVersion
                            }/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                          />
                        </Tooltip>
                      ))}
                  </div>
                </div>

                <div className={style.championName}>{game.championName}</div>
              </div>

              <div className={style.thirdCard}>
                <div className={style.killDeathAssists}>
                  <span>{game.playerInfo.stats.kills} / </span>
                  <span>{game.playerInfo.stats.deaths} / </span>
                  <span>{game.playerInfo.stats.assists}</span>
                </div>
                <div className={style.kdaRatio}>
                  <span>
                    {(
                      (game.playerInfo.stats.kills +
                        game.playerInfo.stats.assists) /
                      (game.playerInfo.stats.deaths === 0
                        ? 1
                        : game.playerInfo.stats.deaths)
                    ).toFixed(2)}
                    :1 KDA
                  </span>
                  <div>
                    <span>
                      {game.playerInfo.stats.largestMultiKill === 0 ||
                      game.playerInfo.stats.largestMultiKill === 1
                        ? ''
                        : game.playerInfo.stats.largestMultiKill === 2
                        ? 'Double Kill'
                        : game.playerInfo.stats.largestMultiKill === 3
                        ? 'Triple Kill'
                        : game.playerInfo.stats.largestMultiKill === 4
                        ? 'Quadra Kill'
                        : 'Penta Kill'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={style.fourthCard}>
                <span>level {game.playerInfo.stats.champLevel}</span>
                <Tooltip
                  moreInfo={`${game.playerInfo.stats.totalMinionsKilled} minions killed + ${game.playerInfo.stats.neutralMinionsKilled} monsters killed `}
                >
                  <span>
                    {game.playerInfo.stats.totalMinionsKilled +
                      game.playerInfo.stats.neutralMinionsKilled}{' '}
                    cs
                  </span>
                </Tooltip>
                <Tooltip
                  moreInfo={`${(
                    (game.playerInfo.stats.totalMinionsKilled +
                      game.playerInfo.stats.neutralMinionsKilled) /
                    (game.gameDuration / 60)
                  ).toFixed(1)} CS per minute`}
                >
                  <span>
                    (
                    {(
                      (game.playerInfo.stats.totalMinionsKilled +
                        game.playerInfo.stats.neutralMinionsKilled) /
                      (game.gameDuration / 60)
                    ).toFixed(1)}
                    )
                  </span>
                </Tooltip>
              </div>

              <div className={style.fifthCard}>
                <ItemHistory
                  details={game.playerInfo.stats}
                  version={game.gameVersion}
                />
              </div>

              <div className={style.sixthCard}>
                {game.players
                  .slice(0, Math.ceil(game.players.length / 2))
                  .map((player, i) => (
                    <div
                      onClick={getPlayerName}
                      name={player.name}
                      className={style.col}
                      key={i}
                    >
                      <img
                        name={player.name}
                        alt={player.image}
                        src={`http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${player.image}`}
                      />
                      <span name={player.name}>
                        {player.name.replace(/\s/g, '')}
                      </span>
                    </div>
                  ))}
              </div>

              <div className={style.seventhCard}>
                {game.players
                  .slice(
                    Math.ceil(game.players.length / 2),
                    game.players.length
                  )
                  .map((player, i) => (
                    <div
                      onClick={getPlayerName}
                      name={player.name}
                      className={style.col}
                      key={i}
                    >
                      <img
                        name={player.name}
                        alt={player.image}
                        src={`http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${player.image}`}
                      />
                      <span name={player.name}>
                        {player.name.replace(/\s/g, '')}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))
      )}
    </div>
  )
}

export default MatchHistoryCard
