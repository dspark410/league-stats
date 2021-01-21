import React, { useEffect } from 'react'
import style from './home.module.css'
import { AiOutlineSearch } from 'react-icons/ai'

function Home({ change, submit, inputResponse, hideNav }) {
  useEffect(() => {
    hideNav()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              />
            </form>
            <AiOutlineSearch onClick={submit} className={style.searchIcon} />
          </div>
        </div>
        <h2>{inputResponse}</h2>
      </div>
    </div>
  )
}

export default Home
