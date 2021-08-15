import React, { useState, useEffect } from 'react'
import style from './leaderboard.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  getLeaderboardChalltoMaster,
  getLeaderboardDiamondtoIron,
  getCurrentPage,
  getSelectRank,
  setPostsPerPage,
  clearLeaderboard,
} from '../redux/actions/leaderboardActions'
import { changeNav } from '../redux/actions/inputActions'
import { getSummonerInfo } from '../redux/actions/summonerInfoActions'
import LeaderboardChallengerToMaster from '../components/LeaderboardChallengerToMaster'
import LeaderboardDiamondToIron from '../components/LeaderboardDiamondToIron'
import LeaderboardSkeleton from './LeaderboardSkeleton'

function Leaderboard({ history, match }) {
  const [division, setDivision] = useState('I')
  const [mapDivision, setMapDivision] = useState(['I', 'II', 'III', 'IV'])
  const [pagePosts, setPagePosts] = useState(0)
  const dispatch = useDispatch()
  const {
    input: {
      summonerInput: { region },
    },
    leaderboard: {
      data,
      rank,
      page,
      currentPage,
      postsPerPage,
      leaderboardLoading,
    },
  } = useSelector((state) => state)

  //pagination info
  const indexOfLastPost = currentPage * postsPerPage
  const indexofFirstPost = indexOfLastPost - postsPerPage
  // const currentPosts = data.slice(indexofFirstPost, indexOfLastPost)

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
    // Show nav on the leaderboard screen
    setTimeout(() => {
      dispatch(changeNav('showNav'))
    }, 50)

    return () => {
      dispatch(getSelectRank('CHALLENGER'))
      setDivision('I')
      dispatch(clearLeaderboard())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // render skeleton when rank changes on leaderboard
  useEffect(() => {
    let mounted = true

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
    }

    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, rank, division, page])

  useEffect(() => {
    setPagePosts(data.slice(indexofFirstPost, indexOfLastPost))
  }, [data, indexOfLastPost, indexofFirstPost])

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
            leaderboard={pagePosts}
            paginate={paginate}
            getPlayerName={getPlayerName}
            match={match}
            data={data}
          />
        ) : (
          <LeaderboardDiamondToIron
            leaderboard={pagePosts}
            paginate={paginate}
            getPlayerName={getPlayerName}
          />
        )}
      </div>
    </>
  )
}

export default Leaderboard
