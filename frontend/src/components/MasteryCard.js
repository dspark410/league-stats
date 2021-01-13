import React from 'react'
import style from './masterycard.module.css'

function MasteryCard({ version, filteredChamps }) {
  return (
    <div className={style.masteryCard}>
      <div className={style.header}>
        <img src={process.env.PUBLIC_URL + '/images/icons/mastery.png'} />
        Champion Mastery
      </div>
      <div className={style.masteryHeader}>
        <div className={style.championHeader}>Champion</div>
        <div className={style.levelHeader}>Level</div>
        <div className={style.pointsHeader}>Points</div>
      </div>

      {filteredChamps.length < 5
        ? filteredChamps.map((champ, i) => {
            return (
              <li>
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
                      alt={'mastery level border'}
                      src={
                        champ.level
                          ? process.env.PUBLIC_URL +
                            `/images/masteryicons/level${champ.level}.png`
                          : process.env.PUBLIC_URL +
                            '/images/masteryicons/level1.png'
                      }
                    />
                  </div>

                  <div className={style.points}>
                    {champ.points.toLocaleString('en')}
                  </div>
                </div>
              </li>
            )
          })
        : filteredChamps.slice(0, 5).map((champ, i) => {
            return (
              <li>
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
                      alt={'mastery level border'}
                      src={
                        champ.level
                          ? process.env.PUBLIC_URL +
                            `/images/masteryicons/level${champ.level}.png`
                          : process.env.PUBLIC_URL +
                            '/images/masteryicons/level1.png'
                      }
                    />
                  </div>

                  <div className={style.points}>
                    {champ.points.toLocaleString('en')}
                  </div>
                </div>
              </li>
            )
          })}

      {/* 

      <img
        className={style.masteryFrame}
        alt={'mastery level border'}
        src={
          masteryChamp.level
            ? process.env.PUBLIC_URL +
              `/images/masteryicons/level${masteryChamp.level}.png`
            : process.env.PUBLIC_URL + '/images/masteryicons/level1.png'
        }
      />

      <div className={style.name}>{masteryChamp.name}</div>
      <div className={style.points}>
        {masteryChamp.points.toLocaleString('en')}pts
      </div>
      <div className={style.level}>Mastery lvl {masteryChamp.level}</div> */}
    </div>
  )
}

export default MasteryCard
