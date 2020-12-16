import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Tooltip from '../components/Tooltip'
import ChampionDetails from '../components/ChampionDetails'
import style from './home.module.css'

function Home({ change, submit, champInfo, version, inputResponse }) {
  const [freeChamps, setFreeChamps] = useState([])
  const [championDetails, setChampionDetails] = useState([])
  const [getChampInfo, setGetChampInfo] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/getChampionRotation').then((res) => {
      // Store array of numbers for free champion rotation in variable
      const championRotation = res.data.freeChampionIds
      // Filter through champInfo to keep only the object for free champions
      const rotationChamp = champInfo.filter((champ) =>
        // If chamption rotation matches key of free champs, returns true
        championRotation.includes(Number(champ.key))
      )
      // Save free champs into state
      setFreeChamps(rotationChamp)

      // Create an array to store all the champinfo with skin data
      const skinArr = []
      // Loop through all the champs and make an axios call for each champion with the URL that includes skin data
      champInfo.forEach((champ) => {
        axios
          .get(
            `http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/${champ.id}.json`
          )
          .then(async (res) => {
            Object.values(res.data.data).map((champ) => {
              skinArr.push(champ)
            })
            setGetChampInfo(skinArr)
          })
      })
    })
    // Dependency, rerenders when champInfo is ready
  }, [champInfo])

  // OnClick that filters through champInfo when free champion is clicked
  // to return details of champion and set into state
  const selectChampion = (event) => {
    const getChamp = getChampInfo.filter((champ) => {
      return champ.name === event.target.name
    })
    setChampionDetails(getChamp)
  }

  return (
    <div className={style.homeBackgroundContainer}>
      <div className={style.homeContainer}>
        <h1>Enter Summoner Name</h1>
        <form onSubmit={submit}>
          <input spellCheck='false' onChange={change} type='text' />
        </form>
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
                  name={champ.name}
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                />
              </Tooltip>
            ))}
          </div>
          <div>
            {championDetails
              ? championDetails.map((champ, i) => (
                  <ChampionDetails
                    key={i}
                    name={champ.name}
                    title={champ.title}
                    blurb={champ.blurb}
                    images={champ.id}
                    skins={champ.skins}
                  />
                ))
              : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
