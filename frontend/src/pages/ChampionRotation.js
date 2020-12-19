import React, { useState, useEffect } from "react";
import style from "./championrotation.module.css";
import Tooltip from "../components/Tooltip";
import axios from "axios";
import ChampionDetails from "../components/ChampionDetails";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

function ChampionRotation({ champInfo, version }) {
  const [freeChamps, setFreeChamps] = useState([]);
  const [championDetails, setChampionDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL || "";
    axios.get(`${url}/getChampionRotation`).then((res) => {
      // Store array of numbers for free champion rotation in variable
      const championRotation = res.data.freeChampionIds;
      // Filter through champInfo to keep only the object for free champions
      const rotationChamp = champInfo.filter((champ) =>
        // If chamption rotation matches key of free champs, returns true
        championRotation.includes(Number(champ.key))
      );
      // Save free champs into state
      setFreeChamps(rotationChamp);
      setLoading(false);
    });
    // Dependency, rerenders when champInfo is ready
  }, [champInfo]);

  // onClick that makes an axios call to retrieve the specific champion json using
  // event.target.name from mapped free champ images
  const selectChampion = (event) => {
    const getChamp = event.target.name;
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/${getChamp}.json`
      )
      .then((res) => {
        setChampionDetails(res.data.data[getChamp]);
      });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className={style.championRotationHeader}>Champion Rotation</h1>
          <div className={style.screenContainer}>
            <div className={style.imageContainer}>
              {freeChamps.map((champ, i) => (
                <motion.div
                  initial={{ x: -1000 }}
                  animate={{ x: 0 }}
                  transition={{
                    delay: 0.2,
                    type: "tween",
                    stiffness: 120,
                    duration: 0.5,
                  }}
                >
                  <Tooltip
                    key={i}
                    name={champ.name}
                    info={champ.title}
                    moreInfo={champ.blurb}
                  >
                    <img
                      className={style.freeChampsImg}
                      alt={champ.image.full}
                      onClick={selectChampion}
                      name={champ.id}
                      realname={champ.name}
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                    />
                    <div className={style.champName}>{champ.name}</div>
                  </Tooltip>
                </motion.div>
              ))}
            </div>
            <div>
              {championDetails ? (
                <motion.div
                  initial={{ x: 800 }}
                  animate={{ x: 0 }}
                  transition={{
                    delay: 0.2,
                    type: "tween",
                    stiffness: 120,
                    duration: 0.5,
                  }}
                >
                  <ChampionDetails championDetails={championDetails} />
                </motion.div>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ChampionRotation;
