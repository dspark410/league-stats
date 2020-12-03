import React, { useState, useEffect } from 'react'
import style from './matchhistory.module.css'
import axios from 'axios'
function MatchHistoryCard({ summonerInfo }) {
  const [types, setTypes] = useState([])
  const [modes, setModes] = useState([])
  const [maps, setMaps] = useState([])
  const [playerMatches, setPlayerMatches] = useState([])
  const [matchDetails, setMatchDetails] = useState([])

  useEffect(() => {
    axios
      .get('http://static.developer.riotgames.com/docs/lol/gameTypes.json')
      .then((res) => setTypes(res.data))
    axios
      .get('http://static.developer.riotgames.com/docs/lol/gameModes.json')
      .then((res) => setModes(res.data))
    axios.get('http://localhost:5000/mapList').then((res) => setMaps(res.data))
  }, [])

  useEffect(() => {
    if (!summonerInfo.id) {
      console.log('Summoner info not in state, getting rank from session')
      const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))
      axios
        .get(`http://localhost:5000/matchList/${sessionData.accountId}`)
        .then((res) => {
          setPlayerMatches(res.data.matches)
        })
    } else {
      axios
        .get(`http://localhost:5000/matchList/${summonerInfo.accountId}`)
        .then((res) => setPlayerMatches(res.data.matches))
    }
  }, [summonerInfo])

  useEffect(() => {
    const matchArray = []
    playerMatches.slice(0, 5).forEach((match) => {
      axios
        .get(`http://localhost:5000/matchDetails/${match.gameId}`)
        .then((res) => matchArray.push(res.data))
    })
    setMatchDetails(matchArray)
  }, [playerMatches])

  return (
    <div className={style.matchContainer}>
      {matchDetails.map((match, i) => (
        <h1>hello</h1>
      ))}
    </div>
  )
}

// MATCH ID API
// https://na1.api.riotgames.com/lol/match/v4/matches/3630397822?api_key=RGAPI-f3372fe9-4a88-4d2f-917b-54974292c5f6

// MATCH TIMESLINES API
// https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/3630397822?api_key=RGAPI-f3372fe9-4a88-4d2f-917b-54974292c5f6
export default MatchHistoryCard
