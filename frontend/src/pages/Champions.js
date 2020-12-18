import React, { useState, useEffect } from "react";
import style from "./champions.module.css";
import axios from "axios";
import Tooltip from "../components/Tooltip";
import AutoComplete from "../components/AutoComplete";

function Champions({ champInfo, version }) {
  const [input, setInput] = useState("");
  //const [inputArr, setInputArr] = useState([]);
  const [autofill, setAutofill] = useState([]);
  const [championDetails, setChampionDetails] = useState({});

  useEffect(() => {
    // setInputArr(
    //   champInfo.reduce((accu, champ) => {
    //     accu.push(champ.name);
    //     return accu;
    //   }, [])
    // );
    setAutofill(champInfo);
  }, [champInfo]);

  // Change Handler for input
  const changeHandler = (event) => {
    setInput(event.target.value);
    if (!event.target.value) {
      setAutofill(champInfo);
    }
    const filtered = champInfo.filter((champ) =>
      champ.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setAutofill(filtered);
  };

  // SubmiteHandler for input
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(champInfo);
  };

  // onClick that makes an axios call to retrieve the specific champion json using
  // event.target.name from mapped free champ images
  const selectChampion = (event) => {
    const getChamp = event.target.name;
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/${getChamp}.json`
      )
      .then((res) => {
        setChampionDetails(res.data.data[getChamp]);
      });
  };

  return (
    <>
      <div className={style.searchContainer}>
        <h1 className={style.championList}>Champion List</h1>
        <AutoComplete
          change={changeHandler}
          input={input}
          submit={handleSubmit}
        />
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
              <img
                className={style.freeChampsImg}
                alt={champ.image.full}
                onClick={selectChampion}
                name={champ.id}
                realname={champ.name}
                src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
              />
              <div className={style.champName}>{champ.name}</div>
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
