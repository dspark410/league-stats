import React from 'react'
import style from './masterycard.module.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function MasteryCard({ version, filteredChamps, skeleton }) {
  return (
    <SkeletonTheme
      duration={3}
      color=' rgba(59, 43, 68)'
      highlightColor='rgb(91, 66, 105)'
    >
      {!skeleton ? (
        <div className={style.masteryCard}>
          <div className={style.header}>
            <img
              alt='mastery icon'
              src={process.env.PUBLIC_URL + '/images/icons/mastery.png'}
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
        </div>
      ) : (
        <div className={style.skeletonMasteryCard}>
          <div className={style.header}>
            <Skeleton width={200} height={45} />
          </div>

          <div className={style.skeletonMasteryHeader}>
            <Skeleton style={{ marginLeft: '15px' }} width={80} height={21} />
            <Skeleton width={70} height={21} />
            <Skeleton width={70} height={21} />
          </div>

          {filteredChamps.length < 5
            ? filteredChamps.map((champ, i) => {
                return (
                  <li key={i} className={style.skeletonListContainer}>
                    <div className={style.masteryRow}>
                      <div className={style.champImgContainer}>
                        <Skeleton circle={true} width={35} height={35} />
                      </div>

                      <div className={style.name}>
                        {' '}
                        <Skeleton width={70} height={20} />
                      </div>
                      <div className={style.champLvlContainer}>
                        <Skeleton
                          style={{ marginLeft: '19px' }}
                          width={30}
                          height={30}
                        />
                      </div>

                      <div className={style.points}>
                        <Skeleton
                          style={{ marginLeft: '14px' }}
                          width={70}
                          height={20}
                        />
                      </div>
                    </div>
                  </li>
                )
              })
            : filteredChamps.slice(0, 5).map((champ, i) => {
                return (
                  <li key={i} className={style.skeletonListContainer}>
                    <div className={style.masteryRow}>
                      <div className={style.champImgContainer}>
                        <Skeleton circle={true} width={35} height={35} />
                      </div>

                      <div className={style.name}>
                        {' '}
                        <Skeleton width={70} height={20} />
                      </div>
                      <div className={style.champLvlContainer}>
                        <Skeleton
                          style={{ marginLeft: '19px' }}
                          width={30}
                          height={30}
                        />
                      </div>

                      <div className={style.points}>
                        <Skeleton
                          style={{ marginLeft: '14px' }}
                          width={70}
                          height={20}
                        />
                      </div>
                    </div>
                  </li>
                )
              })}
        </div>
      )}
    </SkeletonTheme>
  )
}

export default MasteryCard
