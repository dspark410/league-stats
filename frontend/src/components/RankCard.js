import React from "react";
import style from "./rankcard.module.css";

function RankCard({ rank }) {
  return (
    // Rank card to display players rank and points if available
    <div className={style.singleCardContainer}>
      <img alt="banner" src={process.env.PUBLIC_URL + `/images/banner.png`} />
      <img
        alt={rank.tier}
        className={style.emblemImage}
        src={process.env.PUBLIC_URL + `/images/emblems/${rank.tier}.png`}
      />

      <span className={style.queue}>
        {rank.queueType.split("_").slice(0, 2).join(" ")}
      </span>

      <span className={style.rank}>
        {`${rank.tier} ${rank.rank} (${rank.leaguePoints})`}
      </span>

      <span
        className={style.ratio}
      >{`${rank.wins} wins / ${rank.losses} losses`}</span>
    </div>
  );
}

export default RankCard;
