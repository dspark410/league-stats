import React, { useState } from 'react'
import style from './champions.module.css'
import axios from 'axios'
import ChampionDetails from '../components/ChampionDetails'
import Tooltip from '../components/Tooltip'
function Champions({ champInfo, version }) {
  const [championDetails, setChampionDetails] = useState()

  // onClick that makes an axios call to retrieve the specific champion json using
  // event.target.name from mapped free champ images
  const selectChampion = (event) => {
    const getChamp = event.target.name
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/${getChamp}.json`
      )
      .then((res) => {
        setChampionDetails(res.data.data[getChamp])
      })
  }

  return (
    <div className={style.screenContainer}>
      <div className={style.imageContainer}>
        {champInfo.map((champ, i) => (
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
              src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
            />
            <div className={style.champName}>{champ.name}</div>
          </Tooltip>
        ))}
      </div>
      {/* <div>
        {championDetails ? (
          <ChampionDetails championDetails={championDetails} />
        ) : (
          ''
        )}
      </div> */}
    </div>
  )
}

export default Champions
