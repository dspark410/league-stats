import React, { useState, useEffect, useCallback } from "react";
import style from "./championrotation.module.css";
import Tooltip from "../components/Tooltip";
import axios from "axios";
import ChampionDetails from "../components/ChampionDetails";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import ReactModal from "react-modal";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

function ChampionRotation({ champInfo, version }) {
  const [freeChamps, setFreeChamps] = useState([]);
  const [championDetails, setChampionDetails] = useState();
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
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
        setCurrent(0);
        setChampionDetails(res.data.data[getChamp]);
      });
  };

  // onClick for champion details that opens up modal
  // Will send championDetail into ModalState
  const championModal = () => {
    setModalOpen(true);
  };

  // onClick to close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // onClick, increases skin + 1, to change loading
  const nextSkin = () => {
    setCurrent(current === championDetails.skins.length - 1 ? 0 : current + 1);
    //console.log("next", championDetails.skins[current]);
  };
  // onClick, increases skin - 1, to change loading
  const prevSkin = () => {
    setCurrent(current === 0 ? championDetails.skins.length - 1 : current - 1);
    //console.log("prev", championDetails.skins[current]);
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
                  key={i}
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
                  <ChampionDetails
                    championDetails={championDetails}
                    click={championModal}
                    number={current}
                    nextClick={nextSkin}
                    prevClick={prevSkin}
                  />
                </motion.div>
              ) : (
                ""
              )}
            </div>
            <ReactModal isOpen={modalOpen} ariaHideApp={false}>
              {championDetails ? (
                <div className={style.modalContent}>
                  <FaAngleLeft
                    className={style.buttonImagePrev}
                    onClick={prevSkin}
                  />

                  <img
                    className={style.modalSplashImage}
                    alt={championDetails.image.full}
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championDetails.id}_${championDetails.skins[current].num}.jpg`}
                  />
                  <FaAngleRight
                    className={style.buttonImageNext}
                    onClick={nextSkin}
                  />
                  <div className={style.modalDetails}>
                    <h2>{championDetails.name}</h2>
                    <h3>{championDetails.title}</h3>
                    <br />
                    <h5>{championDetails.lore}</h5>
                  </div>
                </div>
              ) : (
                ""
              )}

              <button onClick={closeModal}>Close</button>
            </ReactModal>
          </div>
        </>
      )}
    </>
  );
}

export default ChampionRotation;
