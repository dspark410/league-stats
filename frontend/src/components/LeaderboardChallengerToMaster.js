import React, { useState, useEffect } from 'react'
import style from './leaderboard.module.css'
import { useSelector } from 'react-redux'
import Paginate from './Paginate'

function LeaderboardChallengerToMaster({
  leaderboard,
  paginate,
  getPlayerName,
  data,
}) {
  const [profileIcon, setProfileIcon] = useState([])
  const url = process.env.REACT_APP_API_ENDPOINT || ''

  const {
    dependency: { version },
    input: {
      summonerInput: { region },
    },
  } = useSelector((state) => state)

  // call for profile icon and adding to the leaderboard object
  useEffect(() => {
    let mounted = true
    const controller = new AbortController()

    if (leaderboard && leaderboard.length > 0) {
      Promise.all(
        leaderboard.map(async (player) => {
          try {
            const res = await fetch(
              `${url}/api/getSummonerId/${player.summonerId}/${region}`,
              { signal: controller.signal }
            )
            const data = await res.json()

            if (data.profileIconId === 0) {
              player.icon = data.profileIconId.toString()
            } else {
              player.icon = data.profileIconId
            }
            return player
          } catch (error) {
            console.log(error)
          }
        })
      ).then((res) => {
        if (mounted) {
          setProfileIcon(res)
        }
      })
    }

    return () => {
      mounted = false
      controller.abort()
    }

    // eslint-disable-next-line
  }, [leaderboard])

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
      <Paginate paginate={paginate} prevNext={true} firstLast={true} />
    </>
  )
}

export default LeaderboardChallengerToMaster
