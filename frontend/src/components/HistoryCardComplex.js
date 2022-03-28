import React from 'react'
import style from './historycardcomplex.module.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { IoIosArrowUp } from 'react-icons/io'
import { runeDescriptions } from '../utils/constant'
import Tooltip from './Tooltip'
import ItemHistory from './ItemHistory'

function HistoryCardComplex({ game, clickArrow, open }) {
  const {
    summoner: {
      data: { summonerInfo },
    },
    dependency: { spells, runes },
  } = useSelector((state) => state)
  const history = useHistory()

  const position = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY']

  // Filters out team one
  const teamOne = game.participants.filter((participant) => {
    return participant.teamId === 100
  })

  // Filters out team two
  const teamTwo = game.participants.filter((participant) => {
    return participant.teamId === 200
  })

  const sortTeam = (team) => {
    const sortedTeam = [...team]

    if (sortedTeam[0]?.individualPosition === 'Invalid') {
      return sortedTeam
    } else {
      sortedTeam.sort(
        (a, b) =>
          position.indexOf(a.teamPosition) - position.indexOf(b.teamPosition)
      )
    }
    return sortedTeam
  }

  const getPlayerName = (e) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })

    const summonerName = e.target.getAttribute('name')
    const region = e.target.getAttribute('region')
    history.push(`/summoner/${region}/${summonerName}`)
  }

  return game.playerInfo && summonerInfo && runes && spells ? (
    <div
      className={`${open ? style.historyCardComplex : style.hideHistoryCard} ${
        game.playerInfo.win ? style.historyCardWin : style.historyCardLoss
      }`}>
      <div className={`${style.historyCard} `}>
        <div className={style.firstCol}>
          <p>
            {game.gameType === 'Ultimate Spellbook games'
              ? 'Ult Spellbook'
              : !game.gameType
              ? 'Custom Games'
              : game.gameType.split(' ').slice(0, 3).join(' ')}
          </p>
          <p>{game.playerInfo.win ? 'Victory' : 'Defeat'}</p>
          <p
            className={
              game.playerInfo.win ? style.subTextWin : style.subTextLoss
            }>
            {game.gameCreation.split(' ').slice(0, 4).join(' ')}
          </p>

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
                    +spell.key === game.playerInfo.summoner1Id && (
                      <Tooltip
                        key={i}
                        name={spell.name}
                        info={spell.description}>
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
                    +spell.key === game.playerInfo.summoner2Id && (
                      <Tooltip
                        key={i}
                        name={spell.name}
                        info={spell.description}>
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
                    return rune.id === game.playerInfo.perks.styles[0].style
                  })
                  .map((rune, i) => {
                    const perk0 =
                      game.playerInfo.perks.styles[0].selections[0].perk
                    const perkImage = rune.slots[0].runes.filter((perk) => {
                      return perk.id === perk0
                    })
                    return (
                      <Tooltip
                        key={i}
                        name={perkImage[0].name}
                        info={perkImage[0].longDesc}>
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
                    return rune.id === game.playerInfo.perks.styles[1].style
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
                      key={i}>
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
              (game.playerInfo.kills + game.playerInfo.assists) /
              (game.playerInfo.deaths === 0 ? 1 : game.playerInfo.deaths)
            ).toFixed(2)}
            :1 KDA
          </div>
          <div className={style.killDeathAssists}>
            {`${game.playerInfo.kills} /
      ${game.playerInfo.deaths} /
      ${game.playerInfo.assists}`}
          </div>
          {game.playerInfo.largestMultiKill <= 1 ? (
            ''
          ) : (
            <div className={style.kdaRatio}>
              {game.playerInfo.largestMultiKill === 2
                ? 'Double Kill'
                : game.playerInfo.largestMultiKill === 3
                ? 'Triple Kill'
                : game.playerInfo.largestMultiKill === 4
                ? 'Quadra Kill'
                : 'Penta Kill'}
            </div>
          )}
        </div>
        <div className={style.fourthCol}>
          <span className={style.level}>
            level {game.playerInfo.champLevel}
          </span>
          <Tooltip
            moreInfo={`${game.playerInfo.totalMinionsKilled} minions killed + ${game.playerInfo.neutralMinionsKilled} monsters killed `}>
            <div className={style.minionContainer}>
              <img
                className={style.minionIcon}
                alt='minion icon'
                src='https://res.cloudinary.com/mistahpig/image/upload/v1621958945/league-stats/role%20icons/Minion_icon_tgeisg.png'
              />
              <span className={style.minions}>
                {game.playerInfo.totalMinionsKilled +
                  game.playerInfo.neutralMinionsKilled}{' '}
              </span>
            </div>
          </Tooltip>
          <Tooltip
            moreInfo={
              JSON.stringify(game.gameDuration).length <= 4
                ? `${(
                    ((game.playerInfo.totalMinionsKilled +
                      game.playerInfo.neutralMinionsKilled) /
                      game.gameDuration) *
                    60
                  ).toFixed(1)} CS per minute`
                : `${(
                    ((game.playerInfo.totalMinionsKilled +
                      game.playerInfo.neutralMinionsKilled) /
                      game.gameDuration) *
                    60 *
                    1000
                  ).toFixed(1)} CS per minute`
            }>
            <span className={style.level}>
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
              cs/min
            </span>
          </Tooltip>
        </div>
        <div className={style.fifthCol}>
          <ItemHistory details={game.playerInfo} />
        </div>
        <IoIosArrowUp className={style.sixthCol} onClick={clickArrow} />
      </div>

      <div className={game.playerInfo.win ? style.lineWin : style.lineLoss} />
      <div className={style.historyCard2}>
        <div className={style.statsContainer}>
          {sortTeam(teamOne).map((player, i) => {
            return (
              <div
                key={i}
                className={
                  game.playerInfo.win ? style.team100Win : style.team100Loss
                }>
                <div>{`${player.kills} / ${player.deaths} / ${player.assists}`}</div>

                <div>
                  {JSON.stringify(game.gameDuration).length <= 4
                    ? (
                        ((player.totalMinionsKilled +
                          player.neutralMinionsKilled) /
                          game.gameDuration) *
                        60
                      ).toFixed(1)
                    : (
                        ((player.totalMinionsKilled +
                          player.neutralMinionsKilled) /
                          game.gameDuration) *
                        60 *
                        1000
                      ).toFixed(1)}
                  cs/min
                </div>
              </div>
            )
          })}
        </div>

        <div className={style.sixthCard}>
          {sortTeam(teamOne).map((player, i) => (
            <div name={player.summonerName} className={style.col1} key={i}>
              <span
                onClick={
                  player.summonerName === summonerInfo.name
                    ? null
                    : getPlayerName
                }
                className={
                  summonerInfo.name
                    ? player.summonerName === summonerInfo.name
                      ? style.summonerName1
                      : style.name1
                    : style.name1
                }
                name={player.summonerName}
                region={game.platformId}>
                {player.summonerName.replace(/\s/g, '')}
              </span>
              <img
                name={player.summonerName}
                alt={player.image}
                src={`https://ddragon.leagueoflegends.com/cdn/${
                  game.gameVersion
                }.1/img/champion/${
                  player.championName === 'FiddleSticks'
                    ? 'Fiddlesticks'
                    : player.championName
                }.png`}
              />
            </div>
          ))}
        </div>

        <div className={style.iconContainer}>
          {game.gameType === '5v5 ARAM games' ? (
            <>
              <img
                alt='poro'
                src={
                  'https://raw.communitydragon.org/10.1/game/assets/loadouts/summoneremotes/flairs/poro_happy_taunt_selector.png'
                }
              />
              <img
                alt='poro'
                src={
                  'https://raw.communitydragon.org/10.1/game/assets/loadouts/summoneremotes/flairs/poro_happy_cheers_selector.png'
                }
              />
              <img
                alt='poro'
                src={
                  'https://raw.communitydragon.org/10.1/game/assets/loadouts/summoneremotes/flairs/em_poro_buddies_selector.png'
                }
              />
              <img
                alt='poro'
                src={
                  'https://raw.communitydragon.org/10.1/game/assets/loadouts/summoneremotes/rewards/essence/essence_poro_tier_1_selector.png'
                }
              />
              <img
                alt='poro'
                src={
                  'https://raw.communitydragon.org/10.1/game/assets/loadouts/summoneremotes/rewards/essence/essence_poro_tier_2_selector.png'
                }
              />
            </>
          ) : game.gameType === 'URF games' ? (
            <>
              <img
                alt='manatee urf'
                src='https://res.cloudinary.com/mistahpig/image/upload/v1621898818/league-stats/role%20icons/manatee_lubzjx.png'
              />
              <img
                alt='manatee urf'
                src='https://res.cloudinary.com/mistahpig/image/upload/v1621898818/league-stats/role%20icons/manatee2_qace59.png'
              />
              <img
                alt='manatee urf'
                src='https://res.cloudinary.com/mistahpig/image/upload/v1621898818/league-stats/role%20icons/manatee3_vu2ogp.png'
              />
              <img
                alt='manatee urf'
                src='https://res.cloudinary.com/mistahpig/image/upload/v1621898818/league-stats/role%20icons/manatee4_r6vdvz.png'
              />
              <img
                alt='manatee urf'
                src='https://res.cloudinary.com/mistahpig/image/upload/v1621898818/league-stats/role%20icons/manatee5_eikten.png'
              />
            </>
          ) : game.gameType === '5v5 Ranked Solo games' ||
            game.gameType === '5v5 Draft Pick games' ||
            game.gameType === '5v5 Ranked Flex games' ||
            game.gameType === '5v5 Blind Pick games' ? (
            <>
              <img
                alt='icon'
                src='https://res.cloudinary.com/mistahpig/image/upload/v1621898819/league-stats/role%20icons/Top_icon_reqrfv.png'
              />
              <img
                alt='icon'
                src='https://res.cloudinary.com/mistahpig/image/upload/v1621898818/league-stats/role%20icons/Jungle_icon_zde7ju.png'
              />
              <img
                alt='icon'
                src='https://res.cloudinary.com/mistahpig/image/upload/v1621898818/league-stats/role%20icons/Middle_icon_etwa26.png'
              />
              <img
                alt='icon'
                src='https://res.cloudinary.com/mistahpig/image/upload/v1621898818/league-stats/role%20icons/Bottom_icon_zkoaud.png'
              />
              <img
                alt='icon'
                src='https://res.cloudinary.com/mistahpig/image/upload/v1621898818/league-stats/role%20icons/Support_icon_h6uicp.png'
              />
            </>
          ) : (
            Array.from({ length: 5 }).map((num, i) => <h3 key={i}>-</h3>)
          )}
        </div>

        <div className={style.seventhCard}>
          {sortTeam(teamTwo).map((player, i) => (
            <div name={player.summonerName} className={style.col2} key={i}>
              <img
                name={player.summonerName}
                alt={`${player.championName}.png`}
                src={`https://ddragon.leagueoflegends.com/cdn/${
                  game.gameVersion
                }.1/img/champion/${
                  player.championName === 'FiddleSticks'
                    ? 'Fiddlesticks'
                    : player.championName
                }.png`}
              />
              <span
                onClick={
                  player.summonerName === summonerInfo.name
                    ? null
                    : getPlayerName
                }
                className={
                  summonerInfo.name
                    ? player.summonerName === summonerInfo.name
                      ? style.summonerName2
                      : style.name2
                    : style.name2
                }
                region={game.platformId}
                name={player.summonerName}>
                {player.summonerName.replace(/\s/g, '')}
              </span>
            </div>
          ))}
        </div>
        <div className={style.statsContainer2}>
          {sortTeam(teamTwo).map((player, i) => {
            return (
              <div
                key={i}
                className={
                  game.playerInfo.win ? style.team200Win : style.team200Loss
                }>
                <div>
                  {JSON.stringify(game.gameDuration).length <= 4
                    ? (
                        ((player.totalMinionsKilled +
                          player.neutralMinionsKilled) /
                          game.gameDuration) *
                        60
                      ).toFixed(1)
                    : (
                        ((player.totalMinionsKilled +
                          player.neutralMinionsKilled) /
                          game.gameDuration) *
                        60 *
                        1000
                      ).toFixed(1)}
                  cs/min
                </div>
                <div>{`${player.kills} / ${player.deaths} / ${player.assists}`}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  ) : null
}

export default HistoryCardComplex
