import React from 'react'
import style from '../pages/welcome.module.css'
import { MdLiveTv } from 'react-icons/md'

function NoMatchHistoryMasteryAndLive({ mastery, live, display }) {
  return (
    <>
      <div className={style.noMatchContainer}>
        <div className={style.matchHeader}>Match History</div>
        <div className={style.noMatches}>No Matches Were Found.</div>
      </div>
      <div className={style.masteryCard}>
        <div className={style.header}>
          <img
            alt='mastery icon'
            src='https://res.cloudinary.com/mistahpig/image/upload/v1621882123/league-stats/icons/mastery_yqwggf.png'
          />
          CHAMPION MASTERY
        </div>
        <div className={style.masteryHeader}>
          <div className={style.championHeader}>CHAMPION</div>
          <div className={style.levelHeader}>LEVEL</div>
          <div className={style.pointsHeader}>POINTS</div>
        </div>
        {mastery.length === 0 && (
          <div className={style.noChamps}>No Champions Found.</div>
        )}
      </div>
      {live === 'Not In Live Game' && display === 'live' && (
        <div className={style.notInGame}>
          <div className={style.liveGameHeader}>
            <MdLiveTv className={style.liveIcon} />
            <span className={style.liveGame}>Live Game</span>
          </div>
          <div className={style.text}>Summoner Is Not In Game.</div>
        </div>
      )}
    </>
  )
}

export default NoMatchHistoryMasteryAndLive
