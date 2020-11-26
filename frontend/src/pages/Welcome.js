import React, { useState, useEffect } from 'react'
import style from './welcome.module.css'
import axios from 'axios'
import MasteryCard from '../components/MasteryCard'

function Welcome({ summonerInfo }) {
  const [mastery, setMastery] = useState([])
  const [champions, setChampions] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!summonerInfo.id) {
      console.log('Summoner info not in state')
    } else {
      axios
        .get(`http://localhost:5000/summoner/${summonerInfo.id}`)
        .then((res) => {
          setMastery(res.data)
          setLoading(false)
          console.log(res.data)
        })
    }
  }, [summonerInfo.id])

  useEffect(() => {
    axios
      .get(
        'http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion.json'
      )
      .then((res) => {
        setChampions(res.data.data)
      })
  }, [])

  return (
    <div className={style.welcomeBackgroundContainer}>
      <div className={style.welcomeContainer}>
        <div>
          <h1>Welcome {summonerInfo.name}</h1>
        </div>
        <MasteryCard
          mastery={mastery}
          champions={champions}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default Welcome
