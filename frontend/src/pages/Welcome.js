import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeNav } from '../redux/actions/inputActions'
import {
  getSummonerInfo,
  getSummonerRegion,
} from '../redux/actions/summonerInfoActions'
import style from './welcome.module.css'
import MasteryCard from '../components/MasteryCard'
import RankCard from '../components/RankCard'
import UnrankedCard from '../components/UnrankedCard'
import SummonerCard from '../components/SummonerCard'
import MatchHistoryCard from '../components/MatchHistoryCard'
import Live from '../components/Live'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import MatchHistoryCardSkeleton from '../components/MatchHistoryCardSkeleton'
import MasteryCardSkeleton from '../components/MasteryCardSkeleton'
import { MdLiveTv } from 'react-icons/md'
import NotFound from './NotFound'
import { regions } from '../utils/constant'

const Welcome = ({ match }) => {
  const [display, setDisplay] = useState('overview')
  const [time, setTime] = useState()
  const [noRegion, setNoRegion] = useState(false)

  const {
    summoner: {
      data: { summonerInfo, live, rank, matchHistory, mastery, notFound },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Dispatches getSummonerInfo from URL
    if (regions.includes(match.params.region)) {
      setNoRegion(false)
      dispatch(getSummonerInfo(match.params.summonerName, match.params.region))
    } else {
      dispatch(getSummonerRegion())
      setNoRegion(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

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
  }, [summLoading])

  if (notFound) {
    return <NotFound noRegion={noRegion} />
  } else {
    return (
      <SkeletonTheme duration={3} color='#7a6b83' highlightColor='#e2c0f7'>
        <div className={style.rowContainer}>
          <div className={style.row1}>
            <div className={style.emblemContainer}>
              {!summLoading && matchHistory ? (
                <div className={style.nameLive}>
                  <SummonerCard version={version} />
                  {live !== 'Not In Live Game' && (
                    <div className={`${style.inGame}`}>
                      <div className={style.circlePulse} />
                      In Game
                    </div>
                  )}
                </div>
              ) : (
                <div className={style.nameLiveSkeleton}>
                  <Skeleton circle={true} width={115} height={115} />
                  <Skeleton
                    style={{ marginLeft: '25px' }}
                    width={250}
                    height={55}
                  />
                  {
                    <Skeleton
                      width={110}
                      height={33}
                      className={`${style.inGameSkeleton} `}
                    />
                  }
                </div>
              )}
              <div className={style.rankCardContainer}>
                {!summLoading ? (
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
                      src={
                        process.env.PUBLIC_URL + `/images/icons/rectangle.png`
                      }
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
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      margin: '25px 0px 25px 0px',
                    }}>
                    <div>
                      <Skeleton
                        style={{ marginLeft: '10px' }}
                        circle={true}
                        width={75}
                        height={75}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        marginLeft: '10px',
                        flexDirection: 'column',
                      }}>
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={40}
                        height={20}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={180}
                        height={35}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={40}
                        height={25}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={130}
                        height={25}
                      />
                    </div>

                    <div>
                      <Skeleton
                        className={style.skeletonRectangle}
                        width={15}
                        height={15}
                      />
                    </div>

                    <div>
                      <Skeleton circle={true} width={75} height={75} />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        marginLeft: '10px',
                        flexDirection: 'column',
                      }}>
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={40}
                        height={20}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={180}
                        height={35}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={40}
                        height={25}
                      />
                      <Skeleton
                        style={{ marginBottom: '2px' }}
                        width={130}
                        height={25}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={style.row2}>
            <div className={style.linksContainer}>
              {!summLoading ? (
                <span
                  onClick={() => setDisplay('overview')}
                  to='#'
                  className={
                    !summLoading && display === 'overview'
                      ? style.underline
                      : style.live
                  }>
                  Overview
                </span>
              ) : (
                <Skeleton
                  style={{ display: 'inlineBlock', marginLeft: '15px' }}
                  height={30}
                  width={74}
                />
              )}
              {!summLoading ? (
                <span
                  onClick={() => setDisplay('live')}
                  to='/live'
                  className={
                    !summLoading && display === 'live'
                      ? style.underline
                      : style.live
                  }>
                  Live Game
                </span>
              ) : (
                <Skeleton
                  style={{ display: 'inlineBlock', marginLeft: '15px' }}
                  height={30}
                  width={84}
                />
              )}
            </div>
          </div>
          <div className={style.row3}>
            {matchHistory &&
            display === 'overview' &&
            matchHistory.length === 0 &&
            !summLoading ? (
              <>
                <div className={style.noMatchContainer}>
                  <div className={style.matchHeader}>Match History</div>
                  <div className={style.noMatches}>No Matches Were Found.</div>
                </div>

                <div className={style.masteryCard}>
                  <div className={style.header}>
                    <img
                      alt='mastery icon'
                      src={process.env.PUBLIC_URL + '/images/icons/mastery.png'}
                    />
                    CHAMPION MASTERY
                  </div>
                  <div className={style.masteryHeader}>
                    <div className={style.championHeader}>CHAMPION</div>
                    <div className={style.levelHeader}>LEVEL</div>
                    <div className={style.pointsHeader}>POINTS</div>
                  </div>
                  {mastery.length === 0 && (
                    <div className={style.noChamps}>No Champions Found.</div>
                  )}
                </div>
                {live === 'Not In Live Game' && display === 'live' && (
                  <div className={style.notInGame}>
                    <div className={style.liveGameHeader}>
                      <MdLiveTv className={style.liveIcon} />
                      <span className={style.liveGame}>Live Game</span>
                    </div>

                    <div className={style.text}>Summoner Is Not In Game.</div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div
                  className={
                    summLoading && display === 'overview'
                      ? style.row3
                      : style.none
                  }>
                  <MatchHistoryCardSkeleton />
                  <MasteryCardSkeleton />
                </div>
                <div
                  className={
                    !summLoading && display === 'overview'
                      ? style.row3
                      : style.none
                  }>
                  {!summLoading && <MatchHistoryCard />}
                  {!summLoading && <MasteryCard version={version} />}
                </div>
                <div
                  className={
                    live === 'Not In Live Game' && display === 'live'
                      ? style.notInGame
                      : style.none
                  }>
                  <div className={style.liveGameHeader}>
                    <MdLiveTv className={style.liveIcon} />
                    <span className={style.liveGame}>Live Game</span>
                  </div>

                  <div className={style.text}>Summoner Is Not In Game.</div>
                </div>
                <div
                  className={
                    live && display === 'live'
                      ? style.liveContainer
                      : style.none
                  }>
                  {live !== 'Not In Live Game' && <Live time={time} />}
                </div>
              </>
            )}
          </div>
        </div>
      </SkeletonTheme>
    )
  }
}

export default Welcome
