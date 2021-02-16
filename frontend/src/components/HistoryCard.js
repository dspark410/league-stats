import React, { useState, useEffect } from 'react'
import style from './historycard.module.css'
import HistoryCardComplex from './HistoryCardComplex'
import HistoryCardSimple from './HistoryCardSimple'
import { CSSTransition } from 'react-transition-group'

function HistoryCard({ game, spells, runes, summonerInfo, getPlayerName }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [game])

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
        {!open ? (
          <HistoryCardSimple game={game} clickArrow={clickArrow} />
        ) : (
          <HistoryCardComplex
            game={game}
            spells={spells}
            runes={runes}
            summonerInfo={summonerInfo}
            getPlayerName={getPlayerName}
            clickArrow={clickArrow}
          />
        )}
      </div>
    </CSSTransition>
  )
}

export default HistoryCard
