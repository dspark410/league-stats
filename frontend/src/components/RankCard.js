import React from 'react'
import style from './rankcard.module.css'

function RankCard({ rank }) {
  return (
    // Rank card to display players rank and points if available
    <div className={style.singleCardContainer}>
      <div className={style.emblemContainer}>
        <img
          alt={rank.tier}
          className={style.emblemImage}
          src={process.env.PUBLIC_URL + `/images/emblems/${rank.tier}.png`}
        />
        <span className={style.rank}>{`${rank.tier} ${rank.rank} `}</span>{' '}
        <span className={style.points}>{`${rank.leaguePoints} LP`} </span>
      </div>

      <div className={style.rankInfoContainer}>
        <select className={style.queue}>
          <option className={style.option}>
            {rank.queueType.split('_').slice(1, 2).join(' ')}/DUO
          </option>
        </select>

        <div className={style.ratio}>
          <span>RECORD</span>
          <span className={style.win}>{rank.wins}</span>
          <span>-</span>
          <span className={style.loss}>{rank.losses}</span>
        </div>
      </div>
    </div>
  )
}

export default RankCard
