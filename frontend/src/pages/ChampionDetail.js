import React from "react";
import style from "./championdetail.module.css";

export default function ChampionDetail({ version, champDetail, itemObj }) {
  return champDetail ? (
    <div>
      <h2>{champDetail.name}</h2>
      <h3>{champDetail.title}</h3>
      <img
        className={style.freeChampsImg}
        alt={champDetail.image.full}
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champDetail.image.full}`}
      />
      {champDetail.tags.map((tag) => (
        <span>{tag}</span>
      ))}
      <h3>Ally Tips</h3>
      {champDetail.allytips.map((tip) => (
        <p>{tip}</p>
      ))}

      <h3>Enemy Tips</h3>
      {champDetail.enemytips.map((tip) => (
        <p>{tip}</p>
      ))}

      <div>
        <h3>Recommended Build</h3>
        {champDetail.recommended.map((build, i) => {
          return build.mode === "CLASSIC" ? (
            <div key={i}>
              <h3>{build.type.split("-")[1]}</h3>
              {build.blocks.map((block, i) => {
                return (
                  <div key={i}>
                    <h4>{block.type}</h4>
                    {block.items.map((item, i) => {
                      return <div>{itemObj[item.id].name}</div>;
                    })}
                  </div>
                );
              })}
            </div>
          ) : null;
        })}
      </div>
      <div>
        <h3>Skills</h3>
        <div>
          <p>Passive</p>
          <img
            className={style.spellImage}
            alt="champion passive"
            src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champDetail.passive.image.full}`}
          />
          <p>{champDetail.passive.name}</p>
          <p>{champDetail.passive.description}</p>
        </div>

        {champDetail.spells.map((spell, i) => (
          <div className={style.spellImageContainer}>
            <p className={style.spellKey}>
              {i === 0 ? "Q" : i === 1 ? "W" : i === 2 ? "E" : "R"}
            </p>
            <img
              className={style.spellImage}
              alt="champion skills"
              src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
            />
            <p>{spell.name}</p>
            <p>{spell.description}</p>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
