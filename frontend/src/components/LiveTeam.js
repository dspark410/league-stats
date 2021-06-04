import React from 'react'
import style from './live.module.css'
import { useSelector } from 'react-redux'
import { runeDescriptions } from '../utils/constant'
import Tooltip from './Tooltip'

function LiveTeam({ team, id }) {
  const {
    summoner: {
      data: { live },
    },
    dependency: { champInfo, version, runes, spells },
  } = useSelector((state) => state)

  return (
    <>
      <div className={style[`${team}BannedContainer`]}>
        <h3 className={style[`${team}Team`]}>
          {team.split('')[0].toUpperCase() + team.slice(1)} Team
        </h3>
        <div className={style.solo}>Solo Q</div>
        <div className={style.flex}>Flex</div>
        <div className={style.banContainer}>
          <span className={style[`${team}Bans`]}>Bans</span>

          {live.bannedChampions.length === 0 ? (
            <span className={style.noBans}>
              -&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;-
            </span>
          ) : (
            live.bannedChampions.map(
              (banned) =>
                banned.teamId === id &&
                champInfo.map((champ, i) => {
                  return (
                    +champ.key === banned.championId && (
                      <img
                        className={style.champImageBanned}
                        alt={champ.name}
                        key={i}
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                      />
                    )
                  )
                })
            )
          )}
        </div>
      </div>

      <div className={style[`${team}`]}>
        {live.participants.map(
          (player, i) =>
            player.teamId === id && (
              <div
                key={i}
                className={style[`${team}ChampImageRuneSpellNameContainer`]}>
                <div className={style.summonerName}>
                  <img
                    alt='profile icon'
                    className={style.profileIcon}
                    // Grab profile icon
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${player.profileIconId}.png`}
                  />
                  {player.summonerName}
                </div>
                <div className={style[`${team}ChampImageRuneSpellContainer`]}>
                  <div>
                    {champInfo.map((champ, i) => {
                      return (
                        +champ.key === player.championId && (
                          <img
                            className={style[`${team}ChampImage`]}
                            alt={champ.name}
                            key={i}
                            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                          />
                        )
                      )
                    })}
                  </div>
                  <div className={style.runeContainer}>
                    <div>
                      {player.perks
                        ? runes
                            .filter((rune) => {
                              return player.perks.perkStyle === rune.id
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
                                  className={style.runeImage}
                                  alt={rune.name}
                                  key={i}
                                  src={`https://raw.communitydragon.org/${version
                                    .split('.')
                                    .slice(0, 2)
                                    .join(
                                      '.'
                                    )}/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                                />
                              </Tooltip>
                            ))
                        : ''}
                    </div>
                    <div>
                      {player.perks
                        ? runes
                            .filter((rune) => {
                              return player.perks.perkSubStyle === rune.id
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
                                  key={i}
                                  className={style.runeImage}
                                  alt={rune.name}
                                  src={`https://raw.communitydragon.org/${version
                                    .split('.')
                                    .slice(0, 2)
                                    .join(
                                      '.'
                                    )}/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                                />
                              </Tooltip>
                            ))
                        : ''}
                    </div>
                  </div>
                  <div className={style.spellContainer}>
                    <div>
                      {spells.map(
                        (spell, i) =>
                          +spell.key === player.spell1Id && (
                            <Tooltip
                              key={i}
                              name={spell.name}
                              info={spell.description}>
                              <img
                                key={i}
                                className={style.spellimage}
                                alt={spell.id}
                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`}
                              />
                            </Tooltip>
                          )
                      )}
                    </div>
                    <div>
                      {spells.map(
                        (spell, i) =>
                          +spell.key === player.spell2Id && (
                            <Tooltip
                              key={i}
                              name={spell.name}
                              info={spell.description}>
                              <img
                                key={i}
                                className={style.spellimage}
                                alt={spell.id}
                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`}
                              />
                            </Tooltip>
                          )
                      )}
                    </div>
                  </div>
                </div>
                <div className={style.soloRank}>
                  {live.rankArray
                    .map((s) => {
                      return s.length !== 0 && s[0].summonerName
                    })
                    .includes(player.summonerName)
                    ? live.rankArray.map((rank) => {
                        return rank.map((game, i) => {
                          let emblem
                          if (
                            game.summonerName === player.summonerName &&
                            game.queueType === 'RANKED_SOLO_5x5'
                          ) {
                            if (
                              game.tier === 'CHALLENGER' ||
                              game.tier === 'GRANDMASTER' ||
                              game.tier === 'MASTER'
                            ) {
                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={`https://res.cloudinary.com/mistahpig/image/upload/v1621898668/league-stats/emblems/${game.tier}.png`}
                                  />

                                  {game.leaguePoints}
                                </div>
                              )
                            } else {
                              let playerRank

                              switch (game.rank) {
                                case 'I':
                                  playerRank = 1
                                  break
                                case 'II':
                                  playerRank = 2
                                  break
                                case 'III':
                                  playerRank = 3
                                  break
                                case 'IV':
                                  playerRank = 4
                                  break
                                default:
                                  playerRank = -1
                              }

                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={`https://res.cloudinary.com/mistahpig/image/upload/v1621898668/league-stats/emblems/${game.tier}.png`}
                                  />

                                  {game.tier[0] + playerRank}
                                </div>
                              )
                            }
                          } else if (
                            game.summonerName === player.summonerName &&
                            game.queueType === 'RANKED_FLEX_SR' &&
                            rank.length === 1
                          ) {
                            return '-'
                          }
                          return <div key={i}>{emblem}</div>
                        })
                      })
                    : '-'}
                </div>
                <div className={style.flexRank}>
                  {live.rankArray
                    .map((s) => {
                      return s.length !== 0 && s[0].summonerName
                    })
                    .includes(player.summonerName)
                    ? live.rankArray.map((rank) => {
                        return rank.map((game, i) => {
                          let emblem
                          if (
                            player.summonerName === game.summonerName &&
                            game.queueType === 'RANKED_FLEX_SR'
                          ) {
                            if (
                              game.tier === 'CHALLENGER' ||
                              game.tier === 'GRANDMASTER' ||
                              game.tier === 'MASTER'
                            ) {
                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={`https://res.cloudinary.com/mistahpig/image/upload/v1621898668/league-stats/emblems/${game.tier}.png`}
                                  />

                                  {game.leaguePoints}
                                </div>
                              )
                            } else {
                              let playerRank

                              switch (game.rank) {
                                case 'I':
                                  playerRank = 1
                                  break
                                case 'II':
                                  playerRank = 2
                                  break
                                case 'III':
                                  playerRank = 3
                                  break
                                case 'IV':
                                  playerRank = 4
                                  break
                                default:
                                  playerRank = -1
                              }

                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={`https://res.cloudinary.com/mistahpig/image/upload/v1621898668/league-stats/emblems/${game.tier}.png`}
                                  />

                                  {game.tier[0] + playerRank}
                                </div>
                              )
                            }
                          } else if (
                            game.summonerName === player.summonerName &&
                            game.queueType === 'RANKED_SOLO_5x5' &&
                            rank.length === 1
                          ) {
                            return '-'
                          }
                          return <div key={i}>{emblem}</div>
                        })
                      })
                    : '-'}
                </div>
              </div>
            )
        )}
      </div>
    </>
  )
}

export default LiveTeam
