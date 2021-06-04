import React from 'react'
import style from './live.module.css'
import { useSelector } from 'react-redux'

import LiveTeam from './LiveTeam'

function Live({ time }) {
  const {
    summoner: {
      data: { live },
    },
  } = useSelector((state) => state)

  return (
    live &&
    live.rankArray && (
      <div className={`${style.liveWidthContainer}`}>
        <div className={style.liveContainer}>
          <div className={style.timerQueueContainer}>
            <div className={style.timerQueueContainerBorder}>
              <div className={style.queue}>{live.queueName}</div>
              <span>-</span>
              <div className={style.timer}>{`${Math.floor(
                time / 60
              )}m ${Math.ceil(time % 60)}s `}</div>
            </div>
          </div>
        </div>

        <LiveTeam team={'ally'} id={100} />
        <LiveTeam team={'enemy'} id={200} />
      </div>
    )
  )
}

export default Live
