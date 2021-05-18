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
      data: {
        summonerInfo,
        matchHistory,
        matchList: { matches },
        rgn,
      },
    },
  } = useSelector((state) => state)

  const getMoreMatchesBtn = () => {
    const matchesQuery = matches
      .slice(matchHistory.length, matchHistory.length + 5)
      .map((match) => match.gameId)
    dispatch(getMoreMatches(matchesQuery, summonerInfo, rgn))
  }

  return (
    <div className={style.matchContainer}>
      <div>
        {matchHistory.length > 0 ? (
          matchHistory.map((game, i) => {
            return <HistoryCard key={i} game={game} />
          })
        ) : (
          <div className={style.noMatchContainer}>
            <div className={style.matchHeader}>Match History</div>
            <div className={style.noMatches}>
              {matchHistory.length === 0
                ? 'No Matches Were Found.'
                : matchHistory.includes(null) && (
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

        {matchHistory.length <= matches.length && (
          <div onClick={!matchesLoader ? getMoreMatchesBtn : null}>
            {matchHistory.length >= matches.length ? (
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
