import React from 'react'
import style from './matchhistorycard.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getMoreMatches } from '../redux/actions/summonerInfoActions'
import { CgSmileSad } from 'react-icons/cg'
import HistoryCard from './HistoryCard'
import MatchesLoader from './MatchesLoader'

function MatchHistoryCard() {
  const dispatch = useDispatch()
  const refreshPage = () => window.location.reload()

  const {
    summoner: {
      matchesLoader,
      data: { summonerInfo, matchHistory, matchList, rgn },
    },
  } = useSelector((state) => state)

  const getMoreMatchesBtn = () => {
    const matchesQuery = matchList.slice(
      matchHistory.length,
      // Change to 5 before going to production
      matchHistory.length + 5
    )
    dispatch(getMoreMatches(matchesQuery, summonerInfo, rgn))
  }

  return (
    <div className={style.matchContainer}>
      <div>
        {matchHistory.length > 0 && !matchHistory.includes(null) ? (
          matchHistory
            .sort((a, b) => new Date(b.gameCreation) - new Date(a.gameCreation))
            .map((game, i) => {
              return <HistoryCard key={i} game={game} />
            })
        ) : (
          <div className={style.noMatchContainer}>
            <div className={style.matchHeader}>Match History</div>
            <div className={style.noMatches}>
              {matchHistory.length === 0 ? (
                'No Matches Were Found.'
              ) : (
                <div className={style.failedMatchContainer}>
                  <div className={style.failedMatch}>
                    Failed To Load Match History
                    <CgSmileSad className={style.sad} />
                  </div>
                  <button className={style.retry} onClick={refreshPage}>
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {matchHistory.length <= matchList.length &&
          !matchHistory.includes(null) && (
            <div onClick={!matchesLoader ? getMoreMatchesBtn : null}>
              {matchHistory.length >= matchList.length ? (
                <button disabled className={style.none}>
                  More Matches Unavailable
                </button>
              ) : (
                <button
                  disabled={matchesLoader}
                  className={style.moreMatchesContainer}>
                  More Matches {matchesLoader && <MatchesLoader />}
                </button>
              )}
            </div>
          )}
      </div>
    </div>
  )
}

export default MatchHistoryCard
