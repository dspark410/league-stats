import React, { useEffect } from 'react'
import style from './home.module.css'
import { AiOutlineSearch } from 'react-icons/ai'

function Home({ change, submit, inputResponse, hideNav }) {
  useEffect(() => {
    hideNav()
  }, [])

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.overlay}></div>
      <div className={style.footer}>
        LeagueStats.com isn't endorsed by Riot Games and doesn't reflect the
        views or opinions of Riot Games or anyone officially involved in
        producing or managing Riot Games properties. Riot Games, and all
        associated properties are trademarks or registered trademarks of Riot
        Games, Inc.
      </div>

      <div className={style.homeContainer}>
        <div className={style.inputContainer}>
          <form onSubmit={submit}>
            <input
              spellCheck='false'
              onChange={change}
              type='text'
              placeholder='search summoner...'
            />
          </form>
          <AiOutlineSearch className={style.searchIcon} />
        </div>
        <h2>{inputResponse}</h2>
      </div>
    </div>
  )
}

export default Home
