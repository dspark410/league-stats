import React, { useState } from 'react'
import style from './leaderboardtable.module.css'
import Paginate from './Paginate'
import { AiOutlineInfoCircle } from 'react-icons/ai'
function LeaderboardDiamondToIron({
  version,
  leaderboard,
  totalPosts,
  postsPerPage,
  currentPage,
  paginate,
  rank,
  region,
  getPlayerName,
  page,
  nextPage,
  prevPage,
}) {
  return (
    <>
      <table className={style.tableContainer}>
        <div className={style.sorted}>
          <AiOutlineInfoCircle className={style.infoIcon} />
          <div>
            Diamond - Iron tiers are sorted every 5 pages. Summoner icons are
            not shown.
          </div>
        </div>

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
        firstLast={false}
        table={false}
        nextPage={nextPage}
        prevPage={prevPage}
        page={page}
      />
    </>
  )
}

export default LeaderboardDiamondToIron
