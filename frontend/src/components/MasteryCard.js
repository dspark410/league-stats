import React from 'react'
import style from './masterycard.module.css'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

function MasteryCard({ version }) {
  const {
    summoner: {
      data: { mastery },
    },
  } = useSelector((state) => state)

  const history = useHistory()

  const clickHandler = (event) => {
    const getChamp = event.target.getAttribute('name')
    history.push(`/champions/${getChamp.toLowerCase()}`)
  }

  return version ? (
    <div className={style.masteryCard}>
      <div className={style.header}>
        <img
          alt='mastery icon'
          src='https://res.cloudinary.com/mistahpig/image/upload/v1621882123/league-stats/icons/mastery_yqwggf.png'
        />
        CHAMPION MASTERY
      </div>

      <div className={style.masteryHeader}>
        <div className={style.championHeader}>CHAMPION</div>
        <div className={style.levelHeader}>LEVEL</div>
        <div className={style.pointsHeader}>POINTS</div>
      </div>

      {mastery &&
        mastery.map((champ, i) => {
          return (
            <li key={i} className={style.listContainer}>
              <div className={style.masteryRow}>
                <div className={style.number}>{i + 1}.</div>
                <div className={style.champImgContainer}>
                  <Link to={`/champions/${champ.id.toLowerCase()}`}>
                    <img
                      onClick={clickHandler}
                      key={i}
                      name={champ.id}
                      className={style.championImage}
                      alt={champ.image}
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image}`}
                    />
                  </Link>
                </div>
                <Link to={`/champions/${champ.id.toLowerCase()}`}>
                  <div
                    onClick={clickHandler}
                    name={champ.id}
                    className={style.name}>
                    {champ.id === 'MonkeyKing' ? champ.name : champ.id}
                  </div>
                </Link>
                <div className={style.champLvlContainer}>
                  <img
                    className={style.masteryFrame}
                    alt={champ.level}
                    src={
                      champ.level
                        ? `https://res.cloudinary.com/mistahpig/image/upload/v1621898522/league-stats/mastery%20icons/level${champ.level}.png`
                        : 'https://res.cloudinary.com/mistahpig/image/upload/v1621898522/league-stats/mastery%20icons/level1.png'
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
    ''
  )
}

export default MasteryCard
