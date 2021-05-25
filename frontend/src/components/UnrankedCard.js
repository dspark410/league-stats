import React from 'react'
import style from './unrankedcard.module.css'
import 'react-circular-progressbar/dist/styles.css'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'

function UnrankedCard({ queue }) {
  return (
    // Rank card to display players rank and points if available

    <div className={`${style.singleCardContainer}`}>
      <div style={{ width: '70px' }}>
        <CircularProgressbarWithChildren
          value='100'
          strokeWidth={6}
          styles={buildStyles({
            pathColor: 'transparent',
            trailColor: '#917C9E',
          })}>
          <img
            alt='Unranked'
            className={style.emblemImage}
            src='https://res.cloudinary.com/mistahpig/image/upload/v1621898668/league-stats/emblems/UNRANKED.png'
          />
        </CircularProgressbarWithChildren>
      </div>
      <div className={style.emblemContainer}>
        <span className={style.queue}>{queue}</span>
        <span className={style.rank}>UNRANKED</span>
        <span className={style.points}>{`0 LP`} </span>
        <div className={style.ratio}>
          <span> W/L RECORD</span>
          <span className={style.win}>0</span>
          <span>-</span>
          <span className={style.loss}>0</span>
        </div>
      </div>
    </div>
  )
}

export default UnrankedCard
