import React, { useState, useEffect } from "react";
import style from "./welcome.module.css";
import axios from "axios";
import MasteryCard from "../components/MasteryCard";
import RankCard from "../components/RankCard";
import UnrankedCard from "../components/UnrankedCard";
import SummonerCard from "../components/SummonerCard";
import MatchHistoryCard from "../components/MatchHistoryCard";

function Welcome({ summonerInfo, champInfo, version, getPlayerName }) {
  const [mastery, setMastery] = useState([]);
  const [rank, setRank] = useState([]);
  const [filteredChamps, setFilteredChamps] = useState([]);
  const [session, setSession] = useState({});
  const [playerMatches, setPlayerMatches] = useState([]);
  const [matchDetails, setMatchDetails] = useState([]);

  // Function for masteries call specific to summoner id
  const getMasteries = (id) =>
    axios.get(`http://localhost:5000/masteries/${id}`);

  // Function for rank call specific to summoner id
  const getRank = (id) => axios.get(`http://localhost:5000/rank/${id}`);

  const getMatchList = (id) =>
    axios.get(`http://localhost:5000/matchList/${id}`);

  useEffect(() => {
    if (!summonerInfo.id) {
      // Checks if summonerInfo.id is available, if not grab identical copy from sessionStorage
      const sessionData = JSON.parse(sessionStorage.getItem("summonerInfo"));
      setSession(sessionData);

      // Get masteries using sessionStorage and set into state
      getMasteries(sessionData.id).then((res) => {
        setMastery(res.data);
        getRank(sessionData.id).then((res) => setRank(res.data));

        getMatchList(sessionData.accountId).then((res) =>
          setPlayerMatches(res.data.matches)
        );
      });
    } else {
      // Get masteries from state and set into state
      getMasteries(summonerInfo.id).then((res) => {
        setMastery(res.data);
        getRank(summonerInfo.id).then((res) => setRank(res.data));
        getMatchList(summonerInfo.accountId).then((res) =>
          setPlayerMatches(res.data.matches)
        );
      });
    }
    // Dependency, rerenders when summonerInfo.id is ready
  }, [summonerInfo]);

  useEffect(() => {
    // Array to store newly created object that matches champion key to mastery key
    const champObject = [];
    // Nested for loop that compares mastery array to champInfo array for matches
    mastery.forEach((champ) => {
      champInfo.forEach((champion) => {
        if (champ.championId === +champion.key) {
          const name = champion.name;
          const key = champ.championId;
          const image = champion.image.full;
          const level = champ.championLevel;
          const points = champ.championPoints;

          // Create our own object containing neccessary data to push to champObject
          const object = {
            name,
            key,
            image,
            level,
            points,
          };
          // Push object to champObject
          champObject.push(object);
        }
      });
    });
    // Stores new array of object into state to be mapped
    setFilteredChamps(champObject);
  }, [mastery, champInfo]);

  //
  // DEFINITELY CAN REFACTOR
  //
  // Match Details
  useEffect(() => {
    // Empty array to store match details
    const matchArray = [];

    // Slice to determine how many previous matches to render
    playerMatches.slice(0, 6).forEach((match) => {
      axios
        .get(`http://localhost:5000/matchDetails/${match.gameId}`)
        .then((res) => matchArray.push(res.data))
        .then(() => {
          // Need this .then because setMatchDetails renders too quickly
          // Forces it to wait for matchArray to reach correct length
          matchArray.length === 6 && setMatchDetails(matchArray);
        });
    });
    // Dependent on playerMatches to be ready
  }, [playerMatches]);

  return (
    <div className={style.welcomeBackgroundContainer}>
      <h1 className={style.summonerName}>
        Welcome, {summonerInfo.name || session.name}
      </h1>
      <SummonerCard version={version} summonerInfo={summonerInfo} />
      <div className={style.welcomeContainer}>
        <div className={style.appLeft}>
          <MatchHistoryCard
            version={version}
            matchDetails={matchDetails}
            summonerInfo={summonerInfo}
            champInfo={champInfo}
            getPlayerName={getPlayerName}
          />
        </div>
        <div className={style.appRight}>
          <h1>Ranked</h1>

          <div className={style.rankCardContainer}>
            {!rank.length ? (
              <>
                <UnrankedCard queueType="RANKED_FLEX_SR" />
                <UnrankedCard queueType="RANKED_SOLO_5x5" />
              </>
            ) : rank.length < 2 && rank[0].queueType === "RANKED_SOLO_5x5" ? (
              <>
                <RankCard rank={rank[0]} />
                <UnrankedCard queueType={"RANKED_FLEX_SR"} />
              </>
            ) : rank.length < 2 && rank[0].queueType === "RANKED_FLEX_SR" ? (
              <>
                <RankCard rank={rank[0]} />
                <UnrankedCard queueType={"RANKED_SOLO_5x5"} />
              </>
            ) : (
              rank.map((ranking, i) => <RankCard key={i} rank={ranking} />)
            )}
          </div>
          <div className={style.masteryCardContainer}>
            <h1>Champion Mastery</h1>
            <div className={style.masteryCardContainer2}>
              {filteredChamps.length < 3
                ? filteredChamps.map((champ, i) => {
                    return (
                      <MasteryCard
                        version={version}
                        key={i}
                        masteryChamp={champ}
                      />
                    );
                  })
                : filteredChamps.slice(0, 3).map((champ, i) => {
                    return (
                      <MasteryCard
                        version={version}
                        key={i}
                        masteryChamp={champ}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
