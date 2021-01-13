import React from 'react'
import style from './unrankedcard.module.css'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function UnrankedCard() {
  return (
    // Rank card to display players rank and points if available

    <div className={style.singleCardContainer}>
      <div className={style.emblemContainer}>
        <div style={{ width: '55px' }}>
          <CircularProgressbarWithChildren
            value='100'
            strokeWidth={4}
            styles={buildStyles({
              pathColor: 'transparent',
              trailColor: '#736485',
            })}
          >
            <img
              alt='Unranked'
              className={style.emblemImage}
              src={process.env.PUBLIC_URL + `/images/emblems/UNRANKED.png`}
            />
          </CircularProgressbarWithChildren>
        </div>
        <span className={style.rank}>UNRANKED</span>
        <span className={style.points}>{`0 LP`} </span>
      </div>
      <div className={style.rankInfoContainer}>
        <select className={style.queue}>
          <option className={style.option}>SOLO/DUO</option>

          {/* {rank.queueType.split('_').slice(1, 2).join(' ')}/DUO */}
        </select>

        <div className={style.ratio}>
          <span>RECORD</span>
          <span className={style.win}>0</span>
          <span>-</span>
          <span className={style.loss}>0</span>
        </div>
      </div>
    </div>
  )
}

export default UnrankedCard
