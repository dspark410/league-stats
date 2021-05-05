/** @format */

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import style from './summonercard.module.css'

function SummonerCard({ version }) {
  const [level, setLevel] = useState(0)

  const {
    summoner: {
      data: { summonerInfo },
    },
  } = useSelector((state) => state)

  useEffect(() => {
    if (summonerInfo.id) {
      setLevel(summonerInfo.summonerLevel)
    }
  }, [summonerInfo, version])

  return version ? (
    <div className={`${style.container}`}>
      <div className={style.summonerCardContainer}>
        <img
          alt='summoner border'
          className={style.summonerBorder}
          src={
            // Ternary to grab correct border depending on Summoner Level
            level < 30
              ? process.env.PUBLIC_URL + `/images/summonerborder/lvl1.png`
              : level >= 30 && level < 50
              ? process.env.PUBLIC_URL + `/images/summonerborder/lvl30.png`
              : level <= 500
              ? process.env.PUBLIC_URL +
                `/images/summonerborder/lvl${Math.floor(level / 25) * 25}.png`
              : process.env.PUBLIC_URL + `/images/summonerborder/lvl${500}.png`
          }
        />
        <img
          alt='profile icon'
          className={style.profileIcon}
          // Grab profile icon
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summonerInfo.profileIconId}.png`}
        />
        <p className={style.summonerLevel}>{summonerInfo.summonerLevel}</p>
      </div>
      <h1 className={style.summonerName}>{summonerInfo.name}</h1>
    </div>
  ) : (
    ''
  )
}

export default SummonerCard
