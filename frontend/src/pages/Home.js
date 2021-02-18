import React, { useState, useEffect, useRef } from "react";
import style from "./home.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { regions } from "../utils/constant";

function Home({
  change,
  submit,
  region,
  hideNav,
  prevSearches,
  removeSearchedSummoner,
  inputValue,
  regionSelect,
}) {
  const [showStorage, setShowStorage] = useState(true);
  const [hideAnimation, setHideAnimation] = useState(true);

  const inputEl = useRef(false);

  useEffect(() => {
    setShowStorage(false);
    hideNav();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFocus = () => {
    setHideAnimation(true);
    setShowStorage(true);
  };

  const handleBlur = () => {
    setHideAnimation(false);
    setTimeout(() => {
      setShowStorage(false);
    }, 50);
  };

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <div className={style.inputContainer}>
          <h1>LeagueStats</h1>
          <div className={style.formContainer}>
            <form onSubmit={submit}>
              <select
                defaultValue={region}
                onChange={regionSelect}
                className={style.regionSelect}
              >
                {regions.map((r) => (
                  <option className={style.regionOption} value={r} key={r}>
                    {r}
                  </option>
                ))}
              </select>
              <input
                spellCheck="false"
                onChange={change}
                type="text"
                placeholder="search summoner..."
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={inputValue}
                ref={inputEl}
              />
            </form>
            <AiOutlineSearch onClick={submit} className={style.searchIcon} />
          </div>
          {showStorage && (
            <div
              className={
                hideAnimation
                  ? style.showStorageContainer
                  : style.hideStorageContainer
              }
            >
              <div className={style.recent}>
                {prevSearches.length === 0
                  ? "Summoner Example"
                  : "Recent Searches"}
              </div>
              {prevSearches.length === 0 ? (
                <>
                  <div
                    onMouseDown={submit}
                    value="mistahpig"
                    region="NA1"
                    className={style.storageSummoner}
                  >
                    <span className={style.region}>NA</span>
                    <span
                      onMouseDown={submit}
                      value="mistahpig"
                      region="NA1"
                      className={style.summoner}
                    >
                      mistahpig
                    </span>

                    <div
                      onMouseDown={() => inputEl.current.blur()}
                      className={style.removeContainer}
                    >
                      <p className={style.remove}>x</p>
                    </div>
                  </div>
                  <div
                    onMouseDown={submit}
                    value="dambitwes"
                    region="NA1"
                    className={style.storageSummoner}
                  >
                    <span className={style.region}>NA</span>
                    <span
                      onMouseDown={submit}
                      value="dambitwes"
                      region="NA1"
                      className={style.summoner}
                    >
                      dambitwes
                    </span>

                    <div
                      onMouseDown={() => inputEl.current.blur()}
                      className={style.removeContainer}
                    >
                      <p className={style.remove}>x</p>
                    </div>
                  </div>
                </>
              ) : (
                prevSearches.map((summoner) => (
                  <div
                    onMouseDown={submit}
                    value={summoner[0]}
                    region={summoner[1]}
                    className={style.storageSummoner}
                  >
                    <span className={style.region}>{summoner[1]}</span>
                    <span
                      onMouseDown={submit}
                      value={summoner[0]}
                      region={summoner[1]}
                      className={style.summoner}
                    >
                      {summoner[0]}
                    </span>

                    <div
                      onMouseDown={removeSearchedSummoner}
                      value={summoner[0]}
                      region={summoner[1]}
                      className={style.removeContainer}
                    >
                      <div
                        onMouseDown={removeSearchedSummoner}
                        value={summoner[0]}
                        region={summoner[1]}
                        className={style.remove}
                      >
                        x
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
