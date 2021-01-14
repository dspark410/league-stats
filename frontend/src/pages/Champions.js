import React, { useState, useEffect } from "react";
import style from "./champions.module.css";
import axios from "axios";
import Tooltip from "../components/Tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import ChampionModal from "../components/ChampionModal";

function Champions({
  champInfo,
  version,
  champDetail,
  selectChampion,
  modalState,
  openModal,
  closeModal,
  showNav,
}) {
  const [input, setInput] = useState("");
  const [autofill, setAutofill] = useState([]);
  const [championDetails, setChampionDetails] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    //show nav
    showNav();
    // Populates screen with all champion at start
    setAutofill(champInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champInfo]);

  useEffect(() => {
    if (champDetail && modalState) {
      openModal();
    }

    setChampionDetails(champDetail);
    setCurrent(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className={style.championsOverlay}>
      <div className={style.overlay}>
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

          <ChampionModal
            championDetails={championDetails}
            modalState={modalState}
            closeModal={closeModal}
            current={current}
            prevSkin={prevSkin}
            nextSkin={nextSkin}
            version={version}
          />
        </div>
      </div>
    </div>
  );
}

export default Champions;
