/** @format */

import React, { useState, useEffect } from 'react'
import style from './leaderboardtable.module.css'
import axios from 'axios'
import Paginate from './Paginate'

function LeaderboardChallengerToMaster({
  version,
  leaderboard,
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  rank,
  region,
  getPlayerName,
  leaderboardDone,
  setLeaderboardDone,
}) {
  const [profileIcon, setProfileIcon] = useState([])

  const url = process.env.REACT_APP_API_ENDPOINT || ''

  let source = axios.CancelToken.source()

  // call for profile icon and adding to the leaderboard object
  useEffect(() => {
    let mounted = true
    const iconArr = []

    if (mounted && leaderboardDone) {
      Promise.all(
        leaderboard.map((player) => {
          return axios
            .get(`${url}/api/getSummonerId/${player.summonerId}/${region}`, {
              cancelToken: source.token,
            })
            .then((res) => {
              if (res.data.profileIconId === 0) {
                player.icon = res.data.profileIconId.toString()
              } else {
                player.icon = res.data.profileIconId
              }

              iconArr.push(player)
            })
        })
      ).then(() => {
        setProfileIcon(iconArr.sort((a, b) => b.leaguePoints - a.leaguePoints))
        setLeaderboardDone(false)
      })
    }

    return () => {
      mounted = false

      source.cancel('leaderboard table component got unmounted')
    }
    // eslint-disable-next-line
  }, [leaderboardDone, currentPage])

  return (
    <>
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
          {profileIcon.map((summoner, i) => (
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
                  onClick={getPlayerName}>
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
                    }}>
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
      {/* <Paginate
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
        currentPage={currentPage}
        rank={rank}
        firstLast={true}
        table={true}
        setLeaderboardDone={setLeaderboardDone}
      /> */}
    </>
  )
}

export default LeaderboardChallengerToMaster
