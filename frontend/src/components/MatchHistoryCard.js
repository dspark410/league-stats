import React, { useState, useEffect } from 'react'
import style from './matchhistory.module.css'
import axios from 'axios'

// MATCH TIMESLINES API
// https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/3630397822?api_key=RGAPI-f3372fe9-4a88-4d2f-917b-54974292c5f6

function MatchHistoryCard({ matchDetails, summonerInfo }) {
  // const [types, setTypes] = useState([])
  // const [modes, setModes] = useState([])
  //const [maps, setMaps] = useState([])
  const [queues, setQueues] = useState([])
  const [gameDetails, setGameDetails] = useState([])

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
    // axios.get('http://localhost:5000/mapList').then((res) => setMaps(res.data))
  }, [])

  const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))

  useEffect(() => {
    const gameDetailsArr = []
    matchDetails.forEach((match) => {
      let matchObj
      let participantObj
      queues.forEach((queue) => {
        if (match.queueId === queue.queueId) {
          matchObj = {
            map: queue.map,
            gameType: queue.description,
          }
        }
      })
      match.participantIdentities.forEach((id) => {
        if (
          id.player.accountId === summonerInfo.accountId ||
          id.player.accountId === sessionData.accountId
        ) {
          participantObj = id.participantId
          matchObj.participantId = participantObj
        }
      })

      match.participants.forEach((data) => {
        if (data.participantId === participantObj) {
          const playerStats = data
          matchObj.playerInfo = playerStats
          gameDetailsArr.push(matchObj)
        }
      })
    })
    setGameDetails(gameDetailsArr)
  }, [matchDetails])

  return <div className={style.matchContainer}></div>
}

export default MatchHistoryCard
