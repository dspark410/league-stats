import React, { useState, useEffect } from 'react'
import style from './welcome.module.css'
import axios from 'axios'
import MasteryCard from '../components/MasteryCard'
import RankCard from '../components/RankCard'
import UnrankedCard from '../components/UnrankedCard'
import SummonerCard from '../components/SummonerCard'
import MatchHistoryCard from '../components/MatchHistoryCard'

function Welcome({ summonerInfo, champInfo }) {
  const [mastery, setMastery] = useState([])
  const [rank, setRank] = useState([])
  const [filteredChamps, setFilteredChamps] = useState([])
  const [session, setSession] = useState({})

  useEffect(() => {
    if (!summonerInfo.id) {
      console.log('Summoner info not in state')
      const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))
      setSession(sessionData)

      axios
        .get(`http://localhost:5000/masteries/${sessionData.id}`)
        .then((res) => {
          setMastery(res.data)
        })
    } else {
      console.log('Summoner info IS in state')
      axios
        .get(`http://localhost:5000/masteries/${summonerInfo.id}`)
        .then((res) => {
          setMastery(res.data)
        })
    }
  }, [summonerInfo.id])

  useEffect(() => {
    if (!summonerInfo.id) {
      console.log('Summoner info not in state, getting rank from session')
      const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))
      axios.get(`http://localhost:5000/rank/${sessionData.id}`).then((res) => {
        setRank(res.data)
      })
    } else {
      console.log('Summoner info IS in state, getting rank from state')
      axios.get(`http://localhost:5000/rank/${summonerInfo.id}`).then((res) => {
        setRank(res.data)
      })
    }
  }, [summonerInfo.id, session])

  useEffect(() => {
    const champObject = []
    mastery.forEach((champ) => {
      champInfo.forEach((champion) => {
        if (champ.championId === +champion.key) {
          const name = champion.name
          const key = champ.championId
          const image = champion.image
          const level = champ.championLevel
          const points = champ.championPoints

          const object = {
            name,
            key,
            image,
            level,
            points,
          }
          champObject.push(object)
        }
      })
    })
    setFilteredChamps(champObject)
  }, [mastery, champInfo])

  return (
    <div className={style.welcomeBackgroundContainer}>
      <h1 className={style.summonerName}>
        Welcome, {summonerInfo.name || session.name}
      </h1>
      <SummonerCard summonerInfo={summonerInfo} />
      <div className={style.welcomeContainer}>
        <div className={style.appLeft}>
          <MatchHistoryCard summonerInfo={summonerInfo} session={session} />
        </div>
        <div className={style.appRight}>
          <div className={style.rankCardContainer}>
            {!rank.length ? (
              <>
                <UnrankedCard queueType='RANKED_FLEX_SR' />
                <UnrankedCard queueType='RANKED_SOLO_5x5' />
              </>
            ) : rank.length < 2 && rank[0].queueType === 'RANKED_SOLO_5x5' ? (
              <>
                <RankCard rank={rank[0]} />
                <UnrankedCard queueType={'RANKED_FLEX_SR'} />
              </>
            ) : rank.length < 2 && rank[0].queueType === 'RANKED_FLEX_SR' ? (
              <>
                <RankCard rank={rank[0]} />
                <UnrankedCard queueType={'RANKED_SOLO_5x5'} />
              </>
            ) : (
              rank.map((ranking, i) => <RankCard key={i} rank={ranking} />)
            )}
          </div>
          <div className={style.masteryCardContainer}>
            {filteredChamps.length < 3
              ? filteredChamps.map((champ, i) => {
                  return <MasteryCard key={i} masteryChamp={champ} />
                })
              : filteredChamps.slice(0, 3).map((champ, i) => {
                  return <MasteryCard key={i} masteryChamp={champ} />
                })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
