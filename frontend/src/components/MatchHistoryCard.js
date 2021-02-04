import React, { useState, useEffect, useLayoutEffect } from 'react'
import style from './matchhistory.module.css'
import Tooltip from './Tooltip'
import axios from 'axios'
import ItemHistory from './ItemHistory'
import { runeDescriptions } from '../utils/constant'

// MATCH TIMESLINES API
// https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/3630397822?api_key=RGAPI-f3372fe9-4a88-4d2f-917b-54974292c5f6

function MatchHistoryCard({
  summonerInfo,
  champInfo,
  version,
  getPlayerName,
  queues,
  playerMatches,
}) {
  const visible = playerMatches.length < 7 ? playerMatches.length : 7
  const [gameDetails, setGameDetails] = useState([])
  const [runes, setRunes] = useState([])
  const [spells, setSpells] = useState([])
  const [matchDetails, setMatchDetails] = useState([])
  const [index, setIndex] = useState(visible)

  // Get info from Session Storage
  const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))
  const url = process.env.REACT_APP_API_URL || ''

  // Funtion for loading more matches
  const getMoreMatches = async () => {
    axios
      .get(`${url}/matchDetails/${playerMatches[index].gameId}`)
      .then(async (res) => {
        const newMatch = await createGameObject(res.data, queues, champInfo)
        setGameDetails((prevGames) => [...prevGames, newMatch])
      })
    setIndex((prevIndex) => prevIndex + 1)
  }

  const createGameObject = (match, queues, champInfo) => {
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
        id.player.accountId === sessionData.accountId ||
        id.player.summonerId === summonerInfo.id ||
        id.player.summonerId === sessionData.id
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
      }
    })
    return matchObj
  }

  useEffect(() => {
    // Validation to check if version is populated in props
    if (version !== '') {
      // Retrieve list of summoner spells from Riot API
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`
        )
        .then((res) => {
          setSpells(Object.values(res.data.data))
        })
      // Retrieve list of runes from Riot APIf
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`
        )
        .then((res) => {
          setRunes(res.data)
        })
    }
  }, [version])

  //
  // DEFINITELY CAN REFACTOR
  //
  // Match Details
  useEffect(() => {
    // Empty array to store match details
    const matchArray = []

    // Slice to determine how many previous matches to render
    playerMatches.slice(0, visible).forEach((match) => {
      axios
        .get(`${url}/matchDetails/${match.gameId}`)
        .then((res) => matchArray.push(res.data))
        .then(() => {
          // Need this .then because setMatchDetails renders too quickly
          // Forces it to wait for matchArray to reach correct length
          matchArray.length === visible && setMatchDetails(matchArray)
        })
    })
    // Dependent on playerMatches to be ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerMatches, visible])

  useLayoutEffect(() => {
    const gameDetailsArr = []
    if (matchDetails.length === visible) {
      matchDetails.forEach((match) => {
        // Loops through queue state, to match game type ex. 5v5 , 3v3, summoners rift, ranked
        const matchObj = createGameObject(match, queues, champInfo)
        gameDetailsArr.push(matchObj)
        setGameDetails(gameDetailsArr)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDetails])

  return (
    <div className={style.matchContainer}>
      <div>
        {gameDetails.length >= visible &&
          gameDetails
            .sort(function (a, b) {
              return new Date(b.gameCreation) - new Date(a.gameCreation)
            })
            .map((game, i) => {
              return (
                <div
                  className={
                    game.playerInfo.stats.win
                      ? style.cardContainerWin
                      : style.cardContainerLose
                  }
                  key={i}
                >
                  <span className={style.cardContainer}>
                    <div className={style.firstCard}>
                      <p className={style.gameType}>
                        {game.gameType.split(' ').slice(0, 3).join(' ')}
                      </p>
                      <p className={style.gameCreation}>
                        {game.gameCreation.split(' ').slice(0, 4).join(' ')}
                      </p>
                      <p
                        className={
                          game.playerInfo.stats.win ? style.win : style.loss
                        }
                      >
                        {game.playerInfo.stats.win ? 'Victory' : 'Defeat'}
                      </p>
                      <p className={style.gameDuration}>{`${Math.floor(
                        game.gameDuration / 60
                      )}m ${Math.ceil(game.gameDuration % 60)}s `}</p>
                    </div>

                    <div className={style.secondCard}>
                      <div className={style.championName}>
                        {game.championName}
                      </div>
                      <div className={style.imageContainer}>
                        <div className={style.championImg}>
                          <img
                            className={style.championImage}
                            alt={game.championImage}
                            src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${game.championImage}`}
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
                                    src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/spell/${spell.id}.png`}
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
                                    src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/spell/${spell.id}.png`}
                                  />
                                </Tooltip>
                              )
                          )}
                        </div>
                        <div className={style.summonerSpellContainer}>
                          {runes
                            .filter((rune) => {
                              return (
                                rune.id ===
                                game.playerInfo.stats.perkPrimaryStyle
                              )
                            })
                            .map((rune, i) => {
                              const perk0 = game.playerInfo.stats.perk0
                              const perkImage = rune.slots[0].runes.filter(
                                (perk) => {
                                  return perk.id === perk0
                                }
                              )
                              return (
                                <Tooltip
                                  key={i}
                                  name={perkImage[0].name}
                                  info={perkImage[0].longDesc}
                                >
                                  <img
                                    alt='runes'
                                    className={style.summonerSpell}
                                    src={`https://raw.communitydragon.org/${
                                      game.gameVersion
                                    }/plugins/rcp-be-lol-game-data/global/default/v1/${perkImage[0].icon.toLowerCase()}`}
                                  />
                                </Tooltip>
                              )
                            })}

                          {runes
                            .filter((rune) => {
                              return (
                                game.playerInfo.stats.perkSubStyle === rune.id
                              )
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
                                  src={`https://raw.communitydragon.org/${
                                    game.gameVersion
                                  }/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                                />
                              </Tooltip>
                            ))}
                        </div>
                      </div>
                    </div>
                  </span>
                  <span className={style.cardContainer}>
                    <div className={style.thirdCard}>
                      <div className={style.killDeathAssists}>
                        <span>{game.playerInfo.stats.kills}/</span>
                        <span>{game.playerInfo.stats.deaths}/</span>
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
                        <span className={style.minions}>
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
                  </span>

                  <span className={style.cardContainer}>
                    <div className={style.sixthCard}>
                      {game.players
                        .slice(0, Math.ceil(game.players.length / 2))
                        .map((player, i) => (
                          <div
                            onClick={
                              player.name === summonerInfo.name ||
                              player.name === sessionData.name
                                ? null
                                : getPlayerName
                            }
                            name={player.name}
                            className={style.col}
                            key={i}
                          >
                            <img
                              name={player.name}
                              alt={player.image}
                              src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${player.image}`}
                            />
                            <span
                              className={
                                summonerInfo.name
                                  ? player.name === summonerInfo.name
                                    ? style.summonerName
                                    : style.name
                                  : style.name || sessionData.name
                                  ? player.name === sessionData.name
                                    ? style.summonerName
                                    : style.name
                                  : style.name
                              }
                              name={player.name}
                            >
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
                            onClick={
                              player.name === summonerInfo.name ||
                              player.name === sessionData.name
                                ? null
                                : getPlayerName
                            }
                            name={player.name}
                            className={style.col}
                            key={i}
                          >
                            <img
                              name={player.name}
                              alt={player.image}
                              src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${player.image}`}
                            />
                            <span
                              className={
                                summonerInfo.name
                                  ? player.name === summonerInfo.name
                                    ? style.summonerName
                                    : style.name
                                  : style.name || sessionData.name
                                  ? player.name === sessionData.name
                                    ? style.summonerName
                                    : style.name
                                  : style.name
                              }
                              name={player.name}
                            >
                              {player.name.replace(/\s/g, '')}
                            </span>
                          </div>
                        ))}
                    </div>
                  </span>
                </div>
              )
            })}

        {gameDetails.length >= visible && (
          <div
            className={
              index < playerMatches.length ? style.moreMatchesBtn : style.none
            }
            onClick={index < playerMatches.length ? getMoreMatches : null}
          >
            {index >= playerMatches.length ? (
              <div disabled className={style.none}>
                More Matches Unavailable
              </div>
            ) : (
              'Load More'
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchHistoryCard
export const memoHistory = React.memo(MatchHistoryCard)
