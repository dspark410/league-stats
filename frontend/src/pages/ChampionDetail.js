import React from "react";
import style from "./championdetail.module.css";

export default function ChampionDetail({ version, champDetail }) {
  return champDetail ? (
    <div>
      <h2>{champDetail.name}</h2>
      <h3>{champDetail.title}</h3>
      <img
        className={style.freeChampsImg}
        alt={champDetail.image.full}
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champDetail.image.full}`}
      />
    </div>
  ) : null;
}
