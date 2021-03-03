import React, { useState, useEffect } from 'react'
import style from './leaderboard.module.css'
import Paginate from '../components/Paginate'

function Leaderboard({
  version,
  showNav,
  changeLeaderBoard,
  leaderboard,
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  region,
  getPlayerName,
}) {
  const [rank, setRank] = useState('CHALLENGER')
  const [division, setDivision] = useState('I')
  const [mapDivision, setMapDivision] = useState(['I', 'II', 'III', 'IV'])

  useEffect(() => {
    showNav()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    changeLeaderBoard(rank)
    if (rank === 'CHALLENGER' || rank === 'GRANDMASTER' || rank === 'MASTER') {
      setMapDivision(['I'])
    } else {
      setMapDivision(['I', 'II', 'III', 'IV'])
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

          {/* <button
            className={page === 1 ? style.none : style.Btn}
            onClick={() =>
              page === 1 ? setPage(1) : setPage((prevPage) => prevPage - 1)
            }
          >
            &lt;
          </button>
          <button
            className={style.Btn}
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            &gt;
          </button>
          <p>PAGE: {page}</p> */}
        </div>
        <table className={style.tableContainer}>
          <tbody className={style.tbody}>
            <tr className={`${style.rowHeader}`}>
              <th className={`${style.td} ${style.number}`}>#</th>
              <th className={style.tdName}>Summoners</th>
              <th className={style.tdTier}>Tier</th>
              <th className={style.td}>LP</th>
              <th className={`${style.tdWinRatio} ${style.winRatioHeader}`}>
                Win Ratio
              </th>
            </tr>
            {leaderboard.map((summoner, i) => (
              <tr className={`${style.row}`} key={i}>
                <td className={`${style.td} ${style.number}`}>
                  {summoner.number}.
                </td>
                <td className={style.tdName}>
                  {summoner.icon ? (
                    <img
                      alt='profile icon'
                      className={style.profileIcon}
                      // Grab profile icon
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.icon}.png`}
                    />
                  ) : null}
                  <div
                    className={style.name}
                    name={summoner.summonerName}
                    region={region}
                    icon={summoner.icon}
                    onClick={getPlayerName}
                  >
                    {summoner.summonerName}
                  </div>
                </td>
                <td className={`${style.tdTier} ${style.Tier}`}>
                  {`${summoner.tier} ${summoner.rank}`}
                </td>
                <td className={`${style.td} ${style.points}`}>
                  {summoner.leaguePoints}
                </td>
                <td className={`${style.tdWinRatio}`}>
                  <div className={style.winRatio}>
                    <div className={style.winsContainer}>
                      <div className={style.wins}>{summoner.wins} W</div>
                    </div>
                    <div
                      style={{
                        minWidth: '25px',
                        textAlign: 'center',
                      }}
                    >
                      <div> - </div>
                    </div>
                    <div className={style.lossContainer}>
                      <div className={style.losses}>{summoner.losses} L</div>
                    </div>

                    <div className={style.ratioContainer}>
                      <div>
                        {(
                          (summoner.wins / (summoner.wins + summoner.losses)) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginate
          postsPerPage={postsPerPage}
          totalPosts={totalPosts}
          paginate={paginate}
          currentPage={currentPage}
          rank={rank}
        />
      </div>
    </>
  )
}

export default Leaderboard
