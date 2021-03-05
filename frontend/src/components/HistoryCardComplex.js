import React, { useEffect } from 'react'
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
  clickArrow,
  open,
}) {
  // Get info from Session Storage
  const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))

  const sortByLane = (arr) => {
    const playerArr = []
    arr.forEach((player) => {
      const lane = player.timeline.lane
      const role = player.timeline.role

      if (lane !== 'NONE') {
        switch (lane) {
          case 'TOP':
            playerArr[0] = player
            break
          case 'JUNGLE':
            playerArr[1] = player
            break
          case 'MIDDLE':
            playerArr[2] = player
            break
          case 'BOTTOM':
            if (role === 'DUO_CARRY') playerArr[3] = player
            if (role === 'DUO_SUPPORT') playerArr[4] = player
            break
          default:
            return
        }
      }
    })
    console.log(playerArr)
    return playerArr
  }

  const teamOne = game.participants.filter((participant) => {
    return participant.teamId === 100
  })

  const teamOneDisplay = sortByLane(teamOne)

  const teamTwo = game.participants.filter((participant) => {
    return participant.teamId === 200
  })

  return (
    <div
      className={`${open ? style.historyCardComplex : style.hideHistoryCard} ${
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
          {game.playerInfo.stats.largestMultiKill <= 1 ? (
            ''
          ) : (
            <div className={style.kdaRatio}>
              {game.playerInfo.stats.largestMultiKill === 2
                ? 'Double Kill'
                : game.playerInfo.stats.largestMultiKill === 3
                ? 'Triple Kill'
                : game.playerInfo.stats.largestMultiKill === 4
                ? 'Quadra Kill'
                : 'Penta Kill'}
            </div>
          )}
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
        <IoIosArrowUp className={style.sixthCol} onClick={clickArrow} />
      </div>

      <div
        className={game.playerInfo.stats.win ? style.lineWin : style.lineLoss}
      />
      <div className={style.historyCard2}>
        <div className={style.statsContainer}>
          {teamOne.map((player, i) => {
            return (
              <div
                key={i}
                className={
                  game.playerInfo.stats.win
                    ? style.team100Win
                    : style.team100Loss
                }
              >
                <div>{`${player.stats.kills} / ${player.stats.deaths} / ${player.stats.assists}`}</div>

                <div>
                  {(
                    (player.stats.totalMinionsKilled +
                      player.stats.neutralMinionsKilled) /
                    (game.gameDuration / 60)
                  ).toFixed(1)}{' '}
                  cs/min
                </div>
              </div>
            )
          })}
        </div>

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
                className={style.col1}
                key={i}
              >
                <span
                  className={
                    summonerInfo.name
                      ? player.name === summonerInfo.name
                        ? style.summonerName1
                        : style.name1
                      : style.name1 || sessionData.name
                      ? player.name === sessionData.name
                        ? style.summonerName1
                        : style.name1
                      : style.name
                  }
                  name={player.name}
                  region={game.platformId}
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

        <div className={style.iconContainer}>
          <img
            alt='icon'
            src={process.env.PUBLIC_URL + '/images/icons/Top_icon.png'}
          />
          <img
            alt='icon'
            src={process.env.PUBLIC_URL + '/images/icons/Jungle_icon.png'}
          />
          <img
            alt='icon'
            src={process.env.PUBLIC_URL + '/images/icons/Middle_icon.png'}
          />
          <img
            alt='icon'
            src={process.env.PUBLIC_URL + '/images/icons/Bottom_icon.png'}
          />
          <img
            alt='icon'
            src={process.env.PUBLIC_URL + '/images/icons/Support_icon.png'}
          />
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
                className={style.col2}
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
                        ? style.summonerName2
                        : style.name2
                      : style.name2 || sessionData.name
                      ? player.name === sessionData.name
                        ? style.summonerName2
                        : style.name2
                      : style.name
                  }
                  region={game.platformId}
                  name={player.name}
                >
                  {player.name.replace(/\s/g, '')}
                </span>
              </div>
            ))}
        </div>
        <div className={style.statsContainer2}>
          {teamTwo.map((player, i) => {
            return (
              <div
                key={i}
                className={
                  game.playerInfo.stats.win
                    ? style.team200Win
                    : style.team200Loss
                }
              >
                <div>
                  {(
                    (player.stats.totalMinionsKilled +
                      player.stats.neutralMinionsKilled) /
                    (game.gameDuration / 60)
                  ).toFixed(1)}{' '}
                  cs/min
                </div>
                <div>{`${player.stats.kills} / ${player.stats.deaths} / ${player.stats.assists}`}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HistoryCardComplex
