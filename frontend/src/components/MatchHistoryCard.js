import React, { useState, useEffect } from 'react'
import style from './matchhistory.module.css'
import axios from 'axios'

// MATCH TIMESLINES API
// https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/3630397822?api_key=RGAPI-f3372fe9-4a88-4d2f-917b-54974292c5f6

function MatchHistoryCard({ matchDetails }) {
  // const [types, setTypes] = useState([])
  // const [modes, setModes] = useState([])
  const [maps, setMaps] = useState([])
  const [queues, setQueues] = useState([])
  const [mapArray, setMapArray] = useState([])

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
    axios.get('http://localhost:5000/mapList').then((res) => setMaps(res.data))
  }, [])

  useEffect(() => {
    const matchMapArr = []
    matchDetails.forEach((match) => {
      maps.forEach((map) => {
        if (match.mapId === map.mapId) {
          matchMapArr.push(map.mapName)
          setMapArray(matchMapArr)
        }
      })
    })
  }, [matchDetails])

  return (
    <div className={style.matchContainer}>
      {matchDetails.map((match, i) => (
        <h1 key={i}>{match.mapId}</h1>
      ))}
    </div>
  )
}

export default MatchHistoryCard
