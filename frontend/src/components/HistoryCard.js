import React, { useState } from 'react'
import HistoryCardComplex from './HistoryCardComplex'
import HistoryCardSimple from './HistoryCardSimple'

function HistoryCard({ game, spells, runes, summonerInfo, getPlayerName }) {
  const [open, setOpen] = useState(false)

  const clickArrow = () => {
    setOpen((prev) => !prev)
  }

  return (
    <div>
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
  )
}

export default HistoryCard
