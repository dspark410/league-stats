import React, { useState, useEffect, useRef } from 'react'
import style from './home.module.css'
import { AiOutlineSearch } from 'react-icons/ai'

function Home({
  change,
  submit,
  inputResponse,
  hideNav,
  prevSearches,
  removeSearchedSummoner,
  inputValue,
}) {
  const [showStorage, setShowStorage] = useState(true)

  const inputEl = useRef(false)

  useEffect(() => {
    setShowStorage(false)
    hideNav()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFocus = () => {
    setShowStorage(true)
  }

  const handleBlur = () => {
    setShowStorage(false)
  }

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <div className={style.inputContainer}>
          <h1>LeagueStats</h1>
          <div className={style.formContainer}>
            <form onSubmit={submit}>
              <input
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
            <div className={style.showStorageContainer}>
              <div className={style.recent}>
                {prevSearches.length === 0
                  ? 'Summoner Example'
                  : 'Recent Searches'}
              </div>
              {prevSearches.length === 0 ? (
                <>
                  <div
                    onMouseDown={submit}
                    value='mistahpig'
                    className={style.storageSummoner}
                  >
                    <span className={style.region}>NA</span>
                    <span className={style.summoner}>mistahpig</span>

                    <div
                      onMouseDown={() => inputEl.current.blur()}
                      className={style.removeContainer}
                    >
                      <p className={style.remove}>x</p>
                    </div>
                  </div>
                  <div
                    onMouseDown={submit}
                    value='dambitwes'
                    className={style.storageSummoner}
                  >
                    <span className={style.region}>NA</span>
                    <span className={style.summoner}>dambitwes</span>

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
                    value={summoner}
                    className={style.storageSummoner}
                  >
                    <span className={style.region}>NA</span>
                    <span className={style.summoner}>{summoner}</span>

                    <div
                      onMouseDown={removeSearchedSummoner}
                      value={summoner}
                      className={style.removeContainer}
                    >
                      <div
                        onMouseDown={removeSearchedSummoner}
                        value={summoner}
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
        <p className={style.inputResponse}>{inputResponse}</p>
      </div>
    </div>
  )
}

export default Home
