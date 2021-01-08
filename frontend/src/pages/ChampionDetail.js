import React, { useState } from "react";
import style from "./championdetail.module.css";
import Tooltip from "../components/Tooltip";
import Loader from "../components/Loader";

export default function ChampionDetail({ version, champDetail, itemObj }) {
  const [video, setVideo] = useState("Q");
  const [loading, setLoading] = useState(false);

  const selectVideo = (e) => {
    setLoading(true);
    const key = e.target.getAttribute("value");
    setVideo(key);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  let key;

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
    <div className={style.champDetailContainer}>
      <div className={style.grid}>
        <div className={style.row1Col1}>
          <img
            className={style.freeChampsImg}
            alt={champDetail.image.full}
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champDetail.image.full}`}
          />
          <h2>{champDetail.name}</h2>
          <h3>{champDetail.title}</h3>
          <div className={style.tag}>
            {champDetail.tags.map((tag) => (
              <span className={style.tagSpan}>{tag}</span>
            ))}
          </div>
        </div>
        <div className={style.row1Col2}>
          <div className={style.row1}>
            <h3>Ally Tips</h3>
            {champDetail.allytips.map((tip) => (
              <span>{tip}</span>
            ))}
          </div>

          <div className={style.row2}>
            <h3>Enemy Tips</h3>
            {champDetail.enemytips.map((tip) => (
              <span>{tip}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={style.grid2}>
        <div className={style.buildContainer}>
          <h3>Recommended Build</h3>
          {champDetail.recommended.map((build, i) => {
            return build.mode === "CLASSIC" ? (
              <div className={style.buildHeader} key={i}>
                {/* <h3>{build.type.split('-')[1]}</h3> */}
                {build.blocks.map((block, i) => {
                  return (
                    <div className={style.buildHeaderContainer} key={i}>
                      <h4>{block.type}</h4>
                      <div className={style.buildType}>
                        {block.items.map((item, i) => {
                          return (
                            <div className={style.itemContainer}>
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
                    </div>
                  );
                })}
              </div>
            ) : null;
          })}
        </div>

        <div className={style.Container}>
          <h3>Skills</h3>
          <div className={style.spellContainer}>
            <div className={style.passiveImageContainer}>
              <p>Passive</p>
              <img
                className={style.spellImage}
                alt="champion passive"
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champDetail.passive.image.full}`}
              />
              {/* <p>{champDetail.passive.name}</p>
          <p>{champDetail.passive.description}</p> */}
            </div>
            {champDetail.spells.map((spell, i) => {
              const buttonKey =
                i === 0 ? "Q" : i === 1 ? "W" : i === 2 ? "E" : "R";
              const tooltipInfo = `
                  <p>Spell Cooldown: ${spell.cooldownBurn} seconds</p>
                  <p>
                    Spell Cost: ${spell.costBurn} ${champDetail.partype}
                  </p>
                `;

              console.log(spell.cooldownBurn);
              return (
                <div className={style.spellImageContainer}>
                  <p className={style.spellKey}>{buttonKey}</p>
                  <Tooltip
                    name={spell.name}
                    info={spell.description}
                    moreInfo={tooltipInfo}
                  >
                    <img
                      onClick={selectVideo}
                      index={i}
                      value={buttonKey}
                      className={`${style.spellImage} ${
                        video === buttonKey && style.spellImageActive
                      }`}
                      alt="champion skills"
                      src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                    />
                  </Tooltip>
                  {/* <p>{spell.name}</p>
              <p>{spell.description}</p>
              <p>Spell Cooldown: {spell.cooldownBurn} seconds</p>
              <p>
                Spell Cost: {spell.costBurn} {champDetail.partype}
              </p> */}
                </div>
              );
            })}
          </div>
          {loading ? (
            <Loader />
          ) : (
            <video
              className={style.skillVideo}
              autoPlay
              playsInline
              loop
              muted
              src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${video}1.mp4`}
            />
          )}
        </div>
      </div>
    </div>
  ) : null;
}
