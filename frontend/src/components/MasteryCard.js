import React from 'react'
import style from './masterycard.module.css'

function MasteryCard({ filteredChamps, loading }) {
  return (
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
              filteredChamps[0].level === 7
                ? process.env.PUBLIC_URL + '/images/level7.png'
                : filteredChamps[0].level === 6
                ? process.env.PUBLIC_URL + '/images/level6.png'
                : filteredChamps[0].level === 5
                ? process.env.PUBLIC_URL + '/images/level5.png'
                : filteredChamps[0].level === 4
                ? process.env.PUBLIC_URL + '/images/level4.png'
                : filteredChamps[0].level === 3
                ? process.env.PUBLIC_URL + '/images/level3.png'
                : filteredChamps[0].level === 2
                ? process.env.PUBLIC_URL + '/images/level2.png'
                : filteredChamps[0].level === 1
                ? process.env.PUBLIC_URL + '/images/level1.png'
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
            {loading ? '' : filteredChamps[0].points.toLocaleString('en')} pts
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
              filteredChamps[1].level === 7
                ? process.env.PUBLIC_URL + '/images/level7.png'
                : filteredChamps[1].level === 6
                ? process.env.PUBLIC_URL + '/images/level6.png'
                : filteredChamps[1].level === 5
                ? process.env.PUBLIC_URL + '/images/level5.png'
                : filteredChamps[1].level === 4
                ? process.env.PUBLIC_URL + '/images/level4.png'
                : filteredChamps[1].level === 3
                ? process.env.PUBLIC_URL + '/images/level3.png'
                : filteredChamps[1].level === 2
                ? process.env.PUBLIC_URL + '/images/level2.png'
                : filteredChamps[1].level === 1
                ? process.env.PUBLIC_URL + '/images/level1.png'
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
            {loading ? '' : filteredChamps[1].points.toLocaleString('en')} pts
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
              filteredChamps[2].level === 7
                ? process.env.PUBLIC_URL + '/images/level7.png'
                : filteredChamps[2].level === 6
                ? process.env.PUBLIC_URL + '/images/level6.png'
                : filteredChamps[2].level === 5
                ? process.env.PUBLIC_URL + '/images/level5.png'
                : filteredChamps[2].level === 4
                ? process.env.PUBLIC_URL + '/images/level4.png'
                : filteredChamps[2].level === 3
                ? process.env.PUBLIC_URL + '/images/level3.png'
                : filteredChamps[2].level === 2
                ? process.env.PUBLIC_URL + '/images/level2.png'
                : filteredChamps[2].level === 1
                ? process.env.PUBLIC_URL + '/images/level1.png'
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
            {loading ? '' : filteredChamps[2].points.toLocaleString('en')} pts
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
      {/* <div className={style.masteryCard}>
        {loading ? (
          ''
        ) : (
          <img
            alt={filteredChamps[0].image}
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${filteredChamps[0].image}_0.jpg`}
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
            {loading ? '' : filteredChamps[0].points.toLocaleString('en')} pts
          </span>
        </div>
        <div className={style.level}>
          {loading ? '' : filteredChamps[0].level}
        </div>
      </div>
      <div className={style.masteryCard}>
        {loading ? (
          ''
        ) : (
          <img
            alt={filteredChamps[1].image}
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${filteredChamps[1].image}_0.jpg`}
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
            {loading ? '' : filteredChamps[1].points.toLocaleString('en')} pts
          </span>
        </div>
        <div className={style.level}>
          {' '}
          {loading ? '' : filteredChamps[1].level}
        </div>
      </div>
      <div className={style.masteryCard}>
        {loading ? (
          ''
        ) : (
          <img
            alt={filteredChamps[2].image}
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${filteredChamps[2].image}_0.jpg`}
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
            {loading ? '' : filteredChamps[2].points.toLocaleString('en')} pts
          </span>
        </div>
        <div className={style.level}>
          {' '}
          {loading ? '' : filteredChamps[2].level}
        </div>
      </div> */}
    </div>
  )
}

export default MasteryCard
