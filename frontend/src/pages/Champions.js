import React, { useState, useEffect } from "react";
import style from "./champions.module.css";
import axios from "axios";
import Tooltip from "../components/Tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import ReactModal from "react-modal";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Champions({
  champInfo,
  version,
  champDetail,
  selectChampion,
  modalState,
  openModal,
  closeModal,
}) {
  const [input, setInput] = useState("");
  const [autofill, setAutofill] = useState([]);
  const [championDetails, setChampionDetails] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Populates screen with all champion at start
    setAutofill(champInfo);
  }, [champInfo]);

  useEffect(() => {
    if (champDetail && modalState) {
      openModal();
    }

    setChampionDetails(champDetail);
    setCurrent(0);
  }, [champDetail]);

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

  // Change Handler for input
  const changeHandler = (event) => {
    setInput(event.target.value);

    // Filters as user types to display only champion with matching string
    const filtered = champInfo.filter((champ) =>
      champ.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setAutofill(filtered);
  };

  // SubmiteHandler for input
  const handleSubmit = (event) => {
    event.preventDefault();

    // When input gives back just one champion, submit would call for the champion's
    // JSON file and store it in state
    if (autofill.length === 1) {
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/${autofill[0].id}.json`
        )
        .then((res) => {
          setChampionDetails(res.data.data[autofill[0].id]);
        });
    }
  };

  return (
    <>
      <div className={style.searchContainer}>
        <h1 className={style.championList}>Champion List</h1>
        <div className={style.inputContainer}>
          <form onSubmit={handleSubmit}>
            <input
              spellCheck="false"
              type="text"
              onChange={changeHandler}
              value={input}
              placeholder="search champion..."
            />
          </form>
          <AiOutlineSearch
            className={style.searchIcon}
            onClick={handleSubmit}
          />
        </div>
      </div>

      <div className={style.screenContainer}>
        <div className={style.imageContainer}>
          <AnimatePresence>
            {autofill.map((champ, i) => (
              <Tooltip
                key={i}
                name={champ.name}
                info={champ.title}
                moreInfo={champ.blurb}
              >
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
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
                </motion.div>
              </Tooltip>
            ))}
          </AnimatePresence>
        </div>

        <ReactModal
          onRequestClose={closeModal}
          className={style.modalContainer}
          isOpen={modalState}
          ariaHideApp={false}
        >
          {championDetails ? (
            <div className={style.modalContent}>
              <h1 className={style.modalHeader}>
                {championDetails.skins[current].name === "default"
                  ? championDetails.name
                  : championDetails.skins[current].name}
              </h1>
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
                <p>
                  {championDetails.tags.map((tag, i) => (
                    <i key={i}>{tag} </i>
                  ))}
                </p>
                <br />
                <h5>{championDetails.lore}</h5>
                <br />
                <h4 className={style.spellHeader}>Spells</h4>
                <div className={style.spellContainer}>
                  {championDetails.passive ? (
                    <Tooltip
                      name={championDetails.passive.name}
                      info={championDetails.passive.description}
                    >
                      <div className={style.spellImageContainer}>
                        <img
                          className={style.spellImage}
                          alt="champion passive"
                          src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${championDetails.passive.image.full}`}
                        />
                        <span className={style.spellKey}>P</span>
                      </div>
                    </Tooltip>
                  ) : null}
                  {championDetails.spells.map((spell, i) => {
                    return (
                      <Tooltip
                        key={i}
                        name={spell.name}
                        info={spell.description}
                      >
                        <div className={style.spellImageContainer}>
                          <img
                            className={style.spellImage}
                            alt="champion skills"
                            src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                          />
                          <span className={style.spellKey}>
                            {i === 0
                              ? "Q"
                              : i === 1
                              ? "W"
                              : i === 2
                              ? "E"
                              : "R"}
                          </span>
                        </div>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
              <div className={style.modalFooter}>
                <Link to={"/championdetail"} onClick={closeModal}>
                  <button onClick={closeModal} className={style.moreInfoBtn}>
                    More Info
                  </button>
                </Link>
                <button className={style.closeBtn} onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </ReactModal>
      </div>
    </>
  );
}

export default Champions;
