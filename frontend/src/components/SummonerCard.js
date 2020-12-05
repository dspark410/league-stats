import React, { useState, useEffect } from 'react'
import style from './summonercard.module.css'

function SummonerCard({ summonerInfo, version }) {
  const [session, setSession] = useState({})
  const [level, setLevel] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!summonerInfo.id) {
      //Get Sessions data
      const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))
      setSession(sessionData)
      setLevel(sessionData.summonerLevel)
      setLoading(false)
    } else {
      setLevel(summonerInfo.summonerLevel)
      setLoading(false)
    }
  }, [summonerInfo])

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
                level < 30
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl1.png`
                  : level >= 30 && level < 50
                  ? process.env.PUBLIC_URL + `/images/summonerborder/lvl30.png`
                  : level <= 500
                  ? process.env.PUBLIC_URL +
                    `/images/summonerborder/lvl${
                      Math.floor(level / 25) * 25
                    }.png`
                  : ''
              }
            />
            <img
              alt='profile icon'
              className={style.profileIcon}
              src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${
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
