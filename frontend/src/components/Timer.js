import React, { useState, useEffect } from 'react'
import style from './timer.module.css'

function Timer({ length }) {
  const [time, setTime] = useState()

  useEffect(() => {
    if (typeof length === 'number') {
      setTime(length)
      setInterval(() => {
        setTime((seconds) => seconds + 1)
      }, 1000)
    }
  }, [length])

  return (
    <div className={style.timer}>{`${Math.floor(time / 60)}m ${Math.ceil(
      time % 60
    )}s `}</div>
  )
}

export default Timer
