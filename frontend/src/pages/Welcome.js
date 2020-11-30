import React, { useState, useEffect } from 'react'
import style from './welcome.module.css'
import axios from 'axios'
import MasteryCard from '../components/MasteryCard'

function Welcome({ summonerInfo, champInfo }) {
  const [mastery, setMastery] = useState([])
  const [rank, setRank] = useState([])
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
    if (!summonerInfo.id) {
      console.log('Summoner info not in state')
      //Get Sessions data
      const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))
      setSession(sessionData)
      axios.get(`http://localhost:5000/rank/${sessionData.id}`).then((res) => {
        setRank(res)
        console.log('rankinfo', res)
        setLoading(false)
      })
    } else {
      axios.get(`http://localhost:5000/rank/${summonerInfo.id}`).then((res) => {
        setRank(res.data)
        console.log('rankinfo', res)
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
        <div>
          <h1>Welcome {summonerInfo.name || session.name}</h1>
        </div>
        <MasteryCard loading={loading} filteredChamps={filteredChamps} />
      </div>
    </div>
  )
}

export default Welcome
