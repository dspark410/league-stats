import React, { useState, useEffect } from 'react'
import style from './welcome.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { changeNav } from '../redux/actions/inputActions'
import {
  getSummonerInfo,
  getSummonerRegion,
  clearSummoner,
  clearSummonerState,
  clearSearch,
} from '../redux/actions/summonerInfoActions'
import { regions } from '../utils/constant'
import RankCard from '../components/RankCard'
import UnrankedCard from '../components/UnrankedCard'
import SummonerCard from '../components/SummonerCard'
import NotFound from './NotFound'
import WelcomeSkeleton from './WelcomeSkeleton'
import NoMatchHistoryMasteryAndLive from '../components/NoMatchHistoryAndLive'
import MatchHistoryMasteryandLive from '../components/MatchHistoryMasteryandLive'

const Welcome = ({ match }) => {
  const [display, setDisplay] = useState('overview')
  const [time, setTime] = useState()
  const [noRegion, setNoRegion] = useState(false)

  const {
    summoner: {
      data: {
        summonerInfo,
        live,
        rank,
        matchHistory,
        mastery,
        notFound,
        controller,
      },
      summLoading,
    },
    dependency: { version },
  } = useSelector((state) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    // Show nav on the welcome screen
    setTimeout(() => {
      dispatch(changeNav('showNav'))
    }, 50)

    if (summonerInfo) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
    return () => {
      if (controller !== '' && summonerInfo) dispatch(clearSummoner())
      dispatch(clearSearch())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(clearSummonerState())
    // Dispatches getSummonerInfo from URL
    if (regions.includes(match.params.region)) {
      setNoRegion(false)
      dispatch(getSummonerInfo(match.params.summonerName, match.params.region))
    } else {
      dispatch(getSummonerRegion())
      setNoRegion(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, match.params.summonerName, match.params.region])

  useEffect(() => {
    let time
    let mounted = true

    if (mounted) {
      if (live && typeof live.gameLength === 'number') {
        setTime(live.gameLength < 0 ? live.gameLength * -1 : live.gameLength)
        time = setInterval(() => {
          setTime((seconds) => seconds + 1)
        }, 1000)
      }
    }

    return () => {
      clearTimeout(time)
      mounted = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live])

  useEffect(() => {
    setDisplay('overview')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summLoading])

  if (notFound) {
    return <NotFound noRegion={noRegion} />
  } else {
    return !summLoading ? (
      <div className={style.rowContainer}>
        <div className={style.row1}>
          <div className={style.emblemContainer}>
            <div className={style.nameLive}>
              <SummonerCard version={version} />
              {live !== 'Not In Live Game' && (
                <div className={`${style.inGame}`}>
                  <div className={style.circlePulse} />
                  In Game
                </div>
              )}
            </div>

            <div className={style.rankCardContainer}>
              <div className={style.rankContainer}>
                {(rank && !rank.length) ||
                (rank.length === 1 &&
                  rank[0].queueType === 'RANKED_FLEX_SR') ? (
                  <UnrankedCard queue='Solo' />
                ) : (
                  rank.map((ranking, i) => {
                    return ranking.queueType === 'RANKED_SOLO_5x5' ? (
                      <RankCard key={i} rank={ranking} queue='Solo' />
                    ) : (
                      ranking.queueType === 'RANKED_FLEX_SR' && ''
                    )
                  })
                )}

                <img
                  alt='Unranked'
                  className={style.rectangle}
                  src='https://res.cloudinary.com/mistahpig/image/upload/v1621898818/league-stats/role%20icons/rectangle_jfxtfk.png'
                />

                {(rank && !rank.length) ||
                (rank.length === 1 &&
                  rank[0].queueType === 'RANKED_SOLO_5x5') ? (
                  <UnrankedCard queue='Flex' />
                ) : (
                  rank.map((ranking, i) => {
                    return ranking.queueType === 'RANKED_FLEX_SR' ? (
                      <RankCard key={i} rank={ranking} queue='Flex' />
                    ) : (
                      ranking.queueType === 'RANKED_SOLO_5x5' && ''
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={style.row2}>
          <div className={style.linksContainer}>
            <span
              onClick={() => setDisplay('overview')}
              to='#'
              className={display === 'overview' ? style.underline : style.live}>
              Overview
            </span>

            <span
              onClick={() => setDisplay('live')}
              to='/live'
              className={display === 'live' ? style.underline : style.live}>
              Live Game
            </span>
          </div>
        </div>
        <div className={style.row3}>
          {display === 'overview' && matchHistory.length === 0 ? (
            <NoMatchHistoryMasteryAndLive
              mastery={mastery}
              live={live}
              display={display}
            />
          ) : (
            <MatchHistoryMasteryandLive
              history={matchHistory}
              version={version}
              display={display}
              time={time}
              live={live}
            />
          )}
        </div>
      </div>
    ) : (
      <WelcomeSkeleton />
    )
  }
}

export default Welcome
