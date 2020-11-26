import Axios from "axios";
import React, { useState, useEffect } from "react";
import style from "./home.module.css";

function Home({ change, submit }) {
  const [championRotation, setChampionRotation] = useState([]);
  const [champions, setChampions] = useState([]);
  const [champKey, setChampKey] = useState([]);
  const [freeChamps, setFreeChamps] = useState([]);

  useEffect(() => {
    (async function () {
      Axios.get("http://localhost:5000/getChampionRotation").then((res) => {
        setChampionRotation(res.data.freeChampionIds);
      });
      Axios.get(
        "http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion.json"
      ).then((res) => {
        setChampions(res.data.data);
      });
    })();
  }, []);

  //console.log("championRotation", championRotation);

  useEffect(() => {
    const champNameArray = Object.keys(champions);
    const champDetailArray = Object.values(champions);

    const newArray = [];

    for (let i = 0; i < champNameArray.length; i++) {
      const name = champNameArray[i];
      const key = champDetailArray[i].key;

      const object = {
        name,
        key,
      };

      newArray.push(object);
    }
    setChampKey(newArray);
  }, [champions]);

  //console.log("ChampKey", champKey);

  // Third useEffect where we will filter
  useEffect(() => {
    const rotationChamp = champKey.filter((champ) => {
      //console.log(Number(champ.key));
      if (championRotation.indexOf(Number(champ.key)) >= 0) {
        return true;
      } else {
        return false;
      }
    });
    setFreeChamps(rotationChamp);
  }, [champKey, championRotation]);

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <h1>Enter Summoner Name</h1>
        <form onSubmit={submit}>
          <input onChange={change} type="text" />
        </form>
      </div>
    </div>
  );
}

export default Home;
