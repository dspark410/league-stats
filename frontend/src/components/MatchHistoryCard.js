import React, { useState, useEffect } from 'react'
import style from './matchhistory.module.css'
import Tooltip from './Tooltip'
import axios from 'axios'
import Loader from '../components/Loader'

// MATCH TIMESLINES API
// https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/3630397822?api_key=RGAPI-f3372fe9-4a88-4d2f-917b-54974292c5f6

// SUMMONER SPELLS
// http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/summoner.json

// ITEMS
// http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/item.json

function MatchHistoryCard({
  matchDetails,
  summonerInfo,
  champInfo,
  version,
  getPlayername,
}) {
  // const [types, setTypes] = useState([])
  // const [modes, setModes] = useState([])
  //const [maps, setMaps] = useState([])
  const [queues, setQueues] = useState([])
  const [gameDetails, setGameDetails] = useState([])
  const [spells, setSpells] = useState([])
  const [filteredSpells, setFilteredSpells] = useState([])
  const [runes, setRunes] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const runeDescriptions = [
    {
      description: 'Improved attacks and sustained damage.',
      key: 'Precision',
    },
    {
      description: 'Burst damage and target access.',
      key: 'Domination',
    },
    {
      description: 'Empowered abilities and resource manipulation.',
      key: 'Sorcery',
    },
    {
      description: 'Durability and crowd',
      key: 'Resolve',
    },
    {
      description: 'Creative tools and rule bending',
      key: 'Inspiration',
    },
  ]

  useEffect(() => {
    if (version !== '') {
      // axios
      //   .get('http://static.developer.riotgames.com/docs/lol/gameTypes.json')
      //   .then((res) => setTypes(res.data))
      // axios
      //   .get('http://static.developer.riotgames.com/docs/lol/gameModes.json')
      //   .then((res) => setModes(res.data))
      axios
        .get('http://localhost:5000/queueType')
        .then((res) => setQueues(res.data))
      // axios.get('http://localhost:5000/mapList').then((res) => setMaps(res.data))
      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`
        )
        .then((res) => {
          setSpells(res.data.data)
        })

      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`
        )
        .then((res) => {
          setRunes(res.data)
        })
      axios
        .get(
          'http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/item.json'
        )
        .then((res) => {
          const itemNumber = Object.keys(res.data.data)
          const itemObject = Object.values(res.data.data)

          const newArray = []

          for (let i = 0; i < itemNumber.length; i++) {
            const item = itemNumber[i]
            const name = itemObject[i].name
            const description = itemObject[i].description
            const plainText = itemObject[i].plaintext
            const price = itemObject[i].gold.base

            const object = {
              item,
              name,
              description,
              plainText,
              price,
            }

            newArray.push(object)
          }
          setItems(newArray)
        })
    }
  }, [version])

  useEffect(() => {
    const spellInfoArray = Object.values(spells)

    const newArray = []

    for (let i = 0; i < spellInfoArray.length; i++) {
      const name = spellInfoArray[i].name
      const key = spellInfoArray[i].key
      const id = spellInfoArray[i].id
      const description = spellInfoArray[i].description

      const object = {
        name,
        key,
        id,
        description,
      }
      newArray.push(object)
    }
    setFilteredSpells(newArray)
  }, [spells])

  const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))

  useEffect(() => {
    const matchsAsync = async () => {
      const gameDetailsArr = []
      await matchDetails.forEach((match) => {
        let matchObj
        let participantObj
        queues.forEach((queue) => {
          if (match.queueId === queue.queueId) {
            const date = new Date(match.gameCreation).toString()

            matchObj = {
              map: queue.map,
              gameType: queue.description,
              gameCreation: date,
              gameDuration: match.gameDuration,
              gameVersion: match.gameVersion.split('.').slice(0, 2).join('.'),
              players: [],
            }
          }
        })
        match.participantIdentities.forEach((id) => {
          if (
            id.player.accountId === summonerInfo.accountId ||
            id.player.accountId === sessionData.accountId
          ) {
            participantObj = id.participantId
            matchObj.participantId = participantObj
          }
        })

        match.participants.forEach((data) => {
          if (data.participantId === participantObj) {
            const playerStats = data
            matchObj.playerInfo = playerStats
          }
        })

        champInfo.forEach((champ) => {
          if (matchObj.playerInfo.championId === +champ.key) {
            matchObj.championName = champ.name
            matchObj.championImage = champ.image
            gameDetailsArr.push(matchObj)
          }
        })

        let playerObj
        match.participantIdentities.forEach((player) => {
          match.participants.forEach((id) => {
            if (player.participantId === id.participantId) {
              playerObj = {
                id: player.participantId,
                name: player.player.summonerName,
                champId: id.championId,
              }
            }
            champInfo.forEach((key) => {
              if (playerObj.champId === +key.key) {
                playerObj.image = key.image
              }
            })
          })
          matchObj.players.push(playerObj)
        })
      })
      setGameDetails(gameDetailsArr)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    //CHANGE MATCH DETAILS LENGTH
    //CHANGE MATCH DETAILS LENGTH
    //CHANGE MATCH DETAILS LENGTH
    // CHANGE MATCH DETAILS LENGTH
    if (matchDetails.length === 6) {
      matchsAsync()
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
                      src={`http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${game.championImage}.png`}
                    />
                  </div>

                  <div className={style.summonerSpellContainer}>
                    {filteredSpells.map(
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

                    {filteredSpells.map(
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
                      game.playerInfo.stats.deaths
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
                  info={`${game.playerInfo.stats.totalMinionsKilled} minions killed + ${game.playerInfo.stats.neutralMinionsKilled} monsters killed `}
                >
                  <span>
                    {game.playerInfo.stats.totalMinionsKilled +
                      game.playerInfo.stats.neutralMinionsKilled}{' '}
                    cs
                  </span>
                </Tooltip>
                <Tooltip
                  info={`${(
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
                <div className={style.itemRow1}>
                  <Tooltip>
                    <img
                      alt='item'
                      src={
                        game.playerInfo.stats.item0
                          ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item0}.png`
                          : process.env.PUBLIC_URL + '/images/emptyitem.png'
                      }
                    />
                  </Tooltip>
                  <img
                    alt='item'
                    src={
                      game.playerInfo.stats.item1
                        ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item1}.png`
                        : process.env.PUBLIC_URL + '/images/emptyitem.png'
                    }
                  />
                  <img
                    alt='item'
                    src={
                      game.playerInfo.stats.item2
                        ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item2}.png`
                        : process.env.PUBLIC_URL + '/images/emptyitem.png'
                    }
                  />
                  <img
                    alt='item'
                    src={
                      game.playerInfo.stats.item6
                        ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item6}.png`
                        : process.env.PUBLIC_URL + '/images/emptyitem.png'
                    }
                  />
                </div>
                <div className={style.itemRow2}>
                  <img
                    alt='item'
                    src={
                      game.playerInfo.stats.item3
                        ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item3}.png`
                        : process.env.PUBLIC_URL + '/images/emptyitem.png'
                    }
                  />
                  <img
                    alt='item'
                    src={
                      game.playerInfo.stats.item4
                        ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item4}.png`
                        : process.env.PUBLIC_URL + '/images/emptyitem.png'
                    }
                  />
                  <img
                    alt='item'
                    src={
                      game.playerInfo.stats.item5
                        ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item5}.png`
                        : process.env.PUBLIC_URL + '/images/emptyitem.png'
                    }
                  />
                </div>
              </div>

              <div className={style.sixthCard}>
                {game.players
                  .slice(0, Math.ceil(game.players.length / 2))
                  .map((player, i) => (
                    <div
                      onClick={getPlayername}
                      name={player.name}
                      className={style.col}
                      key={i}
                    >
                      <img
                        name={player.name}
                        alt={player.image}
                        src={`http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${player.image}.png`}
                      />
                      <span name={player.name}>{player.name}</span>
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
                      onClick={getPlayername}
                      name={player.name}
                      className={style.col}
                      key={i}
                    >
                      <img
                        name={player.name}
                        alt={player.image}
                        src={`http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${player.image}.png`}
                      />
                      <span name={player.name}>{player.name}</span>
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
