import React from "react";
import style from "./masterycard.module.css";

function MasteryCard({ version, filteredChamps }) {
  return (
    <div className={style.masteryCard}>
      <div className={style.header}>
        <img
          alt="mastery icon"
          src={process.env.PUBLIC_URL + "/images/icons/mastery.png"}
        />
        CHAMPION MASTERY
      </div>

      <div className={style.masteryHeader}>
        <div className={style.championHeader}>CHAMPION</div>
        <div className={style.levelHeader}>LEVEL</div>
        <div className={style.pointsHeader}>POINTS</div>
      </div>

      {filteredChamps.length < 5
        ? filteredChamps.map((champ, i) => {
            return (
              <li key={i} className={style.listContainer}>
                <div className={style.masteryRow}>
                  <div>{i + 1}.</div>
                  <div className={style.champImgContainer}>
                    <img
                      key={i}
                      className={style.championImage}
                      alt={champ.image}
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image}`}
                    />
                  </div>

                  <div className={style.name}>{champ.name}</div>
                  <div className={style.champLvlContainer}>
                    <img
                      className={style.masteryFrame}
                      alt={champ.level}
                      src={
                        champ.level
                          ? process.env.PUBLIC_URL +
                            `/images/masteryicons/level${champ.level}.png`
                          : process.env.PUBLIC_URL +
                            "/images/masteryicons/level1.png"
                      }
                    />
                  </div>

                  <div className={style.points}>
                    {champ.points.toLocaleString("en")}
                  </div>
                </div>
              </li>
            );
          })
        : filteredChamps.slice(0, 5).map((champ, i) => {
            return (
              <li key={i} className={style.listContainer}>
                <div className={style.masteryRow}>
                  <div className={style.number}>{i + 1}.</div>
                  <div className={style.champImgContainer}>
                    <img
                      key={i}
                      className={style.championImage}
                      alt={champ.image}
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image}`}
                    />
                  </div>

                  <div className={style.name}>{champ.name}</div>
                  <div className={style.champLvlContainer}>
                    <img
                      className={style.masteryFrame}
                      alt={champ.level}
                      src={
                        champ.level
                          ? process.env.PUBLIC_URL +
                            `/images/masteryicons/level${champ.level}.png`
                          : process.env.PUBLIC_URL +
                            "/images/masteryicons/level1.png"
                      }
                    />
                  </div>

                  <div className={style.points}>
                    {champ.points.toLocaleString("en")}
                  </div>
                </div>
              </li>
            );
          })}
    </div>
  );
}

export default MasteryCard;
