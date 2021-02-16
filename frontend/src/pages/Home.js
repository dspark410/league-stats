import React, { useState, useEffect } from "react";
import style from "./home.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

function Home({
  change,
  submit,
  inputResponse,
  hideNav,
  prevSearches,
  removeSearchedSummoner,
}) {
  const [showStorage, setShowStorage] = useState(true);

  useEffect(() => {
    setShowStorage(false);
    hideNav();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFocus = () => {
    setShowStorage(true);
  };

  const handleBlur = () => {
    setShowStorage(false);
  };

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <div className={style.inputContainer}>
          <h1>LeagueStats</h1>
          <div className={style.formContainer}>
            <form onSubmit={submit}>
              <input
                spellCheck="false"
                onChange={change}
                type="text"
                placeholder="search summoner..."
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </form>
            <AiOutlineSearch onClick={submit} className={style.searchIcon} />
          </div>
          {showStorage && (
            <div className={style.showStorageContainer}>
              <div className={style.recent}>Recent Searches</div>
              {prevSearches.map((summoner) => (
                <div
                  onMouseDown={submit}
                  value={summoner}
                  className={style.storageSummoner}
                >
                  <span className={style.region}>NA</span>
                  <span className={style.summoner}>{summoner}</span>

                  <div className={style.removeContainer}>
                    <IoClose
                      className={style.remove}
                      onMouseDown={removeSearchedSummoner}
                      value={summoner}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className={style.inputResponse}>{inputResponse}</p>
      </div>
    </div>
  );
}

export default Home;
