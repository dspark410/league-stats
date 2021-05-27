import React, { useEffect, useRef } from 'react'
import style from './home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getDependency } from '../redux/actions/dependencyActions'
import { getInput, changeNav } from '../redux/actions/inputActions'
import { regions } from '../utils/constant'
import {
  AiOutlineSearch,
  AiOutlineInfoCircle,
  IoSearchCircle,
} from 'react-icons/all'
import DefaultSearchHistory from '../components/DefaultSearchHistory'
import PreviousSearchHistory from '../components/PreviousSearchHistory'

function Home({ history }) {
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

  useEffect(() => {
    dispatch(changeNav('hideNav'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return version ? (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <div className={style.inputContainer}>
          <img
            className={style.logo}
            alt='League Stats Logo'
            src='https://res.cloudinary.com/mistahpig/image/upload/v1621898557/league-stats/logo/leaguestats_fhwj6u.png'
          />
          <div className={style.formContainer}>
            <form onSubmit={handleSubmit} className={style.selectContainer}>
              <select
                className={style.selectContainerSelect}
                value={region}
                onChange={(e) =>
                  dispatch(getInput('userInput', name, e.target.value))
                }>
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
                <DefaultSearchHistory
                  version={version}
                  handleSubmit={handleSubmit}
                  inputEl={inputEl}
                />
              ) : (
                prevSearches.map((summoner, i) => (
                  <PreviousSearchHistory
                    key={i}
                    summoner={summoner}
                    handleSubmit={handleSubmit}
                    removeSearchedSummoner={removeSearchedSummoner}
                    version={version}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null
}

export default Home
