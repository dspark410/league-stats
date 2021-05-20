import React, { useState, useEffect } from 'react'
import style from './leaderboard.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  getLeaderboardChalltoMaster,
  getLeaderboardDiamondtoIron,
  getCurrentPage,
  getSelectRank,
  setPostsPerPage,
} from '../redux/actions/leaderboardActions'
import { getInput } from '../redux/actions/inputActions'
import { getSummonerInfo } from '../redux/actions/summonerInfoActions'
import LeaderboardChallengerToMaster from '../components/LeaderboardChallengerToMaster'
import LeaderboardDiamondToIron from '../components/LeaderboardDiamondToIron'
import LeaderboardSkeleton from './LeaderboardSkeleton'

function Leaderboard({ history, match }) {
  const [division, setDivision] = useState('I')
  const [mapDivision, setMapDivision] = useState(['I', 'II', 'III', 'IV'])
  const [leaderboardLoading, setLeaderboardLoading] = useState(true)

  const dispatch = useDispatch()
  const {
    input: {
      summonerInput: { region },
    },
    leaderboard: { data, rank, page, currentPage, postsPerPage },
  } = useSelector((state) => state)

  //pagination info
  const indexOfLastPost = currentPage * postsPerPage
  const indexofFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = data.slice(indexofFirstPost, indexOfLastPost)

  // change page
  const paginate = (pageNumber) => {
    dispatch(getCurrentPage('setCurrentPage', pageNumber))
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  const getPlayerName = (e) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })

    const summonerName = e.target.getAttribute('name')
    const region = e.target.getAttribute('region')
    dispatch(getSummonerInfo(summonerName, region))
    history.push(`/summoner/${region}/${summonerName}`)
  }

  useEffect(() => {
    let timer
    // Show nav on the leaderboard screen
    setTimeout(() => {
      dispatch(getInput('showNav'))
    }, 50)
    dispatch(getLeaderboardChalltoMaster(region, rank))

    timer = setTimeout(() => {
      setLeaderboardLoading(false)
    }, 3000)

    return () => {
      dispatch(getSelectRank('CHALLENGER'))
      setDivision('I')
      clearTimeout(timer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // render skeleton when rank changes on leaderboard
  useEffect(() => {
    let mounted = true
    let timer
    setLeaderboardLoading(true)

    if (mounted) {
      if (
        rank === 'CHALLENGER' ||
        rank === 'GRANDMASTER' ||
        rank === 'MASTER'
      ) {
        dispatch(setPostsPerPage(25))
        setMapDivision(['I'])
        dispatch(getLeaderboardChalltoMaster(region, rank))
      } else {
        dispatch(setPostsPerPage(41))
        setMapDivision(['I', 'II', 'III', 'IV'])
        dispatch(getLeaderboardDiamondtoIron(region, rank, division, page))
      }

      timer = setTimeout(() => {
        setLeaderboardLoading(false)
      }, 3000)
    }

    return () => {
      mounted = false
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, rank, division, page])

  return (
    <>
      <LeaderboardSkeleton loading={leaderboardLoading} />
      <div
        style={!leaderboardLoading ? { display: 'block' } : { display: 'none' }}
        className={style.leaderboardContainer}>
        <h1 className={style.leaderHeader}> Ranked Leaderboard</h1>
        <div className={style.selectContainer}>
          <select
            onChange={(e) => {
              dispatch(getSelectRank(e.target.value))
              dispatch(getCurrentPage('setPage', 1))
              dispatch(getCurrentPage('setCurrentPage', 1))
            }}>
            <option defaultValue value='CHALLENGER'>
              Challenger
            </option>
            <option value='GRANDMASTER'>GRANDMASTER</option>
            <option value='MASTER'>MASTER</option>
            <option value='DIAMOND'>DIAMOND</option>
            <option value='PLATINUM'>PLATINUM</option>
            <option value='GOLD'>GOLD</option>
            <option value='SILVER'>SILVER</option>
            <option value='BRONZE'>BRONZE</option>
            <option value='IRON'>IRON</option>
          </select>
          <select
            onChange={(e) => {
              setDivision(e.target.value)
              dispatch(getCurrentPage('setPage', 1))
              dispatch(getCurrentPage('setCurrentPage', 1))
            }}>
            {mapDivision.map((div, i) => (
              <option key={i} defaultValue={div === 'I'} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>
        {rank === 'CHALLENGER' ||
        rank === 'GRANDMASTER' ||
        rank === 'MASTER' ? (
          <LeaderboardChallengerToMaster
            leaderboard={currentPosts}
            paginate={paginate}
            getPlayerName={getPlayerName}
            match={match}
          />
        ) : (
          <LeaderboardDiamondToIron
            leaderboard={currentPosts}
            paginate={paginate}
            getPlayerName={getPlayerName}
          />
        )}
      </div>
    </>
  )
}

export default Leaderboard
