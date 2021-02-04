import React, { useState, useEffect, useLayoutEffect } from 'react'
import style from './leaderboard.module.css'

function Leaderboard({ version, showNav, changeLeaderBoard, leaderboard }) {
  const [rank, setRank] = useState('CHALLENGER')
  const [division, setDivision] = useState('I')
  const [page, setPage] = useState(1)
  const [mapDivision, setMapDivision] = useState(['I', 'II', 'III', 'IV'])

  useEffect(() => {
    showNav()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    changeLeaderBoard(rank, division, page)
    if (rank === 'CHALLENGER' || rank === 'GRANDMASTER' || rank === 'MASTER') {
      setMapDivision(['I'])
    } else {
      setMapDivision(['I', 'II', 'III', 'IV'])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rank, division, page])

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

          <button
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
          <p>PAGE: {page}</p>
        </div>
        <table className={style.tableContainer}>
          <tbody className={style.tbody}>
            <tr className={`${style.row} ${style.rowHeader}`}>
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
                <tr className={`${style.row}`} key={i}>
                  <td className={`${style.td} ${style.number}`}>{i + 1}.</td>
                  <td className={style.td}>
                    {/* <img
                      alt='profile icon'
                      className={style.profileIcon}
                      // Grab profile icon
                      src={
                        `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.icon}.png` ||
                        process.env.PUBLIC_URL + '/images/emptyitem.png'
                      }
                    /> */}

                    {summoner.summonerName}
                  </td>
                  <td className={`${style.td} ${style.Tier}`}>
                    {`${summoner.tier} ${summoner.rank}`}
                  </td>
                  <td className={`${style.td} ${style.points}`}>
                    {summoner.leaguePoints}
                  </td>
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
      </div>
    </>
  )
}

export default Leaderboard
