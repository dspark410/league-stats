import React, { useState, useEffect } from 'react'
import style from './welcome.module.css'
import axios from 'axios'
import MasteryCard from '../components/MasteryCard'

function Welcome({ summonerInfo, champInfo }) {
  const [mastery, setMastery] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredChamps, setFilteredChamps] = useState([])
  const [session, setSession] = useState({})

  useEffect(() => {
    if (!summonerInfo.id) {
      console.log('Summoner info not in state')
    } else {
      axios
        .get(`http://localhost:5000/masteries/${summonerInfo.id}`)
        .then((res) => {
          setMastery(res.data)
          setLoading(false)
          console.log(res.data)
        })
    }
  }, [summonerInfo.id])

  useEffect(() => {
    const championInfoArray = []
    mastery.forEach((champ) => {
      championInfoArray.push(champ.championId)
    })

    const masteryChamp = champInfo.filter((champ) => {
      if (championInfoArray.indexOf(Number(champ.key)) >= 0) {
        return true
      } else {
        return false
      }
    })
    setFilteredChamps(masteryChamp)

    //Get Sessions data
    const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))
    setSession(sessionData)
  }, [mastery])

  return (
    <div className={style.welcomeBackgroundContainer}>
      <div className={style.welcomeContainer}>
        <div>
          <h1>Welcome {summonerInfo.name || session.name}</h1>
        </div>
        <div>{loading ? '' : mastery[0].championPoints}</div>
        <div>{loading ? '' : mastery[1].championPoints}</div>
        <div>{loading ? '' : mastery[2].championPoints}</div>
        <pre>{JSON.stringify(filteredChamps, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Welcome
