import React, { useState, useEffect } from 'react'
import style from './live.module.css'
import axios from 'axios'
import Tooltip from './Tooltip'
import { runeDescriptions } from '../utils/constant'

function Live({ live, champInfo, version, queues }) {
  const [runes, setRunes] = useState([])
  const [spells, setSpells] = useState([])
  const [length, setLength] = useState()

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

  useEffect(() => {
    const startTimer = async () => {
      setLength(await live.gameLength)

      if (length) {
        setInterval(() => {
          setLength((prevValue) => prevValue + 1)
        }, 1000)
      }
    }
    startTimer()
  }, [live])

  return (
    <div>
      {live === undefined ? (
        <div>Summoner Not In Game.</div>
      ) : (
        <>
          <div>{live.gameMode}</div>
          <div>{`${Math.floor(length / 60)}m ${Math.ceil(length % 60)}s `}</div>
          <div>
            {queues.map((queue) => {
              return (
                live.gameQueueConfigId === queue.queueId &&
                queue.description.split(' ').slice(0, 3).join(' ')
              )
            })}
          </div>
          <div>
            {live.participants.map(
              (player) =>
                player.teamId === 100 && (
                  <div>
                    <div>
                      {champInfo.map((champ) => {
                        return (
                          +champ.key === player.championId && (
                            <img
                              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                            />
                          )
                        )
                      })}
                    </div>
                    <div>
                      <div>
                        {runes
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
                                src={`https://raw.communitydragon.org/${version
                                  .split('.')
                                  .slice(0, 2)
                                  .join(
                                    '.'
                                  )}/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                              />
                            </Tooltip>
                          ))}
                      </div>
                      <div>
                        {' '}
                        {runes
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
                                src={`https://raw.communitydragon.org/${version
                                  .split('.')
                                  .slice(0, 2)
                                  .join(
                                    '.'
                                  )}/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                              />
                            </Tooltip>
                          ))}
                      </div>
                    </div>

                    <img
                      alt='profile icon'
                      className={style.profileIcon}
                      // Grab profile icon
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${player.profileIconId}.png`}
                    />
                    <div>{player.summonerName}</div>
                    <div>
                      {spells.map(
                        (spell, i) =>
                          +spell.key === player.spell1Id && (
                            <img
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
                              alt={spell.id}
                              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`}
                            />
                          )
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
          <div>
            {live.participants.map(
              (player) =>
                player.teamId === 200 && (
                  <div>
                    <div>
                      <div>
                        {runes
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
                                src={`https://raw.communitydragon.org/${version
                                  .split('.')
                                  .slice(0, 2)
                                  .join(
                                    '.'
                                  )}/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                              />
                            </Tooltip>
                          ))}
                      </div>
                      <div>
                        {' '}
                        {runes
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
                                src={`https://raw.communitydragon.org/${version
                                  .split('.')
                                  .slice(0, 2)
                                  .join(
                                    '.'
                                  )}/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                              />
                            </Tooltip>
                          ))}
                      </div>
                    </div>
                    <img
                      alt='profile icon'
                      className={style.profileIcon}
                      // Grab profile icon
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${player.profileIconId}.png`}
                    />
                    <div>{player.summonerName}</div>
                    <div>
                      {spells.map(
                        (spell, i) =>
                          +spell.key === player.spell1Id && (
                            <img
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
                              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`}
                            />
                          )
                      )}
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
