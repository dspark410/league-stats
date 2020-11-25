import React from 'react'
import style from './home.module.css'

function Home({ change, submit }) {
  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <h1>Enter Summoner Name</h1>
        <form onSubmit={submit}>
          <input onChange={change} type='text' />
        </form>
      </div>
    </div>
  )
}

export default Home
