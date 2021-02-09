import React, { useState, useEffect } from 'react'
import style from './welcome.module.css'
import axios from 'axios'
//import { motion } from "framer-motion";
import MasteryCard from '../components/MasteryCard'
import RankCard from '../components/RankCard'
import UnrankedCard from '../components/UnrankedCard'
import SummonerCard from '../components/SummonerCard'
import MatchHistoryCard from '../components/MatchHistoryCard'
import Live from '../components/Live'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import MatchHistoryCardSkeleton from '../components/MatchHistoryCardSkeleton'
import MasteryCardSkeleton from '../components/MasteryCardSkeleton'

function Welcome({
  summonerInfo,
  champInfo,
  version,
  getPlayerName,
  queues,
  redirect,
  showNav,
}) {
  const [mastery, setMastery] = useState([])
  const [rank, setRank] = useState([])
  const [liveRank, setLiveRank] = useState([])
  const [filteredChamps, setFilteredChamps] = useState([])
  const [session, setSession] = useState({})
  const [playerMatches, setPlayerMatches] = useState([])
  const [display, setDisplay] = useState('overview')
  const [live, setLive] = useState()
  const [time, setTime] = useState()
  const [loading, setLoading] = useState(true)

  const url = process.env.REACT_APP_API_URL || ''

  // Function for masteries call specific to summoner id
  const getMasteries = (id) => axios.get(`${url}/masteries/${id}`)

  // Function for rank call specific to summoner id
  const getRank = (id) => axios.get(`${url}/rank/${id}`)

  // Function for getting match list specific to the summoner
  const getMatchList = (id) => axios.get(`${url}/matchList/${id}`)

  useEffect(() => {
    // Show nav on the welcome screen
    showNav()
    setLive()
    if (!summonerInfo.id) {
      // Checks if summonerInfo.id is available, if not grab identical copy from sessionStorage
      const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))
      setSession(sessionData)

      // Get masteries using sessionStorage and set into state

      getMasteries(sessionData.id).then((res) => {
        setMastery(res.data)
        getRank(sessionData.id).then((res) => setRank(res.data))

        getMatchList(sessionData.accountId).then((res) =>
          setPlayerMatches(res.data.matches)
        )
      })

      // Get live game data for summoner
      axios.get(`${url}/live/${sessionData.id}`).then((res) => {
        setLive(res.data)
        // setLength(res.data.gameLength)
      })
    } else {
      // Get masteries from state and set into state
      setLoading(true)

      getMasteries(summonerInfo.id).then((res) => {
        setMastery(res.data)
        getRank(summonerInfo.id).then((res) => setRank(res.data))
        getMatchList(summonerInfo.accountId).then((res) =>
          setPlayerMatches(res.data.matches)
        )
      })

      // Get live game data for summoner
      axios.get(`${url}/live/${summonerInfo.id}`).then((res) => {
        setLive(res.data)
      })
      if (playerMatches.length >= 0 && mastery.length >= 0 && summonerInfo) {
        setTimeout(() => {
          setLoading(false)
        }, 3000)
      }
    }

    redirect()
    // Dependency, rerenders when summonerInfo.id is ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summonerInfo])

  useEffect(() => {
    let time
    if (live && typeof live.gameLength === 'number') {
      setTime(live.gameLength < 0 ? live.gameLength * -1 : live.gameLength)
      time = setInterval(() => {
        setTime((seconds) => seconds + 1)
      }, 1000)

      // const liveRankArray = []
      // live.participants.forEach(async (player) => {
      //   const res = await getRank(player.summonerId)

      //   liveRankArray.push(res.data)

      //   if (liveRankArray.length === 10) {
      //     setLiveRank(liveRankArray)
      //   }
      // })
    }
    return () => {
      clearTimeout(time)
    }
  }, [live])

  useEffect(() => {
    // Array to store newly created object that matches champion key to mastery key
    const champObject = []
    // Nested for loop that compares mastery array to champInfo array for matches
    mastery.forEach((champ) => {
      champInfo.forEach((champion) => {
        if (champ.championId === +champion.key) {
          const name = champion.name
          const key = champ.championId
          const image = champion.image.full
          const level = champ.championLevel
          const points = champ.championPoints

          // Create our own object containing neccessary data to push to champObject
          const object = {
            name,
            key,
            image,
            level,
            points,
          }
          // Push object to champObject
          champObject.push(object)
        }
      })
    })
    // Stores new array of object into state to be mapped
    setFilteredChamps(champObject)
  }, [mastery, champInfo])
  return (
    <SkeletonTheme duration={3} color='#7a6b83' highlightColor='#e2c0f7'>
      <div className={style.rowContainer}>
        <div className={style.row1}>
          <div className={style.summonerNameContainer}>
            {/* <h1 className={style.summonerName}>
              {!loading ? (
                summonerInfo.name || session.name
              ) : (
                <Skeleton
                  height={50}
                  width={400}
                  style={{ marginBottom: '15px' }}
                />
              )}
            </h1> */}

            {live ? (
              !loading ? (
                <div className={style.inGame}>
                  <div className={style.circlePulse} />
                  In Game
                </div>
              ) : (
                <Skeleton
                  style={{ border: 'none' }}
                  className={`${style.inGame} `}
                />
              )
            ) : (
              ''
            )}
          </div>
          <div className={style.emblemContainer}>
            {!loading ? (
              <SummonerCard version={version} summonerInfo={summonerInfo} />
            ) : (
              <Skeleton circle={true} width={125} height={125} />
            )}
            <div className={style.rankCardContainer}>
              {!loading ? (
                <div className={style.rankContainer}>
                  {!rank.length ||
                  (rank.length === 1 &&
                    rank[0].queueType === 'RANKED_FLEX_SR') ? (
                    <UnrankedCard queue='Solo' />
                  ) : (
                    rank.map((ranking, i) => {
                      return ranking.queueType === 'RANKED_SOLO_5x5' ? (
                        <RankCard rank={ranking} queue='Solo' />
                      ) : (
                        ranking.queueType === 'RANKED_FLEX_SR' && ''
                      )
                    })
                  )}

                  <img
                    alt='Unranked'
                    className={style.rectangle}
                    src={process.env.PUBLIC_URL + `/images/icons/rectangle.png`}
                  />

                  {!rank.length ||
                  (rank.length === 1 &&
                    rank[0].queueType === 'RANKED_SOLO_5x5') ? (
                    <UnrankedCard queue='Flex' />
                  ) : (
                    rank.map((ranking, i) => {
                      return ranking.queueType === 'RANKED_FLEX_SR' ? (
                        <RankCard rank={ranking} queue='Flex' />
                      ) : (
                        ranking.queueType === 'RANKED_SOLO_5x5' && ''
                      )
                    })
                  )}
                </div>
              ) : (
                <div style={{ marginLeft: '10px' }}>
                  <div>
                    <Skeleton
                      style={{ marginLeft: '10px' }}
                      circle={true}
                      width={50}
                      height={50}
                    />
                    <Skeleton
                      style={{ marginLeft: '10px' }}
                      width={200}
                      height={48}
                    />
                  </div>
                  <div>
                    <Skeleton
                      style={{ marginLeft: '10px' }}
                      width={125}
                      height={41}
                    />
                    <Skeleton
                      style={{ marginLeft: '10px' }}
                      width={115}
                      height={41}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={style.row2}>
          <div className={style.linksContainer}>
            <span
              onClick={() => setDisplay('overview')}
              to='#'
              className={
                !loading && display === 'overview'
                  ? style.underline
                  : style.live
              }
            >
              {!loading ? (
                'Overview'
              ) : (
                <Skeleton
                  style={{ display: 'inlineBlock' }}
                  height={30}
                  width={74}
                />
              )}
            </span>
            <span
              onClick={() => setDisplay('live')}
              to='/live'
              className={
                !loading && display === 'live' ? style.underline : style.live
              }
            >
              {!loading ? (
                'Live Game'
              ) : (
                <Skeleton
                  style={{ display: 'inlineBlock' }}
                  height={30}
                  width={84}
                />
              )}
            </span>
          </div>
        </div>
        <div className={style.row3}>
          {display === 'overview' && playerMatches.length === 0 && !loading ? (
            <>
              <div className={style.noMatchContainer}>
                <div className={style.matchHeader}>Match History</div>
                <div className={style.noMatches}>No Matches Were Found.</div>
              </div>

              <div className={style.masteryCard}>
                <div className={style.header}>
                  <img
                    alt='mastery icon'
                    src={process.env.PUBLIC_URL + '/images/icons/mastery.png'}
                  />
                  CHAMPION MASTERY
                </div>
                <div className={style.masteryHeader}>
                  <div className={style.championHeader}>CHAMPION</div>
                  <div className={style.levelHeader}>LEVEL</div>
                  <div className={style.pointsHeader}>POINTS</div>
                </div>
                {filteredChamps.length === 0 && (
                  <div className={style.noChamps}>No Champions Found.</div>
                )}
              </div>
              {live === undefined && display === 'live' && (
                <div className={style.notInGame}>Summoner Is Not In Game.</div>
              )}
            </>
          ) : (
            <>
              <div
                className={
                  loading && display === 'overview' ? style.row3 : style.none
                }
              >
                <MatchHistoryCardSkeleton />
                <MasteryCardSkeleton />
              </div>
              <div
                className={
                  !loading && display === 'overview' ? style.row3 : style.none
                }
              >
                <MatchHistoryCard
                  version={version}
                  summonerInfo={summonerInfo}
                  champInfo={champInfo}
                  getPlayerName={getPlayerName}
                  queues={queues}
                  playerMatches={playerMatches}
                  skeleton={loading}
                />
                <MasteryCard
                  version={version}
                  filteredChamps={filteredChamps}
                  champInfo={champInfo}
                  skeleton={loading}
                />
              </div>
              <div
                className={
                  live === undefined && display === 'live'
                    ? style.notInGame
                    : style.none
                }
              >
                Summoner Is Not In Game.
              </div>
              <div
                className={
                  live && display === 'live' ? style.liveContainer : style.none
                }
              >
                {live ? (
                  <Live
                    live={live}
                    champInfo={champInfo}
                    version={version}
                    queues={queues}
                    time={time}
                    liveRank={liveRank}
                  />
                ) : (
                  ''
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default Welcome
