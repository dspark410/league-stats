import React, { useState, useEffect } from 'react'
import style from './welcome.module.css'
import axios from 'axios'
import MasteryCard from '../components/MasteryCard'
import RankCard from '../components/RankCard'
import SummonerCard from '../components/SummonerCard'

function Welcome({ summonerInfo, champInfo }) {
  const [mastery, setMastery] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredChamps, setFilteredChamps] = useState([])
  const [session, setSession] = useState({})

  useEffect(() => {
    if (!summonerInfo.id) {
      console.log('Summoner info not in state')
      //Get Sessions data
      const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))
      setSession(sessionData)

      axios
        .get(`http://localhost:5000/masteries/${sessionData.id}`)
        .then((res) => {
          setMastery(res.data)
          setLoading(false)
        })
    } else {
      axios
        .get(`http://localhost:5000/masteries/${summonerInfo.id}`)
        .then((res) => {
          setMastery(res.data)
          setLoading(false)
        })
    }
  }, [summonerInfo.id])

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
      <div className={style.welcomeContainer}>
        <h1 className={style.summonerName}>
          WELCOME, {summonerInfo.name || session.name}
        </h1>
        <SummonerCard summonerInfo={summonerInfo} />
        <RankCard summonerInfo={summonerInfo} session={session} />
        <MasteryCard loading={loading} filteredChamps={filteredChamps} />
      </div>
    </div>
  )
}

export default Welcome
