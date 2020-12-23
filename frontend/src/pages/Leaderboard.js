import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from './leaderboard.module.css'

function Leaderboard({ version }) {
  const [solo, setSolo] = useState([])
  // const [flex, setFlex] = useState([])
  const [soloTier, setSoloTier] = useState([])
  // const [flexTier, setFlexTier] = useState([])
  const [summonerName, setSummonerName] = useState([])
  const [loader, setLoader] = useState(true)

  const url = process.env.REACT_APP_API_URL || ''

  useEffect(() => {
    axios.get(`${url}/leaderboard/solo`).then((res) => {
      setSolo(res.data.entries.slice(0, 2))
      setSoloTier(res.data.tier)
    })
    // axios.get(`${url}/leaderboard/flex`).then((res) => {
    //   setFlex(res.data.entries)
    //   setFlexTier(res.data.tier)
    // })
  }, [])

  useEffect(() => {
    const awaitme = async () => {
      solo.forEach(async (summoner) => {
        await axios
          .get(`${url}/getSummonerId/${summoner.summonerId}`)
          .then((res) => {
            summoner.icon = res.data
          })
      })
    }
    awaitme().then(() => setLoader(false))
  }, [solo])

  return (
    <table className={style.tableContainer}>
      <tbody className={style.tbody}>
        <tr className={style.row}>
          <th className={style.td}>#</th>
          <th className={style.td}>Summoners</th>
          <th className={style.td}>Tier</th>
          <th className={style.td}>LP</th>
          <th className={`${style.tdWinRatio} ${style.winRatioHeader}`}>
            Win Ratio
          </th>
        </tr>
        {loader
          ? ''
          : solo
              .sort((a, b) => b.leaguePoints - a.leaguePoints)
              .map((summoner, i) => (
                <tr className={style.row} key={i}>
                  <td className={style.td}>{i + 1}</td>
                  <td className={style.td}>
                    <img
                      alt='profile icon'
                      className={style.profileIcon}
                      // Grab profile icon
                      src={
                        `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.icon.profileIconId}.png` ||
                        process.env.PUBLIC_URL + '/images/emptyitem.png'
                      }
                    />
                    {summoner.summonerName}
                  </td>
                  <td className={style.td}>{soloTier}</td>
                  <td className={style.td}>{summoner.leaguePoints}</td>
                  <td className={`${style.tdWinRatio}`}>
                    <div className={style.winRatio}>
                      <span>{summoner.wins}/</span>
                      <span>{summoner.losses}</span>
                      <span>
                        {(
                          (summoner.wins / (summoner.wins + summoner.losses)) *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
      </tbody>
    </table>
  )
}

export default Leaderboard
