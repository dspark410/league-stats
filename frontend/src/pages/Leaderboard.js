import React from 'react'
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
}) {
  showNav()
  return (
    <div className={style.overlay}>
      <div style={{ overflowX: 'auto' }}>
        <h1 className={style.leaderHeader}> Ranked Leaderboard</h1>
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
            {solo
              .sort((a, b) => b.leaguePoints - a.leaguePoints)
              .map((summoner, i) => (
                <tr className={style.row} key={i}>
                  <td className={`${style.td} ${style.number}`}>
                    {summoner.number}
                  </td>
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
                  <td className={`${style.td} ${style.Tier}`}>{soloTier}</td>
                  <td className={style.td}>{summoner.leaguePoints}</td>
                  <td className={`${style.tdWinRatio}`}>
                    <div className={style.winRatio}>
                      <span className={style.wins}>{summoner.wins} </span>

                      <span>/</span>
                      <span className={style.losses}>{summoner.losses}</span>

                      <span>
                        {(
                          (summoner.wins / (summoner.wins + summoner.losses)) *
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
  )
}

export default Leaderboard
