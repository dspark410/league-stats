import React from 'react'
import style from './home.module.css'
import { AiOutlineSearch } from 'react-icons/ai'
import background from '../components/images/brand.jpg'

function Home({ change, submit, inputResponse }) {
  return (
    <div
      className={style.homeBackgroundContainer}
      style={({ backgroundImage: `url(${background})` }, transform)}
    >
      <div className={style.overlay}></div>
      <div className={style.footer}>
        LeagueStats.com isn't endorsed by Riot Games and doesn't reflect the
        views or opinions of Riot Games or anyone officially involved in
        producing or managing Riot Games properties. Riot Games, and all
        associated properties are trademarks or registered trademarks of Riot
        Games, Inc.
      </div>

      <div className={style.homeContainer}>
        {/* <img
          className={style.homeImage}
          alt="teemo"
          src={process.env.PUBLIC_URL + `/images/teemo.png`}
        /> */}
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
