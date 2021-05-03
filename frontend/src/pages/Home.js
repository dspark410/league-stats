/** @format */

import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDependency, getInput, getSummonerInfo } from '../redux/actions'
import style from './home.module.css'
import { regions } from '../utils/constant'
import { AiOutlineSearch, AiOutlineInfoCircle } from 'react-icons/ai'
import { IoSearchCircle } from 'react-icons/io5'

function Home(props) {
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
    },
  } = useSelector((state) => state)

  const handleSubmit = (e) => {
    e.preventDefault()

    const clickedSummoner = e.target.getAttribute('value')
    const clickedRegion = e.target.getAttribute('region')

    if (clickedSummoner) {
      dispatch(getSummonerInfo(clickedSummoner, clickedRegion))
      handleOnBlur()
      dispatch(getInput('userInput', '', clickedRegion))
    } else {
      if (name.trim() === '') {
        return
      } else {
        dispatch(getSummonerInfo(name, region))
        handleOnBlur()
        dispatch(getInput('userInput', ''))
      }
    }
  }

  const handleOnFocus = () => {
    dispatch(getInput('show'))
    dispatch(getInput('animateShow'))
  }

  const handleOnBlur = () => {
    dispatch(getInput('animateHide'))

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
    dispatch(getDependency())

    if (data.summonerInfo)
      dispatch(
        getInput(
          'addSummoner',
          data.summonerInfo.name,
          data.rgn,
          data.summonerInfo.profileIconId.toString()
        )
      )
  }, [dispatch, data])

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <div className={style.inputContainer}>
          <img
            className={style.logo}
            alt='League Stats Logo'
            src={process.env.PUBLIC_URL + '/images/logo/leaguestats.png'}
          />
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
          {showPrevSearches && (
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
                      onMouseDown={handleSubmit}
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
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
