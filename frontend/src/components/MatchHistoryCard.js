import React, { useState, useEffect } from 'react'
import style from './matchhistory.module.css'
import axios from 'axios'

// MATCH TIMESLINES API
// https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/3630397822?api_key=RGAPI-f3372fe9-4a88-4d2f-917b-54974292c5f6

// SUMMONER SPELLS
// http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/summoner.json

// ITEMS
// http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/item.json

function MatchHistoryCard({ matchDetails, summonerInfo, champInfo }) {
  // const [types, setTypes] = useState([])
  // const [modes, setModes] = useState([])
  //const [maps, setMaps] = useState([])
  const [queues, setQueues] = useState([])
  const [gameDetails, setGameDetails] = useState([])

  useEffect(() => {
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
  }, [])

  const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))

  useEffect(() => {
    const gameDetailsArr = []
    matchDetails.forEach((match) => {
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
<<<<<<< HEAD
          const playerStats = data
          matchObj.playerInfo = playerStats
          champInfo.forEach((champ) => {
            if (matchObj.playerInfo.championId === +champ.key) {
              matchObj.championName = champ.name
              matchObj.championImage = champ.image
            }
          })
          gameDetailsArr.push(matchObj)
=======
          const playerStats = data;
          matchObj.playerInfo = playerStats;
        }
      });

      champInfo.forEach((champ) => {
        if (matchObj.playerInfo.championId === +champ.key) {
          matchObj.championName = champ.name;
          matchObj.championImage = champ.image;

          gameDetailsArr.push(matchObj);
>>>>>>> 9776eacf629d5b4d36c7f62a515390d779e932b3
        }
      })
    })
    setGameDetails(gameDetailsArr)
  }, [matchDetails])

  return (
    <div className={style.matchContainer}>
      {gameDetails.length === 2 &&
        gameDetails.map((game, i) => (
          <div className={style.cardContainer} key={i}>
            <div className={style.firstCard}>
              <p className={style.gameType}>
                {game.gameType.split(' ').slice(0, 3).join(' ')}
              </p>
              <p className={style.gameCreation}>
                {game.gameCreation.split(' ').slice(0, 4).join(' ')}
              </p>
              <p className={style.winLoss}>
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
                    src={`http://ddragon.leagueoflegends.com/cdn/10.24.1/img/champion/${game.championImage}.png`}
                  />
                </div>

                <div className={style.summonerSpellContainer}>
                  <img
                    className={style.summonerSpell}
                    src={`http://ddragon.leagueoflegends.com/cdn/10.24.1/img/spell/SummonerFlash.png`}
                  />
                  <img
                    className={style.summonerSpell}
                    src={`http://ddragon.leagueoflegends.com/cdn/10.24.1/img/spell/SummonerFlash.png`}
                  />
                </div>
                <div className={style.summonerSpellContainer}>
                  <img
                    className={style.summonerSpell}
                    src={`http://ddragon.leagueoflegends.com/cdn/10.24.1/img/spell/SummonerFlash.png`}
                  />

                  <img
                    className={style.summonerSpell}
                    src={`http://ddragon.leagueoflegends.com/cdn/10.24.1/img/spell/SummonerFlash.png`}
                  />
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
                  :1 kda
                </span>
                <div>
                  <span>
                    {game.playerInfo.stats.largestMultiKill}
                    {/* {game.playerInfo.stats.largestMultiKill === 0 || 1
                      ? ''
                      : game.playerInfo.stats.largestMultiKill === 2
                      ? 'Double Kill'
                      : game.playerInfo.stats.largestMultiKill === 3
                      ? 'Triple Kill'
                      : game.playerInfo.stats.largestMultiKill === 4
                      ? 'Quadra Kill'
                      : 'Penta Kill'} */}
                  </span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default MatchHistoryCard
