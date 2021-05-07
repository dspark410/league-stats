/** @format */

import React from "react";
import { useSelector } from "react-redux";
import style from "./live.module.css";

import Tooltip from "./Tooltip";

import { runeDescriptions } from "../utils/constant";

function Live({ champInfo, version, time }) {
  const {
    summoner: {
      data: { live },
    },
    dependency: { runes, spells },
  } = useSelector((state) => state);

  return live && live.rankArray ? (
    <div className={`${style.liveWidthContainer}`}>
      <div className={style.liveContainer}>
        <div className={style.timerQueueContainer}>
          <div className={style.timerQueueContainerBorder}>
            <div className={style.queue}>{live.queueName}</div>
            <span>-</span>
            <div className={style.timer}>{`${Math.floor(
              time / 60
            )}m ${Math.ceil(time % 60)}s `}</div>
          </div>
        </div>
      </div>

      <div className={style.allyBannedContainer}>
        <h3 className={style.allyTeam}>Ally Team</h3>
        <div className={style.solo}>Solo Q</div>
        <div className={style.flex}>Flex</div>
        <div className={style.banContainer}>
          <span className={style.allyBans}>Bans</span>

          {live.bannedChampions.length === 0 ? (
            <span className={style.noBans}>
              -&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;-
            </span>
          ) : (
            live.bannedChampions.forEach(
              (banned) =>
                banned.teamId === 100 &&
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
                  );
                })
            )
          )}
        </div>
      </div>

      <div className={style.ally}>
        {live.participants.map(
          (player, i) =>
            player.teamId === 100 && (
              <div
                key={i}
                className={style.champImageRuneSpellNameContainerAlly}
              >
                <div className={style.summonerName}>
                  <img
                    alt="profile icon"
                    className={style.profileIcon}
                    // Grab profile icon
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${player.profileIconId}.png`}
                  />
                  {player.summonerName}
                </div>
                <div className={style.champImageRuneSpellContainerAlly}>
                  <div>
                    {champInfo.map((champ, i) => {
                      return (
                        +champ.key === player.championId && (
                          <img
                            className={style.champImageAlly}
                            alt={champ.name}
                            key={i}
                            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                          />
                        )
                      );
                    })}
                  </div>
                  <div className={style.runeContainer}>
                    <div>
                      {player.perks
                        ? runes
                            .filter((rune) => {
                              return player.perks.perkStyle === rune.id;
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
                                    .split(".")
                                    .slice(0, 2)
                                    .join(
                                      "."
                                    )}/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                                />
                              </Tooltip>
                            ))
                        : ""}
                    </div>
                    <div>
                      {player.perks
                        ? runes
                            .filter((rune) => {
                              return player.perks.perkSubStyle === rune.id;
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
                                  key={i}
                                  className={style.runeImage}
                                  alt={rune.name}
                                  src={`https://raw.communitydragon.org/${version
                                    .split(".")
                                    .slice(0, 2)
                                    .join(
                                      "."
                                    )}/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                                />
                              </Tooltip>
                            ))
                        : ""}
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
                              info={spell.description}
                            >
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
                              info={spell.description}
                            >
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
                      return s.length !== 0 && s[0].summonerName;
                    })
                    .includes(player.summonerName)
                    ? live.rankArray.map((rank) => {
                        return rank.map((game, i) => {
                          let emblem;
                          if (
                            game.summonerName === player.summonerName &&
                            game.queueType === "RANKED_SOLO_5x5"
                          ) {
                            if (
                              game.tier === "CHALLENGER" ||
                              game.tier === "GRANDMASTER" ||
                              game.tier === "MASTER"
                            ) {
                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={
                                      process.env.PUBLIC_URL +
                                      `/images/emblems/${game.tier}.png`
                                    }
                                  />

                                  {game.leaguePoints}
                                </div>
                              );
                            } else {
                              let playerRank;

                              switch (game.rank) {
                                case "I":
                                  playerRank = 1;
                                  break;
                                case "II":
                                  playerRank = 2;
                                  break;
                                case "III":
                                  playerRank = 3;
                                  break;
                                case "IV":
                                  playerRank = 4;
                                  break;
                                default:
                                  playerRank = -1;
                              }

                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={
                                      process.env.PUBLIC_URL +
                                      `/images/emblems/${game.tier}.png`
                                    }
                                  />

                                  {game.tier[0] + playerRank}
                                </div>
                              );
                            }
                          } else if (
                            game.summonerName === player.summonerName &&
                            game.queueType === "RANKED_FLEX_SR" &&
                            rank.length === 1
                          ) {
                            return "-";
                          }
                          return <div key={i}>{emblem}</div>;
                        });
                      })
                    : "-"}
                </div>
                <div className={style.flexRank}>
                  {live.rankArray
                    .map((s) => {
                      return s.length !== 0 && s[0].summonerName;
                    })
                    .includes(player.summonerName)
                    ? live.rankArray.map((rank) => {
                        return rank.map((game, i) => {
                          let emblem;
                          if (
                            player.summonerName === game.summonerName &&
                            game.queueType === "RANKED_FLEX_SR"
                          ) {
                            if (
                              game.tier === "CHALLENGER" ||
                              game.tier === "GRANDMASTER" ||
                              game.tier === "MASTER"
                            ) {
                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={
                                      process.env.PUBLIC_URL +
                                      `/images/emblems/${game.tier}.png`
                                    }
                                  />

                                  {game.leaguePoints}
                                </div>
                              );
                            } else {
                              let playerRank;

                              switch (game.rank) {
                                case "I":
                                  playerRank = 1;
                                  break;
                                case "II":
                                  playerRank = 2;
                                  break;
                                case "III":
                                  playerRank = 3;
                                  break;
                                case "IV":
                                  playerRank = 4;
                                  break;
                                default:
                                  playerRank = -1;
                              }

                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={
                                      process.env.PUBLIC_URL +
                                      `/images/emblems/${game.tier}.png`
                                    }
                                  />

                                  {game.tier[0] + playerRank}
                                </div>
                              );
                            }
                          } else if (
                            game.summonerName === player.summonerName &&
                            game.queueType === "RANKED_SOLO_5x5" &&
                            rank.length === 1
                          ) {
                            return "-";
                          }
                          return <div key={i}>{emblem}</div>;
                        });
                      })
                    : "-"}
                </div>
              </div>
            )
        )}
      </div>
      <div className={style.enemyBannedContainer}>
        <h3 className={style.enemyTeam}>Enemy Team</h3>
        <div className={style.solo}>Solo Q</div>
        <div className={style.flex}>Flex</div>
        <div className={style.banContainer}>
          <span className={style.enemyBans}>Bans</span>
          {live.bannedChampions.length === 0 ? (
            <span className={style.noBans}>
              -&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;-
            </span>
          ) : (
            live.bannedChampions.forEach(
              (banned) =>
                banned.teamId === 200 &&
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
                  );
                })
            )
          )}
        </div>
      </div>
      <div className={style.enemy}>
        {live.participants.map(
          (player, i) =>
            player.teamId === 200 && (
              <div
                key={i}
                className={style.champImageRuneSpellNameContainerEnemy}
              >
                <div className={style.summonerName}>
                  <img
                    alt="profile icon"
                    className={style.profileIcon}
                    // Grab profile icon
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${player.profileIconId}.png`}
                  />
                  {player.summonerName}
                </div>
                <div className={style.champImageRuneSpellContainerEnemy}>
                  <div>
                    {champInfo.map((champ, i) => {
                      return (
                        +champ.key === player.championId && (
                          <img
                            className={style.champImageEnemy}
                            alt={champ.name}
                            key={i}
                            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                          />
                        )
                      );
                    })}
                  </div>
                  <div className={style.runeContainer}>
                    <div>
                      {player.perks
                        ? runes
                            .filter((rune) => {
                              return player.perks.perkStyle === rune.id;
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
                                    .split(".")
                                    .slice(0, 2)
                                    .join(
                                      "."
                                    )}/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                                />
                              </Tooltip>
                            ))
                        : ""}
                    </div>
                    <div>
                      {player.perks
                        ? runes
                            .filter((rune) => {
                              return player.perks.perkSubStyle === rune.id;
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
                                  key={i}
                                  className={style.runeImage}
                                  alt={rune.name}
                                  src={`https://raw.communitydragon.org/${version
                                    .split(".")
                                    .slice(0, 2)
                                    .join(
                                      "."
                                    )}/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`}
                                />
                              </Tooltip>
                            ))
                        : ""}
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
                              info={spell.description}
                            >
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
                              info={spell.description}
                            >
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
                      return s.length !== 0 && s[0].summonerName;
                    })
                    .includes(player.summonerName)
                    ? live.rankArray.map((rank) => {
                        return rank.map((game, i) => {
                          let emblem;
                          if (
                            game.summonerName === player.summonerName &&
                            game.queueType === "RANKED_SOLO_5x5"
                          ) {
                            if (
                              game.tier === "CHALLENGER" ||
                              game.tier === "GRANDMASTER" ||
                              game.tier === "MASTER"
                            ) {
                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={
                                      process.env.PUBLIC_URL +
                                      `/images/emblems/${game.tier}.png`
                                    }
                                  />

                                  {game.leaguePoints}
                                </div>
                              );
                            } else {
                              let playerRank;

                              switch (game.rank) {
                                case "I":
                                  playerRank = 1;
                                  break;
                                case "II":
                                  playerRank = 2;
                                  break;
                                case "III":
                                  playerRank = 3;
                                  break;
                                case "IV":
                                  playerRank = 4;
                                  break;
                                default:
                                  playerRank = -1;
                              }

                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={
                                      process.env.PUBLIC_URL +
                                      `/images/emblems/${game.tier}.png`
                                    }
                                  />

                                  {game.tier[0] + playerRank}
                                </div>
                              );
                            }
                          } else if (
                            game.summonerName === player.summonerName &&
                            game.queueType === "RANKED_FLEX_SR" &&
                            rank.length === 1
                          ) {
                            return "-";
                          }
                          return <div key={i}>{emblem}</div>;
                        });
                      })
                    : "-"}
                </div>
                <div className={style.flexRank}>
                  {live.rankArray
                    .map((s) => {
                      return s.length !== 0 && s[0].summonerName;
                    })
                    .includes(player.summonerName)
                    ? live.rankArray.map((rank) => {
                        return rank.map((game, i) => {
                          let emblem;
                          if (
                            game.summonerName === player.summonerName &&
                            game.queueType === "RANKED_FLEX_SR"
                          ) {
                            if (
                              game.tier === "CHALLENGER" ||
                              game.tier === "GRANDMASTER" ||
                              game.tier === "MASTER"
                            ) {
                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={
                                      process.env.PUBLIC_URL +
                                      `/images/emblems/${game.tier}.png`
                                    }
                                  />

                                  {game.leaguePoints}
                                </div>
                              );
                            } else {
                              let playerRank;

                              switch (game.rank) {
                                case "I":
                                  playerRank = 1;
                                  break;
                                case "II":
                                  playerRank = 2;
                                  break;
                                case "III":
                                  playerRank = 3;
                                  break;
                                case "IV":
                                  playerRank = 4;
                                  break;
                                default:
                                  playerRank = -1;
                              }

                              emblem = (
                                <div key={i} className={style.emblemContainer}>
                                  <img
                                    alt={game.tier}
                                    className={style.emblemImage}
                                    src={
                                      process.env.PUBLIC_URL +
                                      `/images/emblems/${game.tier}.png`
                                    }
                                  />

                                  {game.tier[0] + playerRank}
                                </div>
                              );
                            }
                          } else if (
                            game.summonerName === player.summonerName &&
                            game.queueType === "RANKED_SOLO_5x5" &&
                            rank.length === 1
                          ) {
                            return "-";
                          }
                          return <div key={i}>{emblem}</div>;
                        });
                      })
                    : "-"}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Live;
