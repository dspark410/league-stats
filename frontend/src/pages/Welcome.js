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
  const [filteredChamps, setFilteredChamps] = useState([])
  const [session, setSession] = useState({})
  const [playerMatches, setPlayerMatches] = useState([])
  const [display, setDisplay] = useState('overview')
  const [live, setLive] = useState()
  const [length, setLength] = useState(0)

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
      axios
        .get(`${url}/live/${summonerInfo.id}`)
        .then((res) => setLive(res.data))
    }

    redirect()
    // Dependency, rerenders when summonerInfo.id is ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summonerInfo])

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
          <div className={style.summonerNameContainer}>
            <h1 className={style.summonerName}>
              {summonerInfo.name || session.name}
            </h1>
            {live ? <div className={style.inGame}>In Game</div> : ''}
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
          {playerMatches.length === 0 ? (
            <div className={style.noMatchContainer}>
              <div className={style.matchHeader}>Match History</div>
              <div className={style.noMatches}>No Matches Were Found.</div>
            </div>
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
                length={
                  live.gameLength < 0 ? live.gameLength * -1 : live.gameLength
                }
              />
            )
          )}
        </div>
      </div>
    </>
  )
}

export default Welcome
