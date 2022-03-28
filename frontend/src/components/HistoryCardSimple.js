import React from 'react'
import style from './historycardsimple.module.css'
import { IoIosArrowDown } from 'react-icons/io'

function HistoryCardSimple({ game, clickArrow, open }) {
  const timeConverter = (creation, duration) => {
    const secs = creation / 1000 - duration
    const mins = Math.floor(secs / 60)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (mins < 60) {
      return `${mins}  Mins Ago`
    } else if (hours < 24) {
      return hours === 1 ? `${hours} Hour Ago` : `${hours} Hours Ago`
    } else if (days < 30) {
      return days === 1 ? `${days} Day Ago` : `${days} Days Ago`
    } else if (months < 12) {
      return months === 1 ? `${months} Month Ago` : `${months} Months Ago`
    } else if (years <= 1) {
      return years === 1 ? `${years} Year Ago` : `${years} Years Ago`
    } else {
      return game.gameCreation.split(' ').slice(0, 4).join(' ')
    }
  }
  return game.playerInfo ? (
    <div
      className={`${!open ? style.historyCard : style.hideHistoryCard} ${
        game.playerInfo.win ? style.historyCardWin : style.historyCardLoss
      }`}>
      <div className={style.firstCol}>
        <img
          alt={game.championImage}
          src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${game.championImage}`}
        />
      </div>
      <div className={style.secondCol}>
        <p>
          {game.gameType === 'Ultimate Spellbook games'
            ? 'Ult Spellbook'
            : !game.gameType
            ? 'Custom Games'
            : game.gameType.split(' ').slice(0, 3).join(' ')}
        </p>
        <p
          className={
            game.playerInfo.win ? style.subTextWin : style.subTextLoss
          }>
          {timeConverter(
            Date.now() - game.originalDate,
            game.gameDuration / 1000 / 60
          )}
        </p>
      </div>
      <div className={style.thirdCol}>
        <p>{game.playerInfo.win ? 'Victory' : 'Defeat'}</p>
        <p
          className={
            game.playerInfo.win ? style.subTextWin : style.subTextLoss
          }>
          {JSON.stringify(game.gameDuration).length <= 4
            ? `${Math.floor(game.gameDuration / 60)}m ${Math.floor(
                game.gameDuration % 60
              )}s `
            : `${Math.floor(game.gameDuration / 1000 / 60)}m ${Math.floor(
                game.gameDuration % 60
              )}s `}
        </p>
      </div>
      <div className={style.fourthCol}>
        <p>
          {`${game.playerInfo.kills} /
    ${game.playerInfo.deaths} /
    ${game.playerInfo.assists}`}
        </p>

        <div
          className={
            game.playerInfo.win ? style.subTextWin : style.subTextLoss
          }>
          KDA
        </div>
      </div>
      <div className={style.fifthCol}>
        <span>
          {JSON.stringify(game.gameDuration).length <= 4
            ? (
                ((game.playerInfo.totalMinionsKilled +
                  game.playerInfo.neutralMinionsKilled) /
                  game.gameDuration) *
                60
              ).toFixed(1)
            : (
                ((game.playerInfo.totalMinionsKilled +
                  game.playerInfo.neutralMinionsKilled) /
                  game.gameDuration) *
                60 *
                1000
              ).toFixed(1)}
        </span>
        <div
          className={
            game.playerInfo.win ? style.subTextWin : style.subTextLoss
          }>
          cs/min
        </div>
      </div>
      <IoIosArrowDown className={style.sixthCol} onClick={clickArrow} />
    </div>
  ) : null
}

export default HistoryCardSimple
