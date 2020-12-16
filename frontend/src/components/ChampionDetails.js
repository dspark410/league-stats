import React, { useState, useEffect } from "react";
import style from "./championdetails.module.css";
import { CgPlayTrackNextO, CgPlayTrackPrevO } from "react-icons/cg";
import Loader from "./Loader";
export default function ChampionDetails({ championDetails, name, skins }) {
  const [details, setDetails] = useState();
  const [current, setCurrent] = useState(0);
  //const [loading, setLoading] = useState(true);

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
            // http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${images}_${current}.jpg
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${details.id}_${details.skins[current].num}.jpg`}
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
          <i className={style.next} onClick={nextSkin}>
            <CgPlayTrackNextO className={style.buttonImage} />
          </i>
          <button className={style.prev} onClick={prevSkin}>
            <CgPlayTrackPrevO className={style.buttonImage} />
          </button>
        </div>
      )}
    </>
  );
}
