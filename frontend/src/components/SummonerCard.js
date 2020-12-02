import React, { useState, useEffect } from 'react'
import style from './summonercard.module.css'
import axios from 'axios'

function SummonerCard({ summonerInfo }) {
  const [session, setSession] = useState({})
  const [level, setLevel] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!summonerInfo.id) {
      console.log('Summoner info not in state')

      //Get Sessions data
      const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))
      setSession(sessionData)

      axios
        .get(`http://localhost:5000/getSummonerName/${sessionData.name}`)
        .then((res) => {
          setLevel(res.data)
          setLoading(false)
        })
    } else {
      axios
        .get(`http://localhost:5000/getSummonerName/${summonerInfo.name}`)
        .then((res) => {
          setLevel(res.data)
          setLoading(false)
        })
    }
  }, [summonerInfo.id, summonerInfo.name])

  return (
    <>
      {loading ? (
        ''
      ) : (
        <div className={style.container}>
          <div className={style.summonerCardContainer}>
            <img
              alt='summoner border'
              className={style.summonerBorder}
              src={
                level.summonerLevel < 30
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl1.png`
                  : level.summonerLevel >= 30 && level.summonerLevel < 50
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl30.png`
                  : level.summonerLevel >= 50 && level.summonerLevel < 75
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl50.png`
                  : level.summonerLevel >= 75 && level.summonerLevel < 100
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl75.png`
                  : level.summonerLevel >= 100 && level.summonerLevel < 125
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl100.png`
                  : level.summonerLevel >= 125 && level.summonerLevel < 150
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl125.png`
                  : level.summonerLevel >= 150 && level.summonerLevel < 175
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl150.png`
                  : level.summonerLevel >= 175 && level.summonerLevel < 200
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl175.png`
                  : level.summonerLevel >= 200 && level.summonerLevel < 225
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl200.png`
                  : level.summonerLevel >= 225 && level.summonerLevel < 250
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl225.png`
                  : level.summonerLevel >= 250 && level.summonerLevel < 275
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl250.png`
                  : level.summonerLevel >= 275 && level.summonerLevel < 300
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl275.png`
                  : level.summonerLevel >= 300 && level.summonerLevel < 325
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl300.png`
                  : level.summonerLevel >= 325 && level.summonerLevel < 350
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl325.png`
                  : level.summonerLevel >= 350 && level.summonerLevel < 375
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl350.png`
                  : level.summonerLevel >= 375 && level.summonerLevel < 400
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl375.png`
                  : level.summonerLevel >= 400 && level.summonerLevel < 425
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl400.png`
                  : level.summonerLevel >= 425 && level.summonerLevel < 450
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl425.png`
                  : level.summonerLevel >= 450 && level.summonerLevel < 475
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl450.png`
                  : level.summonerLevel >= 475 && level.summonerLevel < 500
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl475.png`
                  : process.env.PUBLIC_URL + `/images/summonerborder/lvl500.png`
              }
            />
            <img
              alt='profile icon'
              className={style.profileIcon}
              src={`http://ddragon.leagueoflegends.com/cdn/10.24.1/img/profileicon/${
                summonerInfo.profileIconId || session.profileIconId
              }.png`}
            />
            <p className={style.summonerLevel}>
              {summonerInfo.summonerLevel || session.summonerLevel}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default SummonerCard
