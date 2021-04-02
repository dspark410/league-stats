import React, { useState, useEffect, useRef } from 'react'
import style from './matchhistorycard.module.css'
import axios from 'axios'
import HistoryCard from './HistoryCard'
import MatchesLoader from './MatchesLoader'

function MatchHistoryCard({
  summonerInfo,
  champInfo,
  version,
  getPlayerName,
  queues,
  playerMatches,
  region,
  live,
  skeletonFalse,
  summInfo,
}) {
  const [gameDetails, setGameDetails] = useState([])
  const [runes, setRunes] = useState([])
  const [spells, setSpells] = useState([])
  const [matchDetails, setMatchDetails] = useState([])
  const [index, setIndex] = useState(7)
  const [matchesLoader, setMatchesLoader] = useState(false)

  // Get info from Session Storage
  const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))

  const url = process.env.REACT_APP_API_URL || ''
  const endpoint = process.env.REACT_APP_API_ENDPOINT || ''
  let source = axios.CancelToken.source()

  let moreMatchesMounted = useRef()

  const getMoreMatches = () => {
    const matches = summInfo.matchList.matches
      .slice(5, 10)
      .map((match) => match.gameId)

    axios
      .get(
        `${endpoint}/getMoreMatches/[${matches}]/${JSON.stringify(
          summInfo.summonerInfo
        )}/${region}`
      )
      .then((res) => console.log(res))
  }

  useEffect(() => {
    let mounted = true

    // Validation to check if version is populated in props

    if (version && mounted) {
      // Retrieve list of summoner spells from Riot API
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`,
          { cancelToken: source.token }
        )
        .then((res) => {
          setSpells(Object.values(res.data.data))
        })
      // Retrieve list of runes from Riot APIf
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`,
          { cancelToken: source.token }
        )
        .then((res) => {
          setRunes(res.data)
        })
    }

    return () => {
      mounted = false
      source.cancel('spells and runes got unmounted')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  useEffect(() => {
    return () => {
      moreMatchesMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let skeleTimer

    skeleTimer = setTimeout(() => {
      skeletonFalse()
    }, 8000)

    return () => {
      clearInterval(skeleTimer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDetails])

  return (
    <div className={style.matchContainer}>
      <div>
        {summInfo.matchHistory.length > 0 ? (
          summInfo.matchHistory
            .sort(function (a, b) {
              return new Date(b.gameCreation) - new Date(a.gameCreation)
            })
            .map((game, i) => {
              return (
                <HistoryCard
                  key={i}
                  game={game}
                  spells={spells}
                  runes={runes}
                  summonerInfo={summonerInfo}
                  getPlayerName={getPlayerName}
                  live={live}
                />
              )
            })
        ) : (
          <div className={style.noMatchContainer}>
            <div className={style.matchHeader}>Match History</div>
            <div className={style.noMatches}>No Matches Were Found.</div>
          </div>
        )}

        {summInfo.matchHistory.length >= summInfo.matchList.length && (
          <div
            onClick={
              index < playerMatches.length && !matchesLoader
                ? getMoreMatches
                : null
            }
          >
            {index >= playerMatches.length ? (
              <button disabled className={style.none}>
                More Matches Unavailable
              </button>
            ) : (
              <button
                disabled={matchesLoader}
                className={style.moreMatchesContainer}
              >
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
