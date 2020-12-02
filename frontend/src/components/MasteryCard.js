import React from 'react'
import style from './masterycard.module.css'

function MasteryCard({ filteredChamps, loading }) {
  return (
    <>
      {filteredChamps.length < 3 ? (
        ''
      ) : (
        <div className={style.masteryCardContainer}>
          <div className={style.masteryCard}>
            {loading ? (
              ''
            ) : (
              <img
                className={style.championImage}
                alt={filteredChamps[0].image}
                src={`http://ddragon.leagueoflegends.com/cdn/10.24.1/img/champion/${filteredChamps[0].image}.png`}
              />
            )}
            {loading ? (
              ''
            ) : (
              <img
                alt={'mastery level border'}
                src={
                  filteredChamps[0].level
                    ? process.env.PUBLIC_URL +
                      `/images/level${filteredChamps[0].level}.png`
                    : process.env.PUBLIC_URL + '/images/level0.png'
                }
              />
            )}

            <div className={style.name}>
              <img
                src={process.env.PUBLIC_URL + '/images/champion.png'}
                alt='champion icon'
              />
              <span>{loading ? '' : filteredChamps[0].name}</span>
            </div>
            <div className={style.points}>
              <img
                src={process.env.PUBLIC_URL + '/images/mastery.png'}
                alt='mastery icon'
              />
              <span>
                {loading ? '' : filteredChamps[0].points.toLocaleString('en')}{' '}
                pts
              </span>
            </div>
            <div className={style.level}>
              <img
                src={process.env.PUBLIC_URL + '/images/level.png'}
                alt='mastery icon'
              />
              <span>mastery lvl {loading ? '' : filteredChamps[0].level}</span>
            </div>
          </div>
          <div className={style.masteryCard}>
            {loading ? (
              ''
            ) : (
              <img
                className={style.championImage}
                alt={filteredChamps[1].image}
                src={`http://ddragon.leagueoflegends.com/cdn/10.24.1/img/champion/${filteredChamps[1].image}.png`}
              />
            )}
            {loading ? (
              ''
            ) : (
              <img
                alt={'mastery level border'}
                src={
                  filteredChamps[1].level
                    ? process.env.PUBLIC_URL +
                      `/images/level${filteredChamps[1].level}.png`
                    : process.env.PUBLIC_URL + '/images/level0.png'
                }
              />
            )}
            <div className={style.name}>
              <img
                src={process.env.PUBLIC_URL + '/images/champion.png'}
                alt='champion icon'
              />
              <span>{loading ? '' : filteredChamps[1].name}</span>
            </div>
            <div className={style.points}>
              <img
                src={process.env.PUBLIC_URL + '/images/mastery.png'}
                alt='mastery icon'
              />
              <span>
                {loading ? '' : filteredChamps[1].points.toLocaleString('en')}{' '}
                pts
              </span>
            </div>
            <div className={style.level}>
              <img
                src={process.env.PUBLIC_URL + '/images/level.png'}
                alt='mastery icon'
              />
              <span>mastery lvl {loading ? '' : filteredChamps[1].level}</span>
            </div>
          </div>
          <div className={style.masteryCard}>
            {loading ? (
              ''
            ) : (
              <img
                className={style.championImage}
                alt={filteredChamps[2].image}
                src={`http://ddragon.leagueoflegends.com/cdn/10.24.1/img/champion/${filteredChamps[2].image}.png`}
              />
            )}
            {loading ? (
              ''
            ) : (
              <img
                alt={'mastery level border'}
                src={
                  filteredChamps[2].level
                    ? process.env.PUBLIC_URL +
                      `/images/level${filteredChamps[2].level}.png`
                    : process.env.PUBLIC_URL + '/images/level0.png'
                }
              />
            )}
            <div className={style.name}>
              <img
                src={process.env.PUBLIC_URL + '/images/champion.png'}
                alt='champion icon'
              />
              <span>{loading ? '' : filteredChamps[2].name}</span>
            </div>
            <div className={style.points}>
              <img
                src={process.env.PUBLIC_URL + '/images/mastery.png'}
                alt='mastery icon'
              />
              <span>
                {loading ? '' : filteredChamps[2].points.toLocaleString('en')}{' '}
                pts
              </span>
            </div>
            <div className={style.level}>
              <img
                src={process.env.PUBLIC_URL + '/images/level.png'}
                alt='mastery icon'
              />
              <span>mastery lvl {loading ? '' : filteredChamps[2].level}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MasteryCard
