import React, { useState, useEffect } from 'react'
import Pagination from '../components/Pagination'
import style from './leaderboard.module.css'

function Leaderboard({
  version,
  solo,
  soloTier,
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  showNav,
  changeLeaderBoard,
  leaderboard,
}) {
  const [rank, setRank] = useState('CHALLENGER')
  const [division, setDivision] = useState('I')
  const [page, setPage] = useState(1)
  const [mapDivision, setMapDivision] = useState(['I', 'II', 'III', 'IV'])

  useEffect(() => {
    showNav()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    changeLeaderBoard(rank, division, page)
    if (rank === 'CHALLENGER' || rank === 'GRANDMASTER' || rank === 'MASTER') {
      setMapDivision(['I'])
    } else {
      setMapDivision(['I', 'II', 'III', 'IV'])
    }
  }, [rank, division, page])

  return (
    <div className={style.leaderboardOverlay}>
      <div className={style.overlay}>
        <div style={{ overflowX: 'auto' }}>
          <h1 className={style.leaderHeader}> Ranked Leaderboard</h1>
          <select
            onChange={(e) => {
              setRank(e.target.value)
            }}
          >
            <option defaultValue value='CHALLENGER'>
              Challenger
            </option>
            <option value='GRANDMASTER'>Grandmaster</option>
            <option value='MASTER'>Master</option>
            <option value='DIAMOND'>Diamond</option>
            <option value='PLATINUM'>Platinum</option>
            <option value='GOLD'>Gold</option>
            <option value='SILVER'>Silver</option>
            <option value='BRONZE'>Bronze</option>
            <option value='IRON'>Iron</option>
          </select>
          <select onChange={(e) => setDivision(e.target.value)}>
            {mapDivision.map((div) => (
              <option defaultValue={div === 'I'} value={div}>
                {div}
              </option>
            ))}
          </select>
          <p>page:{page}</p>
          <button onClick={() => setPage((prevPage) => prevPage - 1)}>
            prev
          </button>
          <button onClick={() => setPage((prevPage) => prevPage + 1)}>
            next
          </button>

          <table className={style.tableContainer}>
            <tbody className={style.tbody}>
              <tr className={style.row}>
                <th className={`${style.td} ${style.number}`}>#</th>
                <th className={style.td}>Summoners</th>
                <th className={style.td}>Tier</th>
                <th className={style.td}>LP</th>
                <th className={`${style.tdWinRatio} ${style.winRatioHeader}`}>
                  Win Ratio
                </th>
              </tr>
              {leaderboard
                .sort((a, b) => b.leaguePoints - a.leaguePoints)
                .map((summoner, i) => (
                  <tr className={style.row} key={i}>
                    <td className={`${style.td} ${style.number}`}>{i + 1}</td>
                    <td className={style.td}>
                      <img
                        alt='profile icon'
                        className={style.profileIcon}
                        // Grab profile icon
                        src={
                          `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.icon}.png` ||
                          process.env.PUBLIC_URL + '/images/emptyitem.png'
                        }
                      />

                      {summoner.summonerName}
                    </td>
                    <td className={`${style.td} ${style.Tier}`}>
                      {`${summoner.tier} ${summoner.rank}`}
                    </td>
                    <td className={style.td}>{summoner.leaguePoints}</td>
                    <td className={`${style.tdWinRatio}`}>
                      <div className={style.winRatio}>
                        <span className={style.wins}>{summoner.wins} </span>

                        <span>/</span>
                        <span className={style.losses}>{summoner.losses}</span>

                        <span>
                          {(
                            (summoner.wins /
                              (summoner.wins + summoner.losses)) *
                            100
                          ).toFixed(0)}
                          %
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPosts}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
