import React, { useEffect, useRef } from "react";
import style from "./home.module.css";
import { AiOutlineSearch, AiOutlineInfoCircle } from "react-icons/ai";
import { IoSearchCircle } from "react-icons/io5";
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
  version,
  closeStorage,
  showStorage,
  hideAnimation,
  handleFocus,
  handleBlur,
}) {
  const inputEl = useRef(false);

  useEffect(() => {
    closeStorage();
    hideNav();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <div className={style.inputContainer}>
          <h1>LeagueStats</h1>
          <div className={style.formContainer}>
            <form onSubmit={submit} className={style.selectContainer}>
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
                className={style.input}
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
              <div className={style.recentContainer}>
                {prevSearches.length === 0 ? (
                  <div className={style.recent}>
                    <AiOutlineInfoCircle className={style.infoIcon} />
                    <div>Summoner Example</div>
                  </div>
                ) : (
                  <div className={style.recent}>
                    <IoSearchCircle className={style.infoIcon} />
                    <div>Recent Searches</div>
                  </div>
                )}
              </div>
              {prevSearches.length === 0 ? (
                <>
                  <div
                    onMouseDown={submit}
                    value="mistahpig"
                    region="NA1"
                    icon="7"
                    className={style.storageSummoner}
                  >
                    <div className={style.regionContainer}>
                      <span className={style.region}>NA</span>
                    </div>

                    <img
                      alt="profile icon"
                      className={style.profileIcon}
                      // Grab profile icon
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/7.png`}
                    />
                    <span
                      // onMouseDown={submit}
                      value="mistahpig"
                      region="NA1"
                      icon="7"
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
                    icon="3466"
                    className={style.storageSummoner}
                  >
                    <div className={style.regionContainer}>
                      <span className={style.region}>NA</span>
                    </div>
                    <img
                      alt="profile icon"
                      className={style.profileIcon}
                      // Grab profile icon
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/3466.png`}
                    />
                    <span
                      // onMouseDown={submit}
                      value="dambitwes"
                      region="NA1"
                      icon="3466"
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
                    key={summoner}
                    onMouseDown={submit}
                    value={summoner[0]}
                    region={summoner[1]}
                    icon={summoner[2]}
                    className={style.storageSummoner}
                  >
                    <div className={style.regionContainer}>
                      <span className={style.region}>{summoner[1]}</span>
                    </div>

                    <img
                      alt="profile icon"
                      className={style.profileIcon}
                      // Grab profile icon
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner[2]}.png`}
                    />
                    <span
                      // onMouseDown={submit}
                      // value={summoner[0]}
                      // region={summoner[1]}
                      // icon={summoner[2]}
                      className={style.summoner}
                    >
                      {summoner[0]}
                    </span>

                    <div
                      onMouseDown={removeSearchedSummoner}
                      value={summoner[0]}
                      region={summoner[1]}
                      icon={summoner[2]}
                      className={style.removeContainer}
                    >
                      <div
                        onMouseDown={removeSearchedSummoner}
                        value={summoner[0]}
                        region={summoner[1]}
                        icon={summoner[2]}
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
