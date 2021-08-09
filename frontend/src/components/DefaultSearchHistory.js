import React from 'react'
import style from '../pages/home.module.css'

export default function DefaultSearchHistory({
  version,
  handleSubmit,
  inputEl,
}) {
  return (
    <div>
      <div
        onMouseDown={handleSubmit}
        value='mistahpig'
        region='NA1'
        icon='7'
        className={style.storageSummoner}>
        <div className={style.regionContainer}>
          <span className={style.region}>NA1</span>
        </div>

        <img
          alt='profile icon'
          className={style.profileIcon}
          // Grab profile icon
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/7.png`}
        />
        <span
          value='mistahpig'
          region='NA1'
          icon='7'
          className={style.summoner}>
          mistahpig
        </span>

        <div
          onMouseDown={() => inputEl.current.blur()}
          className={style.removeContainer}>
          <p className={style.remove}>x</p>
        </div>
      </div>
      <div
        onMouseDown={handleSubmit}
        value='DambitWes'
        region='NA1'
        icon='3466'
        className={style.storageSummoner}>
        <div className={style.regionContainer}>
          <span className={style.region}>NA1</span>
        </div>
        <img
          alt='profile icon'
          className={style.profileIcon}
          // Grab profile icon
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/3466.png`}
        />
        <span
          value='DambitWes'
          region='NA1'
          icon='3466'
          className={style.summoner}>
          DambitWes
        </span>

        <div
          onMouseDown={() => inputEl.current.blur()}
          className={style.removeContainer}>
          <p className={style.remove}>x</p>
        </div>
      </div>
    </div>
  )
}
