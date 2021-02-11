import React from 'react'
import style from './historycardsimple.module.css'
import { IoIosArrowDown } from 'react-icons/io'

function HistoryCardSimple({ game, clickArrow }) {
  return (
    <div
      className={`${style.historyCard} ${
        game.playerInfo.stats.win ? style.historyCardWin : style.historyCardLoss
      }`}
    >
      <div className={style.firstCol}>
        <img
          alt={game.championImage}
          src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${game.championImage}`}
        />
      </div>
      <div className={style.secondCol}>
        <p>{game.gameType.split(' ').slice(0, 3).join(' ')}</p>
        <p
          className={
            game.playerInfo.stats.win ? style.subTextWin : style.subTextLoss
          }
        >
          {game.gameCreation.split(' ').slice(0, 4).join(' ')}
        </p>
      </div>
      <div className={style.thirdCol}>
        <p>{game.playerInfo.stats.win ? 'Victory' : 'Defeat'}</p>
        <p
          className={
            game.playerInfo.stats.win ? style.subTextWin : style.subTextLoss
          }
        >{`${Math.floor(game.gameDuration / 60)}m ${Math.ceil(
          game.gameDuration % 60
        )}s `}</p>
      </div>
      <div className={style.fourthCol}>
        <p>
          {`${game.playerInfo.stats.kills} /
      ${game.playerInfo.stats.deaths} /
      ${game.playerInfo.stats.assists}`}
        </p>

        <div
          className={
            game.playerInfo.stats.win ? style.subTextWin : style.subTextLoss
          }
        >
          KDA
        </div>
      </div>
      <div className={style.fifthCol}>
        <span>
          {(
            (game.playerInfo.stats.totalMinionsKilled +
              game.playerInfo.stats.neutralMinionsKilled) /
            (game.gameDuration / 60)
          ).toFixed(1)}
        </span>
        <div
          className={
            game.playerInfo.stats.win ? style.subTextWin : style.subTextLoss
          }
        >
          cs/min
        </div>
      </div>
      <IoIosArrowDown className={style.sixthCol} onClick={clickArrow} />
    </div>
  )
}

export default HistoryCardSimple
