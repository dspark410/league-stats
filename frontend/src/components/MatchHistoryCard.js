import React, { useState, useEffect, useRef } from "react";
import style from "./matchhistorycard.module.css";
import axios from "axios";
import HistoryCard from "./HistoryCard";
import MatchesLoader from "./MatchesLoader";

function MatchHistoryCard({
  summonerInfo,
  champInfo,
  version,
  getPlayerName,
  queues,
  playerMatches,
  region,
  live,
  skeletonFalse,
}) {
  const visible = playerMatches.length < 7 ? playerMatches.length : 7;
  const [gameDetails, setGameDetails] = useState([]);
  const [runes, setRunes] = useState([]);
  const [spells, setSpells] = useState([]);
  const [matchDetails, setMatchDetails] = useState([]);
  const [index, setIndex] = useState(visible);
  const [matchesLoader, setMatchesLoader] = useState(false);

  // Get info from Session Storage
  const sessionData = JSON.parse(sessionStorage.getItem("summonerInfo"));

  const url = process.env.REACT_APP_API_URL || "";

  let source = axios.CancelToken.source();

  let moreMatchesMounted = useRef();

  // Funtion for loading more matches
  const getMoreMatches = async () => {
    moreMatchesMounted.current = true;

    setMatchesLoader(true);
    if (moreMatchesMounted) {
      setTimeout(async () => {
        const matchArr = [];

        for (let i = index; i < index + 5; i++) {
          if (!moreMatchesMounted.current) return;
          if (i < playerMatches.length) {
            await axios
              .get(`${url}/matchDetails/${playerMatches[i].gameId}/${region}`, {
                cancelToken: source.token,
              })
              .then(async (res) => {
                if (res.status > 500) return;

                const newMatch = createGameObject(res.data, queues, champInfo);
                matchArr.push(newMatch);
              });
          }
        }
        setGameDetails((prevGames) => [...prevGames, ...matchArr]);

        setIndex((prevIndex) => prevIndex + 5);

        setMatchesLoader(false);
      }, 2000);
    }
  };

  const createGameObject = (match, queues, champInfo) => {
    const matchObj = queues
      .filter((queue) => match.queueId === queue.queueId)
      .map((queue) => {
        const date = new Date(match.gameCreation).toString();

        const object = {
          map: queue.map,
          gameType: queue.description,
          gameCreation: date,
          originalDate: match.gameCreation,
          gameDuration: match.gameDuration,
          gameVersion: match.gameVersion.split(".").slice(0, 2).join("."),
          players: [],
          participants: match.participants,
          platformId: match.platformId,
        };

        return object;
      })[0];

    // loops through current account id in session or summonerInfo
    // To grab the right info for match history card
    let playerObj;
    if (match.participantIdentities) {
      match.participantIdentities.forEach((id) => {
        if (
          id.player.accountId === summonerInfo.accountId ||
          id.player.accountId === sessionData.accountId ||
          id.player.summonerId === summonerInfo.id ||
          id.player.summonerId === sessionData.id
        ) {
          matchObj.participantId = id.participantId;
        }
        // Champion Icon for summoner and summoner name on sixth and seventh card

        match.participants.forEach((part) => {
          if (id.participantId === part.participantId) {
            playerObj = {
              id: id.participantId,
              name: id.player.summonerName,
              champId: part.championId,
            };
          }
          champInfo.forEach((key) => {
            if (playerObj.champId === +key.key) {
              playerObj.image = key.image.full;
            }
          });
        });
        matchObj.players.push(playerObj);
      });
    }

    // finds matching participantId from matchObj and keeps all data from matching participants
    if (match.participants) {
      match.participants.forEach((data) => {
        if (data.participantId === matchObj.participantId) {
          const playerStats = data;
          matchObj.playerInfo = playerStats;
        }
      });
    }

    // get relevant image for player's champion for that game
    if (champInfo) {
      champInfo.forEach((champ) => {
        if (matchObj.playerInfo) {
          if (matchObj.playerInfo.championId === +champ.key) {
            matchObj.championName = champ.name;
            matchObj.championImage = champ.image.full;
          }
        }
      });
      return matchObj;
    }
  };

  useEffect(() => {
    let mounted = true;

    // Validation to check if version is populated in props

    if (version && mounted) {
      // Retrieve list of summoner spells from Riot API
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`,
          { cancelToken: source.token }
        )
        .then((res) => {
          setSpells(Object.values(res.data.data));
        });
      // Retrieve list of runes from Riot APIf
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`,
          { cancelToken: source.token }
        )
        .then((res) => {
          setRunes(res.data);
        });
    }

    return () => {
      mounted = false;
      source.cancel("spells and runes got unmounted");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  //
  // DEFINITELY CAN REFACTOR
  //
  // Match Details
  useEffect(() => {
    // Empty array to store match details
    const matchArray = [];
    let mounted = true;
    setIndex(visible);

    if (index === 0) {
      setMatchDetails([]);
    }

    // Slice to determine how many previous matches to render
    if (mounted) {
      Promise.all(
        playerMatches.slice(0, visible).map(async (match) => {
          const res = await axios.get(
            `${url}/matchDetails/${match.gameId}/${region}`,
            { cancelToken: source.token }
          );
          return matchArray.push(res.data);
        })
      ).then(() => {
        setMatchDetails(matchArray);
      });
    }

    return () => {
      mounted = false;
      source.cancel("matchdetails useeffect got unmounted");
    };
    // Dependent on playerMatches to be ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerMatches]);

  useEffect(() => {
    return () => {
      moreMatchesMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const gameDetailsArr = [];
    let skeleTimer;

    if (matchDetails.length === index) {
      matchDetails.forEach((match) => {
        // Loops through queue state, to match game type ex. 5v5 , 3v3, summoners rift, ranked

        if (match.queueId >= 2000) {
          return;
        }

        if (match > 500) return;

        gameDetailsArr.push(createGameObject(match, queues, champInfo));
        setGameDetails(gameDetailsArr);
      });
      skeleTimer = setTimeout(() => {
        skeletonFalse();
      }, 8000);
    }
    return () => {
      clearInterval(skeleTimer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDetails]);

  return (
    <div className={style.matchContainer}>
      <div>
        {gameDetails.length >= visible ? (
          gameDetails
            .sort(function (a, b) {
              return new Date(b.gameCreation) - new Date(a.gameCreation);
            })
            .map((game, i) => {
              return (
                <HistoryCard
                  key={i}
                  game={game}
                  spells={spells}
                  runes={runes}
                  summonerInfo={summonerInfo}
                  getPlayerName={getPlayerName}
                  live={live}
                />
              );
            })
        ) : (
          <div className={style.noMatchContainer}>
            <div className={style.matchHeader}>Match History</div>
            <div className={style.noMatches}>No Matches Were Found.</div>
          </div>
        )}

        {gameDetails.length >= visible && (
          <div
            onClick={
              index < playerMatches.length && !matchesLoader
                ? getMoreMatches
                : null
            }
          >
            {index >= playerMatches.length ? (
              <button disabled className={style.none}>
                More Matches Unavailable
              </button>
            ) : (
              <button
                disabled={matchesLoader}
                className={style.moreMatchesContainer}
              >
                More Matches {matchesLoader && <MatchesLoader />}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchHistoryCard;
