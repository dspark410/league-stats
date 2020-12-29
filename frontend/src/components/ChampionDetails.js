import React, { useState, useEffect } from "react";
import style from "./championdetails.module.css";
import Loader from "./Loader";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function ChampionDetails({
  championDetails,
  click,

  number,
  prevClick,
  nextClick,
}) {
  const [details, setDetails] = useState();

  // Sets loading to false and current to 0 when receiving championDetails
  useEffect(() => {
    setDetails(championDetails);
  }, [championDetails]);

  return (
    <>
      {!details ? (
        <Loader />
      ) : (
        <div className={style.imageContainer}>
          <img
            onClick={click}
            className={style.championLoading}
            alt={details.id}
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${details.id}_${details.skins[number].num}.jpg`}
          />
          <img
            className={style.championBorder}
            alt="border"
            src={process.env.PUBLIC_URL + "/images/challenger-border.png"}
          />
          <p className={style.championName}>
            {details.skins[number].name === "default"
              ? details.name
              : details.skins[number].name}
          </p>

          <FaAngleRight className={style.buttonImageNext} onClick={nextClick} />
          <FaAngleLeft className={style.buttonImagePrev} onClick={prevClick} />
        </div>
      )}
    </>
  );
}
