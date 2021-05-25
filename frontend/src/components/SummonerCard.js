import React, { useState, useEffect } from 'react'
import style from './summonercard.module.css'
import { useSelector } from 'react-redux'

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
              ? 'https://res.cloudinary.com/mistahpig/image/upload/v1621882189/league-stats/borders/lvl1.png'
              : level >= 30 && level < 50
              ? 'https://res.cloudinary.com/mistahpig/image/upload/v1621882189/league-stats/borders/lvl30.png'
              : level <= 500
              ? `https://res.cloudinary.com/mistahpig/image/upload/v1621882189/league-stats/borders/lvl${
                  Math.floor(level / 25) * 25
                }.png`
              : 'https://res.cloudinary.com/mistahpig/image/upload/v1621882189/league-stats/borders/lvl500.png'
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
