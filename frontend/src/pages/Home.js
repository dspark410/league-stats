import axios from 'axios'
import React, { useState, useEffect } from 'react'
import style from './home.module.css'

function Home({ change, submit, champInfo }) {
  const [championRotation, setChampionRotation] = useState([])
  const [freeChamps, setFreeChamps] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/getChampionRotation').then((res) => {
      setChampionRotation(res.data.freeChampionIds)
    })
  }, [])

  // Third useEffect where we will filter
  useEffect(() => {
    const rotationChamp = champInfo.filter((champ) => {
      //console.log(Number(champ.key));
      if (championRotation.indexOf(Number(champ.key)) >= 0) {
        return true
      } else {
        return false
      }
    })
    setFreeChamps(rotationChamp)
    //console.log('rotationChamp', rotationChamp)
  }, [champInfo, championRotation])

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <h1>Enter Summoner Name</h1>
        <form onSubmit={submit}>
          <input onChange={change} type='text' />
        </form>
      </div>

      <div className={style.imageContainer}>
        {freeChamps.map((champ, i) => (
          <img
            key={i}
            alt={champ.image}
            src={`http://ddragon.leagueoflegends.com/cdn/10.24.1/img/champion/${champ.image}.png`}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
