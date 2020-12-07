import React, { useState, useEffect } from "react";
import style from "./matchhistory.module.css";
import axios from "axios";

// MATCH TIMESLINES API
// https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/3630397822?api_key=RGAPI-f3372fe9-4a88-4d2f-917b-54974292c5f6

// SUMMONER SPELLS
// http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/summoner.json

// ITEMS
// http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/item.json

function MatchHistoryCard({ matchDetails, summonerInfo, champInfo, version }) {
  // const [types, setTypes] = useState([])
  // const [modes, setModes] = useState([])
  //const [maps, setMaps] = useState([])
  const [queues, setQueues] = useState([]);
  const [gameDetails, setGameDetails] = useState([]);
  const [spells, setSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);
  const [runes, setRunes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (version !== "") {
      // axios
      //   .get('http://static.developer.riotgames.com/docs/lol/gameTypes.json')
      //   .then((res) => setTypes(res.data))
      // axios
      //   .get('http://static.developer.riotgames.com/docs/lol/gameModes.json')
      //   .then((res) => setModes(res.data))
      axios
        .get("http://localhost:5000/queueType")
        .then((res) => setQueues(res.data));
      // axios.get('http://localhost:5000/mapList').then((res) => setMaps(res.data))
      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`
        )
        .then((res) => {
          setSpells(res.data.data);
        });

      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`
        )
        .then((res) => {
          setRunes(res.data);
          // let treeArray = [];
          // res.data.forEach((tree) => {
          //   const treeObject = {
          //     treeName: tree.name,
          //     treeImage: tree.icon.toLowerCase(),
          //     treeId: tree.id,
          //     runeArray: [],
          //   };

          //   tree.slots.forEach((item) => {
          //     item.runes.forEach((runes) => {
          //       treeObject.runeArray.push(runes);
          //     });
          //   });
          //   treeArray.push(treeObject);
          // });
          // setRunes(treeArray);
          // setLoading(false);
        });
    }
  }, [version]);

  useEffect(() => {
    const spellInfoArray = Object.values(spells);

    const newArray = [];

    for (let i = 0; i < spellInfoArray.length; i++) {
      const name = spellInfoArray[i].name;
      const key = spellInfoArray[i].key;
      const id = spellInfoArray[i].id;

      const object = {
        name,
        key,
        id,
      };
      newArray.push(object);
    }
    setFilteredSpells(newArray);
  }, [spells]);

  const sessionData = JSON.parse(sessionStorage.getItem("summonerInfo"));

  useEffect(() => {
    const matchsAsync = async () => {
      const gameDetailsArr = [];
      await matchDetails.forEach((match) => {
        let matchObj;
        let participantObj;
        queues.forEach((queue) => {
          if (match.queueId === queue.queueId) {
            const date = new Date(match.gameCreation).toString();

            matchObj = {
              map: queue.map,
              gameType: queue.description,
              gameCreation: date,
              gameDuration: match.gameDuration,
              gameVersion: match.gameVersion.split(".").slice(0, 2).join("."),
            };
          }
        });
        match.participantIdentities.forEach((id) => {
          if (
            id.player.accountId === summonerInfo.accountId ||
            id.player.accountId === sessionData.accountId
          ) {
            participantObj = id.participantId;
            matchObj.participantId = participantObj;
          }
        });

        match.participants.forEach((data) => {
          if (data.participantId === participantObj) {
            const playerStats = data;
            matchObj.playerInfo = playerStats;
          }
        });

        champInfo.forEach((champ) => {
          if (matchObj.playerInfo.championId === +champ.key) {
            matchObj.championName = champ.name;
            matchObj.championImage = champ.image;
            gameDetailsArr.push(matchObj);
          }
        });
      });
      setGameDetails(gameDetailsArr);
      setLoading(false);
    };
    matchsAsync();
  }, [matchDetails]);

  // const getTreeImage = async (perkTreeId) => {
  //   const storedRunes = await runes;
  //   storedRunes.forEach(async (rune) => {
  //     console.log(perkTreeId);
  //     if (perkTreeId === rune.treeId) {
  //       const treeURL = await rune.treeImage;
  //       return treeURL;
  //     }
  //   });
  // };

  return (
    <>
      {loading ? (
        ""
      ) : (
        <div className={style.matchContainer}>
          <h1>Match History</h1>
          {gameDetails.length === 6 &&
            gameDetails
              .sort(function (a, b) {
                return new Date(b.gameCreation) - new Date(a.gameCreation);
              })
              .map((game, i) => (
                <div
                  className={
                    game.playerInfo.stats.win
                      ? style.cardContainerWin
                      : style.cardContainerLose
                  }
                  key={i}
                >
                  <div className={style.firstCard}>
                    <p className={style.gameType}>
                      {game.gameType.split(" ").slice(0, 3).join(" ")}
                    </p>
                    <p className={style.gameCreation}>
                      {game.gameCreation.split(" ").slice(0, 4).join(" ")}
                    </p>
                    <p
                      className={
                        game.playerInfo.stats.win ? style.win : style.loss
                      }
                    >
                      {game.playerInfo.stats.win ? "Victory" : "Defeat"}
                    </p>
                    <p className={style.gameDuration}>{`${Math.floor(
                      game.gameDuration / 60
                    )}m ${Math.ceil(game.gameDuration % 60)}s `}</p>
                  </div>

                  <div className={style.secondCard}>
                    <div className={style.imageContainer}>
                      <div className={style.championImg}>
                        <img
                          className={style.championImage}
                          alt={game.championImage}
                          src={`http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/champion/${game.championImage}.png`}
                        />
                      </div>

                      <div className={style.summonerSpellContainer}>
                        {filteredSpells.map(
                          (spell, i) =>
                            +spell.key === game.playerInfo.spell1Id && (
                              <img
                                key={i}
                                alt={spell.name}
                                className={style.summonerSpell}
                                src={`http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/spell/${spell.id}.png`}
                              />
                            )
                        )}

                        {filteredSpells.map(
                          (spell, i) =>
                            +spell.key === game.playerInfo.spell2Id && (
                              <img
                                key={i}
                                alt={spell.name}
                                className={style.summonerSpell2}
                                src={`http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/spell/${spell.id}.png`}
                              />
                            )
                        )}
                      </div>
                      <div className={style.summonerSpellContainer}>
                        <img
                          alt="summoner spell"
                          className={style.summonerSpell}
                          src={runes
                            .filter((rune) => {
                              return (
                                rune.id ===
                                game.playerInfo.stats.perkPrimaryStyle
                              );
                            })
                            .map((rune) => {
                              const perk0 = game.playerInfo.stats.perk0;
                              const perkImage = rune.slots[0].runes.filter(
                                (perk) => {
                                  return perk.id === perk0;
                                }
                              );
                              return `http://raw.communitydragon.org/${
                                game.gameVersion
                              }/plugins/rcp-be-lol-game-data/global/default/v1/${perkImage[0].icon.toLowerCase()}`;
                            })}
                        />

                        <img
                          alt="summoner spell"
                          className={style.summonerSpell2}
                          src={runes
                            .filter((rune) => {
                              return (
                                game.playerInfo.stats.perkSubStyle === rune.id
                              );
                            })
                            .map(
                              (rune) =>
                                `http://raw.communitydragon.org/${
                                  game.gameVersion
                                }/plugins/rcp-be-lol-game-data/global/default/v1/${rune.icon.toLowerCase()}`
                            )}
                        />
                      </div>
                    </div>

                    <div className={style.championName}>
                      {game.championName}
                    </div>
                  </div>

                  <div className={style.thirdCard}>
                    <div className={style.killDeathAssists}>
                      <span>{game.playerInfo.stats.kills} / </span>
                      <span>{game.playerInfo.stats.deaths} / </span>
                      <span>{game.playerInfo.stats.assists}</span>
                    </div>
                    <div className={style.kdaRatio}>
                      <span>
                        {(
                          (game.playerInfo.stats.kills +
                            game.playerInfo.stats.assists) /
                          game.playerInfo.stats.deaths
                        ).toFixed(2)}
                        :1 KDA
                      </span>
                      <div>
                        <span>
                          {game.playerInfo.stats.largestMultiKill === 0 ||
                          game.playerInfo.stats.largestMultiKill === 1
                            ? ""
                            : game.playerInfo.stats.largestMultiKill === 2
                            ? "Double Kill"
                            : game.playerInfo.stats.largestMultiKill === 3
                            ? "Triple Kill"
                            : game.playerInfo.stats.largestMultiKill === 4
                            ? "Quadra Kill"
                            : "Penta Kill"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={style.fourthCard}>
                    <span>level {game.playerInfo.stats.champLevel}</span>
                    <span>
                      {game.playerInfo.stats.totalMinionsKilled +
                        game.playerInfo.stats.neutralMinionsKilled}{" "}
                      cs
                    </span>
                    <span>
                      (
                      {(
                        (game.playerInfo.stats.totalMinionsKilled +
                          game.playerInfo.stats.neutralMinionsKilled) /
                        (game.gameDuration / 60)
                      ).toFixed(1)}
                      )
                    </span>
                  </div>

                  <div className={style.fifthCard}>
                    <div className={style.itemRow1}>
                      <img
                        alt="item"
                        src={
                          game.playerInfo.stats.item0
                            ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item0}.png`
                            : process.env.PUBLIC_URL + "/images/emptyitem.png"
                        }
                      />
                      <img
                        alt="item"
                        src={
                          game.playerInfo.stats.item1
                            ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item1}.png`
                            : process.env.PUBLIC_URL + "/images/emptyitem.png"
                        }
                      />
                      <img
                        alt="item"
                        src={
                          game.playerInfo.stats.item2
                            ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item2}.png`
                            : process.env.PUBLIC_URL + "/images/emptyitem.png"
                        }
                      />
                      <img
                        alt="item"
                        src={
                          game.playerInfo.stats.item6
                            ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item6}.png`
                            : process.env.PUBLIC_URL + "/images/emptyitem.png"
                        }
                      />
                    </div>
                    <div className={style.itemRow2}>
                      <img
                        alt="item"
                        src={
                          game.playerInfo.stats.item3
                            ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item3}.png`
                            : process.env.PUBLIC_URL + "/images/emptyitem.png"
                        }
                      />
                      <img
                        alt="item"
                        src={
                          game.playerInfo.stats.item4
                            ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item4}.png`
                            : process.env.PUBLIC_URL + "/images/emptyitem.png"
                        }
                      />
                      <img
                        alt="item"
                        src={
                          game.playerInfo.stats.item5
                            ? `http://ddragon.leagueoflegends.com/cdn/${game.gameVersion}.1/img/item/${game.playerInfo.stats.item5}.png`
                            : process.env.PUBLIC_URL + "/images/emptyitem.png"
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      )}
    </>
  );
}

export default MatchHistoryCard;
