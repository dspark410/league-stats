/** @format */

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getLeaderboardChalltoMaster,
  getLeaderboardDiamondtoIron,
} from '../redux/actions/leaderboardActions'
import { getInput } from '../redux/actions/inputActions'
import style from './leaderboard.module.css'
import LeaderboardChallengerToMaster from '../components/LeaderboardChallengerToMaster'
import LeaderboardDiamondToIron from '../components/LeaderboardDiamondToIron'
import LeaderboardSkeleton from './LeaderboardSkeleton'
import { getSummonerInfo } from '../redux/actions/summonerInfoActions'

function Leaderboard({ history }) {
  const [rank, setRank] = useState('CHALLENGER')
  const [division, setDivision] = useState('I')
  const [mapDivision, setMapDivision] = useState(['I', 'II', 'III', 'IV'])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(25)

  const [leaderboardDone, setLeaderboardDone] = useState(false)
  const dispatch = useDispatch()
  const {
    dependency: { version },
    input: {
      summonerInput: { region },
    },
    leaderboardChalltoMaster,
    leaderboardDiamondtoIron,
  } = useSelector((state) => state)

  //pagination info
  const indexOfLastPost = currentPage * postsPerPage
  const indexofFirstPost = indexOfLastPost - postsPerPage

  let data =
    postsPerPage === 25
      ? leaderboardChalltoMaster.data
      : leaderboardDiamondtoIron.data

  const currentPosts = data.slice(indexofFirstPost, indexOfLastPost)

  // change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    setLeaderboardDone(true)
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

  //show nav bar and render skeleton
  useEffect(() => {
    // Show nav on the welcome screen
    setTimeout(() => {
      dispatch(getInput('showNav'))
    }, 50)
    //setLeaderboardDone(true)
    dispatch(getLeaderboardChalltoMaster(region, rank))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // render skeleton when rank changes on leaderboard
  useEffect(() => {
    let mounted = true
    setLoading(true)
    if (mounted) {
      if (
        rank === 'CHALLENGER' ||
        rank === 'GRANDMASTER' ||
        rank === 'MASTER'
      ) {
        setPostsPerPage(25)
        setMapDivision(['I'])
        //changeLeaderBoardChallengertoMaster(rank, region)
        dispatch(getLeaderboardChalltoMaster(region, rank))
      } else {
        setPostsPerPage(41)
        setMapDivision(['I', 'II', 'III', 'IV'])
        dispatch(getLeaderboardDiamondtoIron(region, rank, division, page))
        //changeLeaderBoardDiamondToIron(rank, division, page)
      }
    }
    let skeleTimer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => {
      clearTimeout(skeleTimer)
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rank, division, page, region])
  // if CurrentPage is added to depency, it loads but we don't want skeleTimer

  // function to get the next page of summoners on the leaderboard pages for Diamond to Iron ranks
  const nextPage = () => {
    if (leaderboardDiamondtoIron.data.length < 205) {
      return
    } else {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <>
      <LeaderboardSkeleton loading={loading} />
      <div
        style={!loading ? { display: 'block' } : { display: 'none' }}
        className={style.leaderboardContainer}>
        <h1 className={style.leaderHeader}> Ranked Leaderboard</h1>
        <div className={style.selectContainer}>
          <select
            onChange={(e) => {
              setRank(e.target.value)

              setPage(1)
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
              setPage(1)
              setCurrentPage(1)
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
            version={version}
            leaderboard={currentPosts}
            postsPerPage={postsPerPage}
            totalPosts={leaderboardChalltoMaster.data.length}
            paginate={paginate}
            currentPage={currentPage}
            rank={rank}
            region={region}
            getPlayerName={getPlayerName}
            leaderboardDone={leaderboardDone}
            setLeaderboardDone={setLeaderboardDone}
          />
        ) : (
          <LeaderboardDiamondToIron
            version={version}
            leaderboard={currentPosts}
            postsPerPage={postsPerPage}
            totalPosts={leaderboardDiamondtoIron.data.length}
            paginate={paginate}
            currentPage={currentPage}
            rank={rank}
            region={region}
            getPlayerName={getPlayerName}
            page={page}
            nextPage={nextPage}
            prevPage={() => {
              setPage((prev) => prev - 1)
            }}
          />
        )}
      </div>
    </>
  )
}

export default Leaderboard
