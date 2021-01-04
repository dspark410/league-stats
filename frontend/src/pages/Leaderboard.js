import React from "react";

import style from "./leaderboard.module.css";

function Leaderboard({ version, solo, soloTier }) {
  return (
    <>
      <table className={style.tableContainer}>
        <tbody className={style.tbody}>
          <tr className={style.row}>
            <th className={style.td}>#</th>
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
                <td className={style.td}>{i + 1}</td>
                <td className={style.td}>
                  <img
                    alt="profile icon"
                    className={style.profileIcon}
                    // Grab profile icon
                    src={
                      `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.icon}.png` ||
                      process.env.PUBLIC_URL + "/images/emptyitem.png"
                    }
                  />

                  {summoner.summonerName}
                </td>
                <td className={style.td}>{soloTier}</td>
                <td className={style.td}>{summoner.leaguePoints}</td>
                <td className={`${style.tdWinRatio}`}>
                  <div className={style.winRatio}>
                    <span>{summoner.wins}/</span>
                    <span>{summoner.losses}</span>
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
    </>
  );
}

export default Leaderboard;
