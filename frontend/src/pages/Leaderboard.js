import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from './leaderboard.module.css'

function Leaderboard() {
  const [solo, setSolo] = useState([])
  const [flex, setFlex] = useState([])
  const [soloTier, setSoloTier] = useState([])
  const [flexTier, setFlexTier] = useState([])

  const url = process.env.REACT_APP_API_URL || ''

  useEffect(() => {
    axios.get(`${url}/leaderboard/solo`).then((res) => {
      setSolo(res.data.entries)
      setSoloTier(res.data.tier)
    })
    axios.get(`${url}/leaderboard/flex`).then((res) => {
      setFlex(res.data.entries)
      setFlexTier(res.data.tier)
    })
  }, [])

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Ranked Solo</th>
            <th>Ranked Flex</th>
          </tr>
          {solo
            .sort((a, b) => b.leaguePoints - a.leaguePoints)
            .map((summoner, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <div>{summoner.summonerName}</div>
                </td>
                <td>
                  <div>{soloTier}</div>
                  <div>LP: {summoner.leaguePoints}</div>
                  <div>
                    <span>Wins: {summoner.wins}</span>
                    <span>Losses: {summoner.losses}</span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
