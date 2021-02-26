import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import style from "./navbar.module.css";
import { AiOutlineSearch, AiOutlineInfoCircle } from "react-icons/ai";
import { IoSearchCircle } from "react-icons/io5";
import { regions } from "../utils/constant";

function Navbar({
  visibility,
  change,
  submit,
  prevSearches,
  removeSearchedSummoner,
  regionSelect,
  region,
  inputValue,
  version,
  showStorage,
  hideAnimation,
  handleFocus,
  handleBlur,
  skeletonTrue,
  summonerInfo,
  inputRef,
}) {
  const [vis, setVis] = useState(visibility);

  const inputEl = useRef(false);

  useEffect(() => {
    setVis(visibility);
  }, [visibility]);

  return (
    <>
      <nav className={style.navbar} style={{ display: !vis ? "none" : "flex" }}>
        <div className={style.navHeader}>
          <Link to="/" className={style.navbarLogo}>
            League Stats
          </Link>
        </div>

        <div className={style.homeContainer}>
          <div className={style.inputContainer}>
            <div className={style.formContainer}>
              <form onSubmit={submit} className={style.selectContainer}>
                <select
                  value={region}
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
                  ref={(inputEl, inputRef)}
                />
              </form>
              <AiOutlineSearch onClick={submit} className={style.searchIcon} />
            </div>
            {showStorage ? (
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
                      // onClick={skeletonTrue}
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
                      // onClick={skeletonTrue}
                      onMouseDown={submit}
                      value="Dambitwes"
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
                        value="Dambitwes"
                        region="NA1"
                        icon="3466"
                        className={style.summoner}
                      >
                        Dambitwes
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
                      // onClick={skeletonTrue}

                      className={style.storageSummoner}
                    >
                      <div
                        className={style.topLayer}
                        onMouseDown={
                          summoner[0].toLowerCase() ===
                            summonerInfo.name.toLowerCase() &&
                          summoner[1] === region
                            ? handleBlur
                            : submit
                        }
                        value={summoner[0]}
                        region={summoner[1]}
                        icon={summoner[2]}
                      />
                      <div className={style.regionContainer}>
                        <span className={style.region}>{summoner[1]}</span>
                      </div>

                      <img
                        alt="profile icon"
                        className={style.profileIcon}
                        // Grab profile icon
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner[2]}.png`}
                      />
                      <span className={style.summoner}>{summoner[0]}</span>

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
            ) : null}
          </div>
        </div>

        <ul className={style.navMenu}>
          <li className={style.navItem}>
            <Link to="/" className={style.navLinks}>
              Home
            </Link>
          </li>
          <li className={style.navItem}>
            <Link to="/champions" className={style.navLinks}>
              Champions
            </Link>
          </li>
          <li className={style.navItem}>
            <Link to="/leaderboard" className={style.navLinks}>
              Leaderboard
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
