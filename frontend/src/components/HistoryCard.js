import React, { useState, useEffect } from 'react'
import style from './historycard.module.css'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import HistoryCardComplex from './HistoryCardComplex'
import HistoryCardSimple from './HistoryCardSimple'

function HistoryCard({ game }) {
  const [open, setOpen] = useState(false)

  const {
    summoner: {
      data: { live },
    },
  } = useSelector((state) => state)

  useEffect(() => {
    setOpen(false)
  }, [game, live])

  const clickArrow = () => {
    setOpen((prev) => !prev)
  }

  return (
    <CSSTransition
      in={open}
      timeout={300}
      classNames={{
        enter: style.enter,
        enterActive: style.enterActive,
        enterDone: style.enterDone,
        exit: style.exit,
        exitActive: style.exitActive,
        exitDone: style.exitDone,
      }}>
      <div className={`${style.fadeIn}`}>
        <HistoryCardSimple open={open} game={game} clickArrow={clickArrow} />

        <HistoryCardComplex open={open} game={game} clickArrow={clickArrow} />
      </div>
    </CSSTransition>
  )
}

export default HistoryCard
