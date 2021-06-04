import React from 'react'
import style from '../pages/welcome.module.css'
import { MdLiveTv } from 'react-icons/md'
import MasteryCard from '../components/MasteryCard'
import MatchHistoryCard from '../components/MatchHistoryCard'
import Live from '../components/Live'

function MatchHistoryMasteryandLive({ version, display, time, live }) {
  return (
    <div>
      <div className={display === 'overview' ? style.row3 : style.none}>
        <MatchHistoryCard />
        <MasteryCard version={version} />
      </div>
      <div
        className={
          live === 'Not In Live Game' && display === 'live'
            ? style.notInGame
            : style.none
        }>
        <div className={style.liveGameHeader}>
          <MdLiveTv className={style.liveIcon} />
          <span className={style.liveGame}>Live Game</span>
        </div>
        <div className={style.text}>Summoner Is Not In Game.</div>
      </div>
      <div
        className={
          live && display === 'live' ? style.liveContainer : style.none
        }>
        {live !== 'Not In Live Game' && <Live time={time} />}
      </div>
    </div>
  )
}

export default MatchHistoryMasteryandLive
