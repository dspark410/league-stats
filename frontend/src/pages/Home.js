import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Tooltip from '../components/Tooltip'
import ChampionDetails from '../components/ChampionDetails'
import style from './home.module.css'
import { AiOutlineSearch } from 'react-icons/ai'

function Home({ change, submit, champInfo, version, inputResponse }) {
  const [freeChamps, setFreeChamps] = useState([])
  const [championDetails, setChampionDetails] = useState()

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL || ''
    axios.get(`${url}/getChampionRotation`).then((res) => {
      // Store array of numbers for free champion rotation in variable
      const championRotation = res.data.freeChampionIds
      // Filter through champInfo to keep only the object for free champions
      const rotationChamp = champInfo.filter((champ) =>
        // If chamption rotation matches key of free champs, returns true
        championRotation.includes(Number(champ.key))
      )
      // Save free champs into state
      setFreeChamps(rotationChamp)
    })
    // Dependency, rerenders when champInfo is ready
  }, [champInfo])

  // onClick that makes an axios call to retrieve the specific champion json using
  // event.target.name from mapped free champ images
  const selectChampion = (event) => {
    const getChamp = event.target.name
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/${getChamp}.json`
      )
      .then((res) => {
        setChampionDetails(res.data.data[getChamp])
      })
  }

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <h1>Enter Summoner Name</h1>
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
        <h1>Champion Rotation of the Week</h1>

        <div className={style.screenContainer}>
          <div className={style.imageContainer}>
            {freeChamps.map((champ, i) => (
              <Tooltip
                key={i}
                name={champ.name}
                info={champ.title}
                moreInfo={champ.blurb}
              >
                <img
                  className={style.freeChampsImg}
                  alt={champ.image.full}
                  onClick={selectChampion}
                  name={champ.id}
                  realname={champ.name}
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                />
              </Tooltip>
            ))}
          </div>
          <div>
            {championDetails ? (
              <ChampionDetails championDetails={championDetails} />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
