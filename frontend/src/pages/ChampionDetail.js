import React from "react";
import style from "./championdetail.module.css";
import Tooltip from "../components/Tooltip";

export default function ChampionDetail({ version, champDetail }) {
  console.log(champDetail.recommended[0]);
  return champDetail ? (
    <div>
      <h2>{champDetail.name}</h2>
      <h3>{champDetail.title}</h3>
      <img
        className={style.freeChampsImg}
        alt={champDetail.image.full}
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champDetail.image.full}`}
      />
      <div>
        <h3>Skills</h3>
        <Tooltip
          name={champDetail.passive.name}
          info={champDetail.passive.description}
        >
          <img
            className={style.spellImage}
            alt="champion passive"
            src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champDetail.passive.image.full}`}
          />
        </Tooltip>
        {champDetail.spells.map((spell, i) => (
          <Tooltip
            key={i}
            name={spell.name}
            info={spell.description}
            moreInfo={spell.tooltip}
          >
            <div className={style.spellImageContainer}>
              <img
                className={style.spellImage}
                alt="champion skills"
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
              />
              <span className={style.spellKey}>
                {i === 0 ? "Q" : i === 1 ? "W" : i === 2 ? "E" : "R"}
              </span>
            </div>
          </Tooltip>
        ))}
      </div>
      <div>
        <h3>Recommended Build</h3>
        {champDetail.recommended.map((build) => {
          return build.mode === "CLASSIC"
            ? build.blocks.map((block) => {
                return (
                  <div>
                    <h4>{block.type}</h4>
                    {block.items.map((item) => {
                      return <h5>{item.id}</h5>;
                    })}
                  </div>
                );
                // block.items.map((item) => {
                //   return (
                //     <div>

                //       <h5>{item.id}</h5>
                //     </div>
                //   );
                // });
              })
            : null;
        })}
      </div>
    </div>
  ) : null;
}
