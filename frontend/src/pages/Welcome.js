import React, { useState, useEffect } from "react";
import style from "./welcome.module.css";
import axios from "axios";
import MasteryCard from "../components/MasteryCard";

function Welcome({ summonerInfo, champInfo }) {
  const [mastery, setMastery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredChamps, setFilteredChamps] = useState([]);

  useEffect(() => {
    if (!summonerInfo.id) {
      console.log("Summoner info not in state");
      //Get Sessions data
      const sessionData = JSON.parse(sessionStorage.getItem("summonerInfo"));

      axios
        .get(`http://localhost:5000/masteries/${sessionData.id}`)
        .then((res) => {
          setMastery(res.data);
          setLoading(false);
          //console.log("mastery", res.data);
        });
    } else {
      axios
        .get(`http://localhost:5000/masteries/${summonerInfo.id}`)
        .then((res) => {
          setMastery(res.data);
          setLoading(false);
          //console.log("mastery", res.data);
        });
    }
  }, [summonerInfo.id]);

  useEffect(() => {
    const champObject = [];
    mastery.filter((champ) => {
      champInfo.map((champion) => {
        if (champ.championId === +champion.key) {
          const name = champion.name;
          const key = champ.championId;
          const image = champion.image;
          const level = champ.championLevel;
          const points = champ.championPoints;

          const object = {
            name,
            key,
            image,
            level,
            points,
          };
          champObject.push(object);
        }
      });
    });
    setFilteredChamps(champObject);
  }, [mastery, champInfo]);

  return (
    <div className={style.welcomeBackgroundContainer}>
      <div className={style.welcomeContainer}>
        <div>
          <h1>Welcome {summonerInfo.name}</h1>
        </div>
        <div>{loading ? "" : mastery[0].championPoints}</div>
        <div>{loading ? "" : mastery[1].championPoints}</div>
        <div>{loading ? "" : mastery[2].championPoints}</div>
        <pre>{JSON.stringify(filteredChamps, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Welcome;
