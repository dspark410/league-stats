import React, { useState, useEffect, useRef } from 'react'
import style from './navbar.module.css'
import { Link, useLocation } from 'react-router-dom'
import { regions } from '../utils/constant'
import { AiOutlineSearch, AiOutlineInfoCircle } from 'react-icons/ai'
import { IoSearchCircle } from 'react-icons/io5'

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
  summInfo,
}) {
  const [vis, setVis] = useState(visibility)
  const currentLocation = useLocation()
  const inputEl = useRef(false)

  // trigger handlesubmit for new summoner when clicking on a summoner on the previous searched box
  const searchInput = (event) => {
    submit(event)
    inputEl.current.blur()
  }

  // visibility of the navbar
  useEffect(() => {
    setVis(visibility)
  }, [visibility])

  return version ? (
    <>
      <nav className={style.navbar} style={{ display: !vis ? 'none' : 'flex' }}>
        <div className={style.navHeader}>
          <Link to='/' className={style.navbarLogo}>
            <img
              className={style.logo}
              alt='League Stats Logo'
              src={process.env.PUBLIC_URL + '/images/logo/leaguestats.png'}
            />
          </Link>
        </div>

        <div className={style.homeContainer}>
          <div className={style.inputContainer}>
            <div className={style.formContainer}>
              <form onSubmit={searchInput} className={style.selectContainer}>
                <select
                  value={region}
                  onChange={regionSelect}
                  className={style.regionSelect}
                >
                  {regions.map((r, i) => (
                    <option className={style.regionOption} value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
                <input
                  className={style.input}
                  spellCheck='false'
                  onChange={change}
                  type='text'
                  placeholder='search summoner...'
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={inputValue}
                  ref={inputEl}
                />
              </form>
              <AiOutlineSearch
                onClick={searchInput}
                className={style.searchIcon}
              />
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
                      onMouseDown={searchInput}
                      value='mistahpig'
                      region='NA1'
                      icon='7'
                      className={style.storageSummoner}
                    >
                      <div className={style.regionContainer}>
                        <span className={style.region}>NA</span>
                      </div>

                      <img
                        alt='profile icon'
                        className={style.profileIcon}
                        // Grab profile icon
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/7.png`}
                      />
                      <span
                        // onMouseDown={submit}
                        value='mistahpig'
                        region='NA1'
                        icon='7'
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
                      onMouseDown={searchInput}
                      value='DambitWes'
                      region='NA1'
                      icon='3466'
                      className={style.storageSummoner}
                    >
                      <div className={style.regionContainer}>
                        <span className={style.region}>NA</span>
                      </div>
                      <img
                        alt='profile icon'
                        className={style.profileIcon}
                        // Grab profile icon
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/3466.png`}
                      />
                      <span
                        // onMouseDown={submit}
                        value='DambitWes'
                        region='NA1'
                        icon='3466'
                        className={style.summoner}
                      >
                        DambitWes
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
                  prevSearches.map((summoner, i) => (
                    <div key={i} className={style.storageSummoner}>
                      <div
                        className={style.topLayer}
                        onMouseDown={
                          summInfo.summonerInfo
                            ? summInfo.summonerInfo.name &&
                              summoner[0].toLowerCase() ===
                                summInfo.summonerInfo.name.toLowerCase() &&
                              summoner[1] === region &&
                              currentLocation.pathname.includes('summoner')
                              ? handleBlur
                              : searchInput
                            : searchInput
                        }
                        value={summoner[0]}
                        region={summoner[1]}
                        icon={summoner[2]}
                      />
                      <div className={style.regionContainer}>
                        <span className={style.region}>{summoner[1]}</span>
                      </div>

                      <img
                        alt='profile icon'
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
            <Link to='/' className={style.navLinks}>
              Home
            </Link>
          </li>
          <li className={style.navItem}>
            <Link to='/champions' className={style.navLinks}>
              Champions
            </Link>
          </li>
          <li className={style.navItem}>
            <Link to='/leaderboard' className={style.navLinks}>
              Leaderboard
            </Link>
          </li>
        </ul>
      </nav>
    </>
  ) : (
    ''
  )
}

export default Navbar
