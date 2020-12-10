import axios from "axios";
import React, { useState, useEffect } from "react";
import Tooltip from "../components/Tooltip";
import style from "./home.module.css";

function Home({ change, submit, champInfo, version, inputResponse }) {
  const [freeChamps, setFreeChamps] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getChampionRotation").then((res) => {
      // Store array of numbers for free champion rotation in variable
      const championRotation = res.data.freeChampionIds;
      // Filter through champInfo to keep only the object for free champions
      const rotationChamp = champInfo.filter((champ) =>
        // If chamption rotation matches key of free champs, returns true
        championRotation.includes(Number(champ.key))
      );
      // Save free champs into state
      setFreeChamps(rotationChamp);
    });
    // Dependency, rerenders when champInfo is ready
  }, [champInfo]);

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <h1>Enter Summoner Name</h1>
        <form onSubmit={submit}>
          <input spellCheck="false" onChange={change} type="text" />
        </form>
        <h2>{inputResponse}</h2>
        <h1>Free Champion for the Week</h1>
        <h3>Click for more info</h3>
        <div className={style.imageContainer}>
          {freeChamps.map((champ, i) => (
            <Tooltip
              key={i}
              name={champ.name}
              info={champ.title}
              moreInfo={champ.blurb}
            >
              <img
                alt={champ.image}
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
              />
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
