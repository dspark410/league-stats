import React, { useEffect, useRef } from 'react'
import style from './home.module.css'
import { regions } from '../utils/constant'
import { AiOutlineSearch, AiOutlineInfoCircle } from 'react-icons/ai'
import { IoSearchCircle } from 'react-icons/io5'

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
  //reference to inputbox
  const inputEl = useRef(false)

  //hide the navbar and set initial recent searches box to closed
  useEffect(() => {
    closeStorage(false)
    hideNav(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return version ? (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <div className={style.inputContainer}>
          <img
            className={style.logo}
            alt='League Stats Logo'
            src={process.env.PUBLIC_URL + '/images/logo/leaguestats.png'}
          />
          <div className={style.formContainer}>
            <form onSubmit={submit} className={style.selectContainer}>
              <select
                defaultValue={region}
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
                    onMouseDown={submit}
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
                      onMouseDown={submit}
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
          )}
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default Home
