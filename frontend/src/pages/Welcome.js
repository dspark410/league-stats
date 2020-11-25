import React, { useState } from "react";
import style from "./welcome.module.css";
import axios from "axios";

function Welcome({ summonerInfo }) {
  const [mastery, setMastery] = useState([]);

  const handleClick = () => {
    if (!summonerInfo.id) {
      console.log("Summoner info not in state");
    } else {
      axios
        .get(`http://localhost:5000/summoner/${summonerInfo.id}`)
        .then((res) => {
          setMastery(res.data);
          console.log(res.data);
        });
    }
  };

  return (
    <div className={style.welcomeBackgroundContainer}>
      <div className={style.welcomeContainer}>
        <div>
          <h1>Welcome {summonerInfo.name}</h1>
          <button onClick={handleClick}>Get info</button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
