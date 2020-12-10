import React from "react";
import style from "./unrankedcard.module.css";

export default function UnrankedCard({ queueType }) {
  // When player doesn't have a rank, displays unranked
  // If player only plays 1 type of rank, ternary to determine which unrank card to display
  return (
    <div className={style.singleCardContainer}>
      <img alt="banner" src={process.env.PUBLIC_URL + `/images/banner.png`} />
      <img
        alt="unranked"
        className={style.emblemImage}
        src={process.env.PUBLIC_URL + `/images/emblems/UNRANKED.png`}
      />
      <span className={style.queue}>
        {queueType.split("_").slice(0, 2).join(" ")}
      </span>
      <span className={style.rank}>Unranked</span>
      <span className={style.ratio}>0 wins / 0 losses</span>
    </div>
  );
}
