import React, { useState, useEffect } from 'react'
import style from './championdetails.module.css'
import { CgPlayTrackNextO, CgPlayTrackPrevO } from 'react-icons/cg'
import Loader from './Loader'
export default function ChampionDetails({
  getChampInfo,
  name,
  title,
  blurb,
  images,
  skins,
}) {
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   setLoading(true)
  //   setCurrent(0)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 500)
  //   return
  // }, [skins])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setCurrent(0)
    setTimeout(() => {
      setLoading(false)
    }, 500)
    return function cleanup() {
      mounted = false
    }
  }, [skins])

  const nums = skins.map((skin) => skin.num)

  // onClick, increases skin + 1, to change loading
  const nextSkin = () => {
    setCurrent(current === nums.length - 1 ? 0 : current + 1)
    console.log('next', nums[current])
  }

  const prevSkin = () => {
    setCurrent(current === 0 ? nums.length - 1 : current - 1)
    console.log('prev', nums[current])
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
          <i className={style.next} onClick={nextSkin}>
            <CgPlayTrackNextO className={style.buttonImage} />
          </i>
          <button className={style.prev} onClick={prevSkin}>
            <CgPlayTrackPrevO className={style.buttonImage} />
          </button>
        </div>
      )}
    </>
  )
}
