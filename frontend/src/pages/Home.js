import React from "react";
import style from "./home.module.css";
import { AiOutlineSearch } from "react-icons/ai";

function Home({ change, submit, inputResponse }) {
  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <img
          className={style.homeImage}
          alt="teemo"
          src={process.env.PUBLIC_URL + `/images/teemo.png`}
        />
        <div className={style.inputContainer}>
          <form onSubmit={submit}>
            <input
              spellCheck="false"
              onChange={change}
              type="text"
              placeholder="search summoner..."
            />
          </form>
          <AiOutlineSearch className={style.searchIcon} />
        </div>
        <h2>{inputResponse}</h2>
      </div>
    </div>
  );
}

export default Home;
