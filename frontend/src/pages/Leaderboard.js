import React, { useState, useEffect } from 'react'
import style from './leaderboard.module.css'
import LeaderboardChallengerToMaster from '../components/LeaderboardChallengerToMaster'
import LeaderboardDiamondToIron from '../components/LeaderboardDiamondToIron'
import LeaderboardSkeleton from './LeaderboardSkeleton'

function Leaderboard({
  version,
  showNav,
  changeLeaderBoardChallengertoMaster,
  leaderboard,
  postsPerPage,
  totalPosts,
  totalPosts2,
  paginate,
  currentPage,
  region,
  getPlayerName,
  changeLeaderBoardDiamondToIron,
  leaderboardDiamondToIron,
  postsperPageDiamondToIron,
  fullLeaderboard,
  setCurrentPage,
  leaderboardDone,
  setLeaderboardDone,
}) {
  const [rank, setRank] = useState('CHALLENGER')
  const [division, setDivision] = useState('I')
  const [mapDivision, setMapDivision] = useState(['I', 'II', 'III', 'IV'])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  //show nav bar and render skeleton
  useEffect(() => {
    showNav(true)
    let timer
    timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
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
        setMapDivision(['I'])
        changeLeaderBoardChallengertoMaster(rank, region)
      } else {
        setMapDivision(['I', 'II', 'III', 'IV'])
        changeLeaderBoardDiamondToIron(rank, division, page)
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
    if (fullLeaderboard.length < 205) {
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
        className={style.leaderboardContainer}
      >
        <h1 className={style.leaderHeader}> Ranked Leaderboard</h1>
        <div className={style.selectContainer}>
          <select
            onChange={(e) => {
              setRank(e.target.value)
              setPage(1)
            }}
          >
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
            }}
          >
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
            leaderboard={leaderboard}
            postsPerPage={postsPerPage}
            totalPosts={totalPosts}
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
            leaderboard={leaderboardDiamondToIron}
            postsPerPage={postsperPageDiamondToIron}
            totalPosts={totalPosts2}
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
            fullLeaderboard={fullLeaderboard}
          />
        )}
      </div>
    </>
  )
}

export default Leaderboard
