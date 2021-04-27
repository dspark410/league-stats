/** @format */

import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import style from './matchhistorycard.module.css'
import axios from 'axios'
import HistoryCard from './HistoryCard'
import MatchesLoader from './MatchesLoader'
import { CgSmileSad } from 'react-icons/cg'

function MatchHistoryCard({
  version,
  getPlayerName,
  region,
  setLoading,
  summInfo,
}) {
  const [gameDetails, setGameDetails] = useState([])
  const [runes, setRunes] = useState([])
  const [spells, setSpells] = useState([])
  const [matchesLoader, setMatchesLoader] = useState(false)
  const [allMatchesReady, setAllMatchesReady] = useState(true)

  const {
    summoner: {
      summonerInfo,
      matchHistory,
      matchList: { matches },
    },
  } = useSelector((state) => state)

  const endpoint = process.env.REACT_APP_API_ENDPOINT || ''
  let source = axios.CancelToken.source()

  let moreMatchesMounted = useRef()

  const refreshPage = () => window.location.reload()

  const getMoreMatches = () => {
    setMatchesLoader(true)
    const matchesQuery = matches
      .slice(gameDetails.length, gameDetails.length + 5)
      .map((match) => match.gameId)

    axios
      .get(
        `${endpoint}/getMoreMatches/[${matchesQuery}]/${JSON.stringify(
          summInfo.summonerInfo
        )}/${region}`
      )
      .then((res) => {
        setTimeout(() => {
          setGameDetails((prev) => prev.concat(res.data))
          setMatchesLoader(false)
        }, 2000)
      })
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
    setAllMatchesReady(true)
    let skeleTimer

    if (summonerInfo) {
      setGameDetails(matchHistory)
      skeleTimer = setTimeout(() => {
        setLoading(false)
      }, 3000)
    }

    matchHistory.forEach((game) => {
      game === null && setAllMatchesReady(false)
    })

    return () => {
      moreMatchesMounted.current = false
      clearInterval(skeleTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summInfo])

  return (
    <div className={style.matchContainer}>
      <div>
        {gameDetails.length > 0 && allMatchesReady ? (
          gameDetails
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
                  getPlayerName={getPlayerName}
                />
              )
            })
        ) : (
          <div className={style.noMatchContainer}>
            <div className={style.matchHeader}>Match History</div>
            <div className={style.noMatches}>
              {allMatchesReady ? (
                'No Matches Were Found.'
              ) : (
                <div className={style.failedMatchContainer}>
                  <div className={style.failedMatch}>
                    Failed To Load Match History{' '}
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

        {gameDetails.length <= summInfo.matchList.matches.length &&
          allMatchesReady && (
            <div onClick={!matchesLoader ? getMoreMatches : null}>
              {gameDetails.length >= summInfo.matchList.matches.length ? (
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
