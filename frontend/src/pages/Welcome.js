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
    let timer

    if (playerMatches.length > 0 && mastery.length > 0) {
      timer = setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
    return () => {
      setLoading(true)
      clearTimeout(timer)
    }
  }, [playerMatches, rank, mastery])

  useEffect(() => {
    // Show nav on the welcome screen
    showNav()

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
    }

    redirect()
    // Dependency, rerenders when summonerInfo.id is ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summonerInfo])

  useEffect(() => {
    if (live && typeof live.gameLength === 'number') {
      setTime(live.gameLength < 0 ? live.gameLength * -1 : live.gameLength)
      setInterval(() => {
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
    <>
      <div className={style.rowContainer}>
        <div className={style.row1}>
          {/* <SkeletonTheme
            className={style.skeleton}
            duration={2}
            color='#7a6b83'
            highlightColor='#e2c0f7'
          >
            <div className={style.skeletonContainer}>
              <Skeleton
                height={50}
                width={400}
                style={{ marginBottom: '15px' }}
              />
              <div className={style.skeletonInnerContainer}>
                <Skeleton circle={true} height={100} width={100} />
                <div style={{ marginLeft: '25px' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <Skeleton circle={true} height={50} width={50} />
                    <Skeleton
                      style={{ marginLeft: '15px' }}
                      height={50}
                      width={200}
                    />
                  </div>
                  <div>
                    <Skeleton height={40} width={125} />
                    <Skeleton
                      style={{ marginLeft: '15px' }}
                      height={40}
                      width={125}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SkeletonTheme> */}
          <div className={style.summonerNameContainer}>
            <h1 className={style.summonerName}>
              {!loading ? (
                summonerInfo.name || session.name
              ) : (
                <SkeletonTheme
                  className={style.skeleton}
                  duration={2}
                  color='#7a6b83'
                  highlightColor='#e2c0f7'
                >
                  <Skeleton
                    height={50}
                    width={400}
                    style={{ marginBottom: '15px' }}
                  />
                </SkeletonTheme>
              )}
            </h1>

            {!loading && live ? (
              <div className={style.inGame}>
                <div className={style.circlePulse} />
                In Game
              </div>
            ) : (
              <SkeletonTheme
                className={`${style.skeletonLive} ${style.inGame} `}
                duration={2}
                color='#7a6b83'
                highlightColor='#e2c0f7'
              >
                <Skeleton height={50} width={114} />
              </SkeletonTheme>
            )}
          </div>
          <div className={style.emblemContainer}>
            <SummonerCard version={version} summonerInfo={summonerInfo} />
            <div className={style.rankCardContainer}>
              {!rank.length ? <UnrankedCard /> : <RankCard rank={rank} />}
            </div>
          </div>
        </div>

        <div className={style.row2}>
          <div className={style.linksContainer}>
            <span
              onClick={() => setDisplay('overview')}
              to='#'
              className={display === 'overview' ? style.underline : style.live}
            >
              Overview
            </span>
            <span
              onClick={() => setDisplay('live')}
              to='/live'
              className={display === 'live' ? style.underline : style.live}
            >
              Live Game
            </span>
          </div>
        </div>
        <div className={style.row3}>
          {display === 'overview' && playerMatches.length === 0 ? (
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
          ) : display === 'overview' ? (
            <>
              <MatchHistoryCard
                version={version}
                summonerInfo={summonerInfo}
                champInfo={champInfo}
                getPlayerName={getPlayerName}
                queues={queues}
                playerMatches={playerMatches}
              />
              <MasteryCard
                version={version}
                filteredChamps={filteredChamps}
                champInfo={champInfo}
              />
            </>
          ) : live === undefined ? (
            <div className={style.notInGame}>Summoner Is Not In Game.</div>
          ) : (
            display === 'live' && (
              <Live
                live={live}
                champInfo={champInfo}
                version={version}
                queues={queues}
                time={time}
                liveRank={liveRank}
              />
            )
          )}
        </div>
      </div>
    </>
  )
}

export default Welcome
