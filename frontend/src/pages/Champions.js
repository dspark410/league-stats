import React, { useState, useEffect } from "react";
import style from "./champions.module.css";
import axios from "axios";
import Tooltip from "../components/Tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";

function Champions({ champInfo, version }) {
  const [input, setInput] = useState("");
  const [autofill, setAutofill] = useState([]);
  const [championDetails, setChampionDetails] = useState({});

  useEffect(() => {
    // Populates screen with all champion at start
    setAutofill(champInfo);
  }, [champInfo]);

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
          {autofill.map((champ, i) => (
            <Tooltip
              key={i}
              name={champ.name}
              info={champ.title}
              moreInfo={champ.blurb}
            >
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                //exit={{ y: -1000, opacity: 0 }}
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
        </div>
        {/* <div>
        {championDetails ? (
          <ChampionDetails championDetails={championDetails} />
        ) : (
          ''
        )}
      </div> */}
      </div>
    </>
  );
}

export default Champions;
