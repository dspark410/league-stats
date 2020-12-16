import React, { useState, useEffect } from 'react'
import style from './championdetails.module.css'
import Loader from './Loader'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

export default function ChampionDetails({ name, title, blurb, images, skins }) {
  const [current, setCurrent] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrent(0)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [skins])

  const nums = skins.map((skin) => skin.num)

  // onClick, increases skin + 1, to change loading
  const nextSkin = () => {
    setCurrent(current === nums.length - 1 ? 0 : current + 1)
  }

  const prevSkin = () => {
    setCurrent(current === 0 ? nums.length - 1 : current - 1)
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.imageContainer}>
          <img
            className={style.championLoading}
            alt={images}
            /////////////////////////////////////////////////////////////////////////////////////
            // SPLASH ART
            // http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${images}_${current}.jpg
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${images}_${nums[current]}.jpg`}
          />
          <img
            className={style.championBorder}
            alt='border'
            src={process.env.PUBLIC_URL + '/images/challenger-border.png'}
          />
          <p className={style.championName}>
            {skins[current].name === 'default' ? name : skins[current].name}
          </p>

          <FaAngleRight className={style.buttonImageNext} onClick={nextSkin} />
          <FaAngleLeft className={style.buttonImagePrev} onClick={prevSkin} />
        </div>
      )}
    </>
  )
}
