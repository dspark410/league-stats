import React from 'react'
import style from '../pages/home.module.css'

export default function PreviousSearchHistory({
  handleSubmit,
  removeSearchedSummoner,
  summoner,
  version,
  nav,
}) {
  return (
    <div className={style.storageSummoner}>
      <div
        className={style.topLayer}
        onMouseDown={handleSubmit}
        value={summoner[0]}
        region={summoner[1]}
        icon={summoner[2]}
      />
      <div className={style.regionContainer}>
        <span className={style.region}>{summoner[1]}</span>
      </div>

      <img
        alt='profile icon'
        className={style.profileIcon}
        // Grab profile icon
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner[2]}.png`}
      />
      <span className={nav ? style.summonerNav : style.summoner}>
        {summoner[0]}
      </span>

      <div
        onMouseDown={removeSearchedSummoner}
        value={summoner[0]}
        region={summoner[1]}
        icon={summoner[2]}
        className={style.removeContainer}>
        <div
          onMouseDown={removeSearchedSummoner}
          value={summoner[0]}
          region={summoner[1]}
          icon={summoner[2]}
          className={style.remove}>
          x
        </div>
      </div>
    </div>
  )
}
