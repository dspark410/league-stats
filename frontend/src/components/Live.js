import React, { useState, useEffect } from 'react'
import style from './live.module.css'
import axios from 'axios'
import Tooltip from './Tooltip'
import { runeDescriptions } from '../utils/constant'

function Live({ live, champInfo, version, queues, length }) {
  const [runes, setRunes] = useState([])
  const [spells, setSpells] = useState([])

  useEffect(() => {
    if (version !== '') {
      // Retrieve list of summoner spells from Riot API
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`
        )
        .then((res) => {
          setSpells(Object.values(res.data.data))
        })
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`
        )
        .then((res) => {
          setRunes(res.data)
        })
    }
  }, [version])

  return (
    <div>
      {live === undefined ? (
        <div className={style.notInGame}>Summoner Not In Game.</div>
      ) : (
        <>
          <div className={style.liveContainer}>
            <div className={style.timerQueueContainer}>
              <div className={style.timerQueueContainerBorder}>
                <div className={style.queue}>
                  {queues.map((queue) => {
                    return (
                      live.gameQueueConfigId === queue.queueId &&
                      queue.description.split(' ').slice(0, 3).join(' ')
                    )
                  })}
                </div>
                <span>-</span>
                <div className={style.timer}>{`${Math.floor(
                  length / 60
                )}m ${Math.ceil(length % 60)}s `}</div>
              </div>
            </div>
          </div>
          {/* <div>{live.gameMode}</div> */}

          <div className={style.ally}>
            {live.participants.map(
              (player, i) =>
                player.teamId === 100 && (
                  <div className={style.champImageRuneSpellNameContainerAlly}>
                    <div className={style.champImageRuneSpellContainerAlly}>
                      <div>
                        {champInfo.map((champ, i) => {
                          return (
                            +champ.key === player.championId && (
                              <img
                                className={style.champImage}
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
                                    key={i}
                                  >
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
                                    key={i}
                                  >
                                    <img
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
                                <img
                                  className={style.spellimage}
                                  alt={spell.id}
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`}
                                />
                              )
                          )}
                        </div>
                        <div>
                          {spells.map(
                            (spell, i) =>
                              +spell.key === player.spell2Id && (
                                <img
                                  className={style.spellimage}
                                  alt={spell.id}
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`}
                                />
                              )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={style.summonerName}>
                      {player.summonerName}
                    </div>

                    {/* <img
                      alt='profile icon'
                      className={style.profileIcon}
                      // Grab profile icon
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${player.profileIconId}.png`}
                    /> */}
                  </div>
                )
            )}
          </div>
          <div className={style.enemy}>
            {live.participants.map(
              (player, i) =>
                player.teamId === 200 && (
                  <div className={style.champImageRuneSpellNameContainerEnemy}>
                    <div className={style.champImageRuneSpellContainerEnemy}>
                      <div>
                        {champInfo.map((champ, i) => {
                          return (
                            +champ.key === player.championId && (
                              <img
                                className={style.champImage}
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
                                    key={i}
                                  >
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
                                    key={i}
                                  >
                                    <img
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
                                <img
                                  className={style.spellimage}
                                  alt={spell.id}
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`}
                                />
                              )
                          )}
                        </div>
                        <div>
                          {spells.map(
                            (spell, i) =>
                              +spell.key === player.spell2Id && (
                                <img
                                  className={style.spellimage}
                                  alt={spell.id}
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`}
                                />
                              )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* <img
                      alt='profile icon'
                      className={style.profileIcon}
                      // Grab profile icon
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${player.profileIconId}.png`}
                    /> */}
                    <div className={style.summonerName}>
                      {player.summonerName}
                    </div>
                  </div>
                )
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Live
