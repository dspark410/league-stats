import React, { useState, useEffect } from "react";
import style from "./championdetails.module.css";
import Loader from "./Loader";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function ChampionDetails({ championDetails }) {
  const [current, setCurrent] = useState();
  const [details, setDetails] = useState();

  // Sets loading to false and current to 0 when receiving championDetails
  useEffect(() => {
    setCurrent(0);

    setDetails(championDetails);
  }, [championDetails]);

  // onClick, increases skin + 1, to change loading
  const nextSkin = () => {
    setCurrent(current === details.skins.length - 1 ? 0 : current + 1);
    //console.log("next", details.skins[current]);
  };

  const prevSkin = () => {
    setCurrent(current === 0 ? details.skins.length - 1 : current - 1);
    //console.log("prev", details.skins[current]);
  };

  return (
    <>
      {!details ? (
        <Loader />
      ) : (
        <div className={style.imageContainer}>
          <img
            className={style.championLoading}
            alt={details.id}
            /////////////////////////////////////////////////////////////////////////////////////
            // SPLASH ART
            // https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${images}_${current}.jpg
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${details.id}_${details.skins[current].num}.jpg`}
          />
          <img
            className={style.championBorder}
            alt="border"
            src={process.env.PUBLIC_URL + "/images/challenger-border.png"}
          />
          <p className={style.championName}>
            {details.skins[current].name === "default"
              ? details.name
              : details.skins[current].name}
          </p>

          <FaAngleRight className={style.buttonImageNext} onClick={nextSkin} />
          <FaAngleLeft className={style.buttonImagePrev} onClick={prevSkin} />
        </div>
      )}
    </>
  );
}
