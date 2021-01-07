import React from "react";
import style from "./championdetail.module.css";
import Tooltip from "../components/Tooltip";

export default function ChampionDetail({ version, champDetail, itemObj }) {
  let key;
  console.log("key", champDetail.key, champDetail.key.length);

  if (champDetail.key.length === 1) {
    key = "000" + champDetail.key;
  } else if (champDetail.key.length === 2) {
    key = "00" + champDetail.key;
  } else if (champDetail.key.length === 3) {
    key = "0" + champDetail.key;
  } else {
    key = champDetail.key;
  }

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
                      return (
                        <div>
                          <p>{itemObj[item.id].name}</p>
                          <Tooltip
                            name={itemObj[item.id].name}
                            info={itemObj[item.id].description}
                            moreInfo={itemObj[item.id].gold.total}
                          >
                            <img
                              alt={itemObj[item.id].image.full}
                              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${
                                itemObj[item.id].image.full
                              }`}
                            />
                          </Tooltip>
                        </div>
                      );
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
          <video
            className={style.skillVideo}
            autoPlay
            playsInline
            loop
            muted
            src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_P1.mp4`}
          />
        </div>

        {champDetail.spells.map((spell, i) => {
          const buttonKey = i === 0 ? "Q" : i === 1 ? "W" : i === 2 ? "E" : "R";
          return (
            <div className={style.spellImageContainer}>
              <p className={style.spellKey}>{buttonKey}</p>
              <img
                className={style.spellImage}
                alt="champion skills"
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
              />
              <p>{spell.name}</p>
              <p>{spell.description}</p>
              <p>Spell Cooldown: {spell.cooldownBurn} seconds</p>
              <p>
                Spell Cost: {spell.costBurn} {champDetail.partype}
              </p>
              <video
                className={style.skillVideo}
                autoPlay
                playsInline
                loop
                muted
                src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${buttonKey}1.mp4`}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
}
