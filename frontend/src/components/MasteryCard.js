import React from 'react'
import style from './masterycard.module.css'

function MasteryCard({ masteryChamp, version }) {
  return (
    <div className={style.masteryCard}>
      <img
        className={style.championImage}
        alt={masteryChamp.image}
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${masteryChamp.image}`}
      />

      <img
        className={style.masteryFrame}
        alt={'mastery level border'}
        src={
          masteryChamp.level
            ? process.env.PUBLIC_URL + `/images/level${masteryChamp.level}.png`
            : process.env.PUBLIC_URL + '/images/level0.png'
        }
      />
      {/* 
      <div className={style.name}>
        <img
          src={process.env.PUBLIC_URL + '/images/champion.png'}
          alt='champion icon'
        />
        <span>{masteryChamp.name}</span>
      </div>
      <div className={style.points}>
        <img
          src={process.env.PUBLIC_URL + '/images/mastery.png'}
          alt='mastery icon'
        />
        <span>{masteryChamp.points.toLocaleString('en')} pts</span>
      </div>
      <div className={style.level}>
        <img
          src={process.env.PUBLIC_URL + '/images/level.png'}
          alt='mastery icon'
        />
        <span>Mastery lvl {masteryChamp.level}</span>
      </div> */}
    </div>
  )
}

export default MasteryCard
