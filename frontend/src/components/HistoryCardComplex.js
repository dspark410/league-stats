import React from 'react'
import style from './historycardcomplex.module.css'
import Tooltip from './Tooltip'
import ItemHistory from './ItemHistory'
import { IoIosArrowUp } from 'react-icons/io'
import { runeDescriptions } from '../utils/constant'

function HistoryCardComplex({
  game,
  spells,
  runes,
  summonerInfo,
  getPlayerName,
}) {
  // Get info from Session Storage
  const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))

  return (
    <div
      className={`${style.historyCardComplex} ${
        game.playerInfo.stats.win ? style.historyCardWin : style.historyCardLoss
      }`}
    >
      <div className={`${style.historyCard} `}>
        <div className={style.firstCol}>
          <p>{game.gameType.split(' ').slice(0, 3).join(' ')}</p>
          <p>{game.playerInfo.stats.win ? 'Victory' : 'Defeat'}</p>
          <p
            className={
              game.playerInfo.stats.win ? style.subTextWin : style.subTextLoss
            }
          >
            {game.gameCreation.split(' ').slice(0, 4).join(' ')}
          </p>

          <p
            className={
              game.playerInfo.stats.win ? style.subTextWin : style.subTextLoss
            }
          >{`${Math.floor(game.gameDuration / 60)}m ${Math.ceil(
            game.gameDuration % 60
          )}s `}</p>
        </div>
        <div className={style.secondCol}>
          <div className={style.secondCard}>
            <div className={style.imageContainer}>
              <div className={style.championImg}>
                <img
                  className={style.secondColImg}
                  alt={game.championImage}
                  src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${game.championImage}`}
                />
              </div>

              <div className={style.summonerSpellContainer}>
                {spells.map(
                  (spell, i) =>
                    +spell.key === game.playerInfo.spell1Id && (
                      <Tooltip
                        key={i}
                        name={spell.name}
                        info={spell.description}
                      >
                        <img
                          alt={spell.name}
                          className={style.summonerSpell}
                          src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/spell/${spell.id}.png`}
                        />
                      </Tooltip>
                    )
                )}

                {spells.map(
                  (spell, i) =>
                    +spell.key === game.playerInfo.spell2Id && (
                      <Tooltip
                        key={i}
                        name={spell.name}
                        info={spell.description}
                      >
                        <img
                          key={i}
                          alt={spell.name}
                          className={style.summonerSpell2}
                          src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/spell/${spell.id}.png`}
                        />
                      </Tooltip>
                    )
                )}
              </div>
              <div className={style.summonerSpellContainer}>
                {runes
                  .filter((rune) => {
                    return rune.id === game.playerInfo.stats.perkPrimaryStyle
                  })
                  .map((rune, i) => {
                    const perk0 = game.playerInfo.stats.perk0
                    const perkImage = rune.slots[0].runes.filter((perk) => {
                      return perk.id === perk0
                    })
                    return (
                      <Tooltip
                        key={i}
                        name={perkImage[0].name}
                        info={perkImage[0].longDesc}
                      >
                        <img
                          alt='runes'
                          className={style.summonerSpell}
                          src={`https://raw.communitydragon.org/${
                            game.gameVersion
                          }/plugins/rcp-be-lol-game-data/global/default/v1/${perkImage[0].icon.toLowerCase()}`}
                        />
                      </Tooltip>
                    )
                  })}

                {runes
                  .filter((rune) => {
                    return game.playerInfo.stats.perkSubStyle === rune.id
                  })
                  .map((rune, i) => (
                    <Tooltip
                      name={rune.name}
                      info={runeDescriptions
                        .filter(
                          (runeDescription) =>
                            runeDescription.key === rune.name &&
                            runeDescription.description
                        )
                        .map((rune) => rune.description)}
                      key={i}
                    >
                      <img
                        alt='summoner spell'
                        className={style.summonerSpell2}
                        src={`https://raw.communitydragon.org/${
                          game.gameVersion
                        }/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                      />
                    </Tooltip>
                  ))}
              </div>
            </div>
            <div className={style.championName}>{game.championName}</div>
          </div>
        </div>
        <div className={style.thirdCol}>
          <div>
            {(
              (game.playerInfo.stats.kills + game.playerInfo.stats.assists) /
              (game.playerInfo.stats.deaths === 0
                ? 1
                : game.playerInfo.stats.deaths)
            ).toFixed(2)}
            :1 KDA
          </div>
          <div className={style.killDeathAssists}>
            {`${game.playerInfo.stats.kills} /
      ${game.playerInfo.stats.deaths} /
      ${game.playerInfo.stats.assists}`}
          </div>
          <div className={style.kdaRatio}>
            {game.playerInfo.stats.largestMultiKill === 0 ||
            game.playerInfo.stats.largestMultiKill === 1
              ? ''
              : game.playerInfo.stats.largestMultiKill === 2
              ? 'Double Kill'
              : game.playerInfo.stats.largestMultiKill === 3
              ? 'Triple Kill'
              : game.playerInfo.stats.largestMultiKill === 4
              ? 'Quadra Kill'
              : 'Penta Kill'}
          </div>
        </div>
        <div className={style.fourthCol}>
          <span className={style.level}>
            level {game.playerInfo.stats.champLevel}
          </span>
          <Tooltip
            moreInfo={`${game.playerInfo.stats.totalMinionsKilled} minions killed + ${game.playerInfo.stats.neutralMinionsKilled} monsters killed `}
          >
            <div className={style.minionContainer}>
              <img
                className={style.minionIcon}
                alt='minion icon'
                src={process.env.PUBLIC_URL + '/images/icons/minion_icon.png'}
              />
              <span className={style.minions}>
                {game.playerInfo.stats.totalMinionsKilled +
                  game.playerInfo.stats.neutralMinionsKilled}{' '}
              </span>
            </div>
          </Tooltip>
          <Tooltip
            moreInfo={`${(
              (game.playerInfo.stats.totalMinionsKilled +
                game.playerInfo.stats.neutralMinionsKilled) /
              (game.gameDuration / 60)
            ).toFixed(1)} CS per minute`}
          >
            <span className={style.level}>
              {(
                (game.playerInfo.stats.totalMinionsKilled +
                  game.playerInfo.stats.neutralMinionsKilled) /
                (game.gameDuration / 60)
              ).toFixed(1)}{' '}
              cs/min
            </span>
          </Tooltip>
        </div>
        <div className={style.fifthCol}>
          <ItemHistory
            details={game.playerInfo.stats}
            version={game.gameVersion}
          />
        </div>
        <IoIosArrowUp className={style.sixthCol} />
      </div>
      <div className={style.line} />
      <div className={style.historyCard2}>
        <div className={style.sixthCard}>
          {game.players
            .slice(0, Math.ceil(game.players.length / 2))
            .map((player, i) => (
              <div
                onClick={
                  player.name === summonerInfo.name ||
                  player.name === sessionData.name
                    ? null
                    : getPlayerName
                }
                name={player.name}
                className={style.col}
                key={i}
              >
                <span
                  className={
                    summonerInfo.name
                      ? player.name === summonerInfo.name
                        ? style.summonerName
                        : style.name1
                      : style.name1 || sessionData.name
                      ? player.name === sessionData.name
                        ? style.summonerName
                        : style.name1
                      : style.name
                  }
                  name={player.name}
                >
                  {player.name.replace(/\s/g, '')}
                </span>
                <img
                  name={player.name}
                  alt={player.image}
                  src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${player.image}`}
                />
              </div>
            ))}
        </div>

        <div className={style.seventhCard}>
          {game.players
            .slice(Math.ceil(game.players.length / 2), game.players.length)
            .map((player, i) => (
              <div
                onClick={
                  player.name === summonerInfo.name ||
                  player.name === sessionData.name
                    ? null
                    : getPlayerName
                }
                name={player.name}
                className={style.col}
                key={i}
              >
                <img
                  name={player.name}
                  alt={player.image}
                  src={`https://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${player.image}`}
                />
                <span
                  className={
                    summonerInfo.name
                      ? player.name === summonerInfo.name
                        ? style.summonerName
                        : style.name2
                      : style.name2 || sessionData.name
                      ? player.name === sessionData.name
                        ? style.summonerName
                        : style.name2
                      : style.name
                  }
                  name={player.name}
                >
                  {player.name.replace(/\s/g, '')}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default HistoryCardComplex
