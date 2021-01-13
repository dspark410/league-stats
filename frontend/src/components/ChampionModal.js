import React from "react";
import style from "./championmodal.module.css";
import ReactModal from "react-modal";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Tooltip from "../components/Tooltip";

export default function ChampionModal({
  championDetails,
  modalState,
  closeModal,
  current,
  prevSkin,
  nextSkin,
  version,
}) {
  return (
    <ReactModal
      onRequestClose={closeModal}
      className={style.modalContainer}
      isOpen={modalState}
      ariaHideApp={false}
      style={{ overlay: { zIndex: 1000 } }}
      closeTimeoutMS={500}
    >
      {championDetails ? (
        <div className={style.modalContent}>
          <h1 className={style.modalHeader}>
            {championDetails.skins[current].name === "default"
              ? championDetails.name
              : championDetails.skins[current].name}
          </h1>
          <FaAngleLeft className={style.buttonImagePrev} onClick={prevSkin} />

          <img
            className={style.modalSplashImage}
            alt={championDetails.image.full}
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championDetails.id}_${championDetails.skins[current].num}.jpg`}
          />

          <FaAngleRight className={style.buttonImageNext} onClick={nextSkin} />
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
                  <Tooltip key={i} name={spell.name} info={spell.description}>
                    <div className={style.spellImageContainer}>
                      <img
                        className={style.spellImage}
                        alt="champion skills"
                        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                      />
                      <span className={style.spellKey}>
                        {i === 0 ? "Q" : i === 1 ? "W" : i === 2 ? "E" : "R"}
                      </span>
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          </div>
          <div className={style.modalFooter}>
            <Link to="/championdetail" onClick={closeModal}>
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
  );
}
