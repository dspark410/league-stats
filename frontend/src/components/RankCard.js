import React from 'react'
import style from './rankcard.module.css'
import 'react-circular-progressbar/dist/styles.css'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'

function RankCard({ rank, queue }) {
  let color

  if (rank.tier === 'IRON') {
    color = '#483938'
  }
  if (rank.tier === 'BRONZE') {
    color = '#8d4d2e'
  }
  if (rank.tier === 'SILVER') {
    color = '#70868c'
  }
  if (rank.tier === 'GOLD') {
    color = '#f5d77d'
  }
  if (rank.tier === 'PLATINUM') {
    color = '#719795'
  }
  if (rank.tier === 'DIAMOND') {
    color = '#7398ce'
  }
  if (rank.tier === 'MASTER') {
    color = '#b09ed1'
  }
  if (rank.tier === 'GRANDMASTER') {
    color = '#ff8da5'
  }
  if (rank.tier === 'CHALLENGER') {
    color = '#79d5e9'
  }
  return (
    // Rank card to display players rank and points if available

    <div className={`${style.singleCardContainer}`}>
      <div style={{ width: '70px' }}>
        <CircularProgressbarWithChildren
          value={rank.leaguePoints}
          strokeWidth={6}
          styles={buildStyles({
            pathColor: color,
            trailColor: '#7a6b83',
          })}>
          <img
            alt={rank.tier}
            className={style.emblemImage}
            src={`https://res.cloudinary.com/mistahpig/image/upload/v1621898668/league-stats/emblems/${rank.tier}.png`}
          />
        </CircularProgressbarWithChildren>
      </div>
      <div className={style.emblemContainer}>
        <span className={style.queue}>{queue}</span>
        <span className={style.rank}>{`${rank.tier} ${rank.rank} `}</span>{' '}
        <span className={style.points}>{`${rank.leaguePoints} LP`} </span>
        <div className={style.ratio}>
          <span> W/L RECORD</span>
          <span className={style.win}>{rank.wins}</span>
          <span>-</span>
          <span className={style.loss}>{rank.losses}</span>
        </div>
      </div>
    </div>
  )
}

export default RankCard
