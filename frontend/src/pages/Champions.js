import React, { useState, useEffect } from 'react'
import style from './champions.module.css'
import axios from 'axios'
import Tooltip from '../components/Tooltip'
import ChampionModal from '../components/ChampionModal'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Champions({ champInfo, version, selectChampion, showNav }) {
  const [input, setInput] = useState('')
  const [autofill, setAutofill] = useState([])
  const [championDetails, setChampionDetails] = useState()

  useEffect(() => {
    //show nav
    showNav()
    // Populates screen with all champion at start
    setAutofill(champInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champInfo])

  // Change Handler for input
  const changeHandler = (event) => {
    setInput(event.target.value)

    // Filters as user types to display only champion with matching string
    const filtered = champInfo.filter((champ) =>
      champ.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setAutofill(filtered)
  }

  // // SubmiteHandler for input
  // const handleSubmit = (event) => {
  //   event.preventDefault()

  //   // When input gives back just one champion, submit would call for the champion's
  //   // JSON file and store it in state
  //   if (autofill.length === 1) {
  //     axios
  //       .get(
  //         `https://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/${autofill[0].id}.json`
  //       )
  //       .then((res) => {
  //         setChampionDetails(res.data.data[autofill[0].id])
  //       })
  //   }
  // }

  return (
    <>
      <div className={style.searchContainer}>
        <h1 className={style.championList}>Champion List</h1>
        <div className={style.inputContainer}>
          {/* <form onSubmit={handleSubmit}> */}
          <input
            spellCheck='false'
            type='text'
            onChange={changeHandler}
            value={input}
            placeholder='search champion...'
          />
          {/* </form> */}
          <AiOutlineSearch
            className={style.searchIcon}
            // onClick={handleSubmit}
          />
        </div>
      </div>

      <div className={style.screenContainer}>
        <div className={style.imageContainer}>
          <AnimatePresence>
            {autofill.map((champ, i) => (
              <Tooltip
                key={i}
                name={champ.name}
                info={champ.title}
                moreInfo={champ.blurb}
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                >
                  <Link to='/championdetail'>
                    <img
                      className={style.freeChampsImg}
                      alt={champ.image.full}
                      onClick={selectChampion}
                      name={champ.id}
                      realname={champ.name}
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                    />
                  </Link>
                  <div className={style.champName}>{champ.name}</div>
                </motion.div>
              </Tooltip>
            ))}
          </AnimatePresence>
        </div>

        <ChampionModal championDetails={championDetails} version={version} />
      </div>
    </>
  )
}

export default Champions
