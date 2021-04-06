import React, { useState, useEffect } from 'react'
import style from './historycard.module.css'
import HistoryCardComplex from './HistoryCardComplex'
import HistoryCardSimple from './HistoryCardSimple'
import { CSSTransition } from 'react-transition-group'

function HistoryCard({
  game,
  spells,
  runes,
  summonerInfo,
  getPlayerName,
  live,
  summInfo,
}) {
  const [open, setOpen] = useState(false)

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
      }}
    >
      <div className={`${style.fadeIn}`}>
        <HistoryCardSimple
          open={open}
          game={game}
          clickArrow={clickArrow}
          summInfo={summInfo}
        />

        <HistoryCardComplex
          open={open}
          game={game}
          spells={spells}
          runes={runes}
          summonerInfo={summonerInfo}
          getPlayerName={getPlayerName}
          clickArrow={clickArrow}
          summInfo={summInfo}
        />
      </div>
    </CSSTransition>
  )
}

export default HistoryCard
