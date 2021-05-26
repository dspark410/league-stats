import React, { useEffect, useRef } from 'react'
import style from './navbar.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getDependency } from '../redux/actions/dependencyActions'
import { getInput } from '../redux/actions/inputActions'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { regions } from '../utils/constant'
import {
  AiOutlineSearch,
  AiOutlineInfoCircle,
  IoSearchCircle,
} from 'react-icons/all'

function Navbar() {
  const currentLocation = useLocation()
  const history = useHistory()
  const inputEl = useRef(false)
  const dispatch = useDispatch()

  const {
    summoner: { data },
    dependency: { version },
    input: {
      summonerInput: { name, region },
      showPrevSearches,
      prevSearches,
      hideAnimation,
      nav,
    },
  } = useSelector((state) => state)

  const handleSubmit = (e) => {
    e.preventDefault()

    const clickedSummoner = e.target.getAttribute('value')
    const clickedRegion = e.target.getAttribute('region')

    if (clickedSummoner) {
      handleOnBlur()

      dispatch(getInput('userInput', '', clickedRegion))
      history.push(`/summoner/${clickedRegion}/${clickedSummoner}`)
    } else {
      if (name.trim() === '') {
        return
      } else {
        handleOnBlur()

        dispatch(getInput('userInput', '', region))
        history.push(`/summoner/${region}/${name.replace(/\s/g, '')}`)
      }
    }
  }

  const handleOnFocus = () => {
    dispatch(getInput('show'))
    dispatch(getInput('animateShow'))
  }

  const handleOnBlur = () => {
    dispatch(getInput('animateHide'))
    inputEl.current.blur()
    setTimeout(() => {
      dispatch(getInput('hide'))
    }, 50)
  }

  const removeSearchedSummoner = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const summonerName = e.target.getAttribute('value')
    const region = e.target.getAttribute('region')

    dispatch(getInput('removeSummoner', summonerName, region))
  }

  useEffect(() => {
    if (!version) {
      dispatch(getDependency())
    }

    if (data.summonerInfo) {
      dispatch(
        getInput(
          'addSummoner',
          data.summonerInfo.name,
          data.rgn,
          data.summonerInfo.profileIconId.toString()
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, data])

  return version ? (
    <>
      <nav className={style.navbar} style={{ display: !nav ? 'none' : 'flex' }}>
        <div className={style.navHeader}>
          <Link to='/' className={style.navbarLogo}>
            <img
              className={style.logo}
              alt='League Stats Logo'
              src='https://res.cloudinary.com/mistahpig/image/upload/v1621898557/league-stats/logo/leaguestats_fhwj6u.png'
            />
          </Link>
        </div>

        <div className={style.homeContainer}>
          <div className={style.inputContainer}>
            <div className={style.formContainer}>
              <form onSubmit={handleSubmit} className={style.selectContainer}>
                <select
                  value={region}
                  onChange={(e) =>
                    dispatch(getInput('userInput', name, e.target.value))
                  }
                  className={style.regionSelect}>
                  {regions.map((r, i) => (
                    <option className={style.regionOption} value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
                <input
                  className={style.input}
                  spellCheck='false'
                  onChange={(e) =>
                    dispatch(getInput('userInput', e.target.value, region))
                  }
                  type='text'
                  placeholder='search summoner...'
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  value={name}
                  ref={inputEl}
                />
              </form>
              <AiOutlineSearch
                onClick={handleSubmit}
                className={style.searchIcon}
              />
            </div>
            {showPrevSearches ? (
              <div
                className={
                  hideAnimation
                    ? style.showStorageContainer
                    : style.hideStorageContainer
                }>
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
                      onMouseDown={handleSubmit}
                      value='mistahpig'
                      region='NA1'
                      icon='7'
                      className={style.storageSummoner}>
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
                        className={style.summoner}>
                        mistahpig
                      </span>

                      <div
                        onMouseDown={() => inputEl.current.blur()}
                        className={style.removeContainer}>
                        <p className={style.remove}>x</p>
                      </div>
                    </div>
                    <div
                      onMouseDown={handleSubmit}
                      value='DambitWes'
                      region='NA1'
                      icon='3466'
                      className={style.storageSummoner}>
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
                        className={style.summoner}>
                        DambitWes
                      </span>

                      <div
                        onMouseDown={() => inputEl.current.blur()}
                        className={style.removeContainer}>
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
                          data.summonerInfo
                            ? data.summonerInfo.name &&
                              summoner[0].toLowerCase() ===
                                data.summonerInfo.name.toLowerCase() &&
                              summoner[1] === region &&
                              currentLocation.pathname.includes('summoner')
                              ? handleOnBlur
                              : handleSubmit
                            : handleSubmit
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
                        className={style.removeContainer}>
                        <div
                          onMouseDown={removeSearchedSummoner}
                          value={summoner[0]}
                          region={summoner[1]}
                          icon={summoner[2]}
                          className={style.remove}>
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
