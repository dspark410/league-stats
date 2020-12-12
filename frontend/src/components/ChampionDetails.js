import React, { useState } from 'react'
import style from './championdetails.module.css'

export default function ChampionDetails({ name, title, blurb, images }) {
  const [skin, setSkin] = useState(0)

  // http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/Aatrox.json

  // onClick, increases skin + 1, to change splash
  const changeSkin = () => {
    setSkin(skin + 1)
  }

  // Error handler to detect when additional skin no longer exists
  // Set state of skin back to 0 to return original skin
  const errorHandler = () => {
    setSkin(0)
  }

  return (
    <div className={style.imageContainer}>
      <img
        className={style.championSplash}
        alt={images}
        onError={errorHandler}
        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${images}_${skin}.jpg`}
      />

      <button onClick={changeSkin}>Change Skin</button>
    </div>
  )
}
