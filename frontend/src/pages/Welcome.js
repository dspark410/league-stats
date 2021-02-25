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
import { MdLiveTv } from 'react-icons/md'

export const Welcome = React.memo(
  ({
    summonerInfo,
    champInfo,
    version,
    getPlayerName,
    queues,
    redirect,
    showNav,
    selectChampion,
    region,
    loading,
    skeletonTrue,
    skeletonFalse,
  }) => {
    const [mastery, setMastery] = useState([])
    const [rank, setRank] = useState([])
    const [liveRank, setLiveRank] = useState([])
    const [filteredChamps, setFilteredChamps] = useState([])
    const [playerMatches, setPlayerMatches] = useState([])
    const [display, setDisplay] = useState('overview')
    const [live, setLive] = useState()
    const [time, setTime] = useState()
    // const [loading, setLoading] = useState(true)
    const url = process.env.REACT_APP_API_URL || ''
    let source = axios.CancelToken.source()

    // Function for masteries call specific to summoner id
    const getMasteries = (id, region) => {
      setTimeout(() => {
        source.cancel()
      }, 3000)

      return axios.get(`${url}/masteries/${id}/${region}`, {
        cancelToken: source.token,
      })
    }

    // Function for rank call specific to summoner id
    const getRank = (id, region) => {
      setTimeout(() => {
        source.cancel()
      }, 3000)
      return axios.get(`${url}/rank/${id}/${region}`, {
        cancelToken: source.token,
      })
    }

    // Function for getting match list specific to the summoner
    const getMatchList = (id, region) => {
      setTimeout(() => {
        source.cancel()
      }, 3000)
      return axios.get(`${url}/matchList/${id}/${region}`, {
        cancelToken: source.token,
      })
    }

    useEffect(() => {
      // Show nav on the welcome screen
      showNav()
      setLive()
      if (!summonerInfo) {
        // Checks if summonerInfo.id is available, if not grab identical copy from sessionStorage
        const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))

        // Get masteries using sessionStorage and set into state
        skeletonTrue()
        window.scrollTo(0, 0)
        getMasteries(sessionData.id, region).then((res) => {
          setMastery(res.data)
          getRank(sessionData.id, region).then((res) => setRank(res.data))

          getMatchList(sessionData.accountId, region).then((res) => {
            res.data.matches
              ? setPlayerMatches(res.data.matches)
              : setPlayerMatches([])
          })
        })

        // Get live game data for summoner
        setTimeout(() => {
          source.cancel()
        }, 3000)

        axios
          .get(`${url}/live/${sessionData.id}/${region}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setLive(res.data)
            // setLength(res.data.gameLength)
          })

        if (playerMatches.length >= 0 && mastery.length >= 0 && sessionData) {
          setTimeout(() => {
            skeletonFalse()
          }, 3000)
        }
      } else {
        // Get masteries from state and set into state
        skeletonTrue()
        window.scrollTo(0, 0)
        getMasteries(summonerInfo.id, region).then((res) => {
          setMastery(res.data)
          getRank(summonerInfo.id, region).then((res) => setRank(res.data))
          getMatchList(summonerInfo.accountId, region).then((res) => {
            res.data.matches
              ? setPlayerMatches(res.data.matches)
              : setPlayerMatches([])
          })
        })

        // Get live game data for summoner
        axios
          .get(`${url}/live/${summonerInfo.id}/${region}`, {
            cancelToken: source.token,
          })
          .then((res) => {
            setLive(res.data)
          })

        if (playerMatches.length >= 0 && mastery.length >= 0 && summonerInfo) {
          setTimeout(() => {
            skeletonFalse()
          }, 3000)
        }
      }
      setDisplay('overview')
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

        const liveRankArray = []
        live.participants.forEach(async (player) => {
          const res = await getRank(player.summonerId, region)

          liveRankArray.push(res.data)

          if (liveRankArray.length === 10) {
            setLiveRank(liveRankArray)
          }
        })
      }
      return () => {
        clearTimeout(time)
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
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
            const id = champion.id

            // Create our own object containing neccessary data to push to champObject
            const object = {
              name,
              id,
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
            <div className={style.emblemContainer}>
              {!loading ? (
                <div className={style.nameLive}>
                  <SummonerCard version={version} summonerInfo={summonerInfo} />
                  {live && (
                    <div className={`${style.inGame}`}>
                      <div className={style.circlePulse} />
                      In Game
                    </div>
                  )}
                </div>
              ) : (
                <div className={style.nameLiveSkeleton}>
                  <Skeleton circle={true} width={115} height={115} />
                  <Skeleton
                    style={{ marginLeft: '25px' }}
                    width={250}
                    height={55}
                  />
                  {
                    <Skeleton
                      width={110}
                      height={33}
                      className={`${style.inGameSkeleton} `}
                    />
                  }
                </div>
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
                      src={
                        process.env.PUBLIC_URL + `/images/icons/rectangle.png`
                      }
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      margin: '25px 0px 25px 0px',
                    }}
                  >
                    <div>
                      <Skeleton
                        style={{ marginLeft: '10px' }}
                        circle={true}
                        width={75}
                        height={75}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        marginLeft: '10px',
                        flexDirection: 'column',
                      }}
                    >
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={40}
                        height={20}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={180}
                        height={35}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={40}
                        height={25}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={130}
                        height={25}
                      />
                    </div>

                    <div>
                      <Skeleton
                        className={style.skeletonRectangle}
                        width={15}
                        height={15}
                      />
                    </div>

                    <div>
                      <Skeleton circle={true} width={75} height={75} />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        marginLeft: '10px',
                        flexDirection: 'column',
                      }}
                    >
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={40}
                        height={20}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={180}
                        height={35}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={40}
                        height={25}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={130}
                        height={25}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={style.row2}>
            <div className={style.linksContainer}>
              {!loading ? (
                <span
                  onClick={() => setDisplay('overview')}
                  to='#'
                  className={
                    !loading && display === 'overview'
                      ? style.underline
                      : style.live
                  }
                >
                  Overview
                </span>
              ) : (
                <Skeleton
                  style={{ display: 'inlineBlock', marginLeft: '15px' }}
                  height={30}
                  width={74}
                />
              )}
              {!loading ? (
                <span
                  onClick={() => setDisplay('live')}
                  to='/live'
                  className={
                    !loading && display === 'live'
                      ? style.underline
                      : style.live
                  }
                >
                  Live Game
                </span>
              ) : (
                <Skeleton
                  style={{ display: 'inlineBlock', marginLeft: '15px' }}
                  height={30}
                  width={84}
                />
              )}
            </div>
          </div>
          <div className={style.row3}>
            {display === 'overview' &&
            playerMatches.length === 0 &&
            !loading ? (
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
                  <div className={style.notInGame}>
                    <div className={style.liveGameHeader}>
                      <MdLiveTv className={style.liveIcon} />
                      <span className={style.liveGame}>Live Game</span>
                    </div>

                    <div className={style.text}>Summoner Is Not In Game.</div>
                  </div>
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
                    region={region}
                    live={live}
                  />
                  <MasteryCard
                    version={version}
                    filteredChamps={filteredChamps}
                    champInfo={champInfo}
                    skeleton={loading}
                    selectChampion={selectChampion}
                  />
                </div>
                <div
                  className={
                    live === undefined && display === 'live'
                      ? style.notInGame
                      : style.none
                  }
                >
                  <div className={style.liveGameHeader}>
                    <MdLiveTv className={style.liveIcon} />
                    <span className={style.liveGame}>Live Game</span>
                  </div>

                  <div className={style.text}>Summoner Is Not In Game.</div>
                </div>
                <div
                  className={
                    live && display === 'live'
                      ? style.liveContainer
                      : style.none
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
)
