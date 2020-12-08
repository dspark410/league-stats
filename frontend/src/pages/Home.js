import axios from "axios";
import React, { useState, useEffect } from "react";
import Tooltip from "../components/Tooltip";
import style from "./home.module.css";

function Home({ change, submit, champInfo, version }) {
  const [championRotation, setChampionRotation] = useState([]);
  const [freeChamps, setFreeChamps] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getChampionRotation").then((res) => {
      setChampionRotation(res.data.freeChampionIds);
    });
  }, []);

  // Third useEffect where we will filter
  useEffect(() => {
    const rotationChamp = champInfo.filter((champ) => {
      //console.log(Number(champ.key));
      if (championRotation.indexOf(Number(champ.key)) >= 0) {
        return true;
      } else {
        return false;
      }
    });
    setFreeChamps(rotationChamp);
    //console.log('rotationChamp', rotationChamp)
  }, [champInfo, championRotation]);

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <h1>Enter Summoner Name</h1>
        <form onSubmit={submit}>
          <input spellCheck="false" onChange={change} type="text" />
        </form>
        <div className={style.imageContainer}>
          {freeChamps.map((champ, i) => (
            <Tooltip key={i} name={champ.name} info={champ.title}>
              <img
                alt={champ.image}
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image}.png`}
              />
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
