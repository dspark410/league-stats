import React, { useState, useEffect } from 'react'
import style from './championrotation.module.css'
import Tooltip from '../components/Tooltip'
import axios from 'axios'
import ChampionDetails from '../components/ChampionDetails'
import ChampionModal from '../components/ChampionModal'
import { motion } from 'framer-motion'
import Loader from '../components/Loader'

function ChampionRotation({
  champInfo,
  version,
  champDetail,
  selectChampion,
  modalState,
  openModal,
  closeModal,
  showNav,
}) {
  const [freeChamps, setFreeChamps] = useState([])
  const [championDetails, setChampionDetails] = useState()
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // show nav
    showNav()
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
      setLoading(false)
    })
    // Dependency, rerenders when champInfo is ready
  }, [champInfo])

  useEffect(() => {
    setCurrent(0)
    freeChamps.forEach((champ) => {
      if (champ.id === champDetail.id) {
        setChampionDetails(champDetail)
        closeModal()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champDetail])

  // onClick, increases skin + 1, to change loading
  const nextSkin = () => {
    setCurrent(current === championDetails.skins.length - 1 ? 0 : current + 1)
    //console.log("next", championDetails.skins[current]);
  }
  // onClick, increases skin - 1, to change loading
  const prevSkin = () => {
    setCurrent(current === 0 ? championDetails.skins.length - 1 : current - 1)
    //console.log("prev", championDetails.skins[current]);
  }

  return (
    <div className={style.rotationOverlay}>
      <div className={style.overlay}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className={style.championRotationHeader}>Champion Rotation</h1>
            <div className={style.screenContainer}>
              <div className={style.imageContainer}>
                {freeChamps.map((champ, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -1000 }}
                    animate={{ x: 0 }}
                    transition={{
                      delay: 0.2,
                      type: 'tween',
                      stiffness: 120,
                      duration: 0.5,
                    }}
                  >
                    <Tooltip
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
                      <div className={style.champName}>{champ.name}</div>
                    </Tooltip>
                  </motion.div>
                ))}
              </div>
              <div>
                {championDetails ? (
                  <motion.div
                    initial={{ x: 200 }}
                    animate={{ x: 0 }}
                    transition={{
                      delay: 0.2,
                      type: 'tween',
                      stiffness: 120,
                      duration: 0.5,
                    }}
                  >
                    <ChampionDetails
                      championDetails={championDetails}
                      click={openModal}
                      number={current}
                      nextClick={nextSkin}
                      prevClick={prevSkin}
                    />
                  </motion.div>
                ) : (
                  ''
                )}
              </div>

              <ChampionModal
                championDetails={championDetails}
                modalState={modalState}
                closeModal={closeModal}
                current={current}
                prevSkin={prevSkin}
                nextSkin={nextSkin}
                version={version}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ChampionRotation
