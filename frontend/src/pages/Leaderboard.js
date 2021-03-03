import React, { useState, useEffect } from 'react'
import style from './leaderboard.module.css'
import LeaderboardTable from '../components/LeaderboardTable'
import LeaderboardDiamondToIron from '../components/LeaderboardDiamondToIron'
function Leaderboard({
  version,
  showNav,
  changeLeaderBoard,
  leaderboard,
  postsPerPage,
  totalPosts,
  totalPosts2,
  paginate,
  currentPage,
  region,
  getPlayerName,
  changeLeaderBoardPage,
  leaderboardDiamondToIron,
  postsperPageDiamondToIron,
}) {
  const [rank, setRank] = useState('CHALLENGER')
  const [division, setDivision] = useState('I')
  const [mapDivision, setMapDivision] = useState(['I', 'II', 'III', 'IV'])
  const [page, setPage] = useState(1)

  useEffect(() => {
    showNav()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (rank === 'CHALLENGER' || rank === 'GRANDMASTER' || rank === 'MASTER') {
      setMapDivision(['I'])
      changeLeaderBoard(rank)
    } else {
      setMapDivision(['I', 'II', 'III', 'IV'])
      changeLeaderBoardPage(rank, division, page)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rank, division])

  return (
    <>
      <div className={style.leaderboardContainer}>
        <h1 className={style.leaderHeader}> Ranked Leaderboard</h1>
        <div className={style.selectContainer}>
          <select
            onChange={(e) => {
              setRank(e.target.value)
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
          <select onChange={(e) => setDivision(e.target.value)}>
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
          <LeaderboardTable
            version={version}
            leaderboard={leaderboard}
            postsPerPage={postsPerPage}
            totalPosts={totalPosts}
            paginate={paginate}
            currentPage={currentPage}
            rank={rank}
            region={region}
            getPlayerName={getPlayerName}
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
          />
        )}
      </div>
    </>
  )
}

export default Leaderboard
