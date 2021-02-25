import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from './champions.module.css'
import Tooltip from '../components/Tooltip'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { laneChamp } from '../utils/constant'
import ChampionSkeleton from './ChampionSkeleton'

function Champions({
  champInfo,
  version,
  selectChampion,
  showNav,
  latest,
  region,
}) {
  const [input, setInput] = useState('')
  const [role, setRole] = useState('all')
  const [champs, setChamps] = useState([])
  const [autofill, setAutofill] = useState([])
  const [freeChamps, setFreeChamps] = useState([])
  const [loading, setLoading] = useState(true)
  const [fade, setFade] = useState(true)

  const url = process.env.REACT_APP_API_URL || ''

  useEffect(() => {
    //show nav
    showNav()

    setTimeout(() => {
      axios.get(`${url}/getChampionRotation/${region}`).then((res) => {
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
    }, 2500)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champInfo])

  useEffect(() => {
    switch (role) {
      case 'all':
        setChamps(champInfo)
        break
      case 'free':
        setChamps(freeChamps)
        break
      case 'top':
        const topS = laneChamp.Top.s.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        const topA = laneChamp.Top.a.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        const topB = laneChamp.Top.b.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        setChamps(topS.concat(topA).concat(topB))

        break
      case 'mid':
        const midS = laneChamp.Mid.s.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        const midA = laneChamp.Mid.a.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        const midB = laneChamp.Mid.b.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        setChamps(midS.concat(midA).concat(midB))
        break
      case 'adcarry':
        const adcS = laneChamp.Adc.s.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        const adcA = laneChamp.Adc.a.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        const adcB = laneChamp.Adc.b.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        setChamps(adcS.concat(adcA).concat(adcB))
        break
      case 'support':
        const supportS = laneChamp.Support.s.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        const supportA = laneChamp.Support.a.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        const supportB = laneChamp.Support.b.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        setChamps(supportS.concat(supportA).concat(supportB))
        break
      case 'jungle':
        const jungleS = laneChamp.Jungle.s.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        const jungleA = laneChamp.Jungle.a.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        const jungleB = laneChamp.Jungle.b.map((champion) => {
          return champInfo.filter((champ) => champ.name === champion)[0]
        })

        setChamps(jungleS.concat(jungleA).concat(jungleB))
        break
      default:
        setChamps(champInfo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, champInfo])

  useEffect(() => {
    setFade(false)
    setTimeout(() => {
      setFade(true)
    }, 200)
  }, [champs, autofill])

  // Change Handler for input
  const changeHandler = (event) => {
    setInput(event.target.value)

    // Filters as user types to display only champion with matching string
    const filtered = champs.filter((champ) =>
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
      {Array.isArray(latest) && (
        <>
          <div className={style.searchContainer}>
            <h1 className={style.championList}>Champion List</h1>
            <div className={style.rolesContainer}>
              <div
                onClick={() => setRole('all')}
                className={
                  role === 'all' ? style.currentRole : style.roleContainer
                }
              >
                <img
                  className={style.roleImage}
                  alt='Role-Top'
                  src={process.env.PUBLIC_URL + '/images/roles/all.png'}
                />
                <label className={style.roleLabel}>All</label>
              </div>
              <div
                onClick={() => setRole('free')}
                className={
                  role === 'free' ? style.currentRole : style.roleContainer
                }
              >
                <img
                  className={`${style.roleImage} ${style.rotateImage}`}
                  alt='Role-Top'
                  src={process.env.PUBLIC_URL + '/images/roles/all.png'}
                />
                <label className={style.roleLabel}>Free</label>
              </div>
              <div
                onClick={() => setRole('top')}
                className={
                  role === 'top' ? style.currentRole : style.roleContainer
                }
              >
                <img
                  className={style.roleImage}
                  alt='Role-Top'
                  src={process.env.PUBLIC_URL + '/images/roles/top.png'}
                />
                <label className={style.roleLabel}>Top</label>
              </div>
              <div
                onClick={() => setRole('jungle')}
                className={
                  role === 'jungle' ? style.currentRole : style.roleContainer
                }
              >
                <img
                  className={style.roleImage}
                  alt='Role-Jungle'
                  src={process.env.PUBLIC_URL + '/images/roles/jungle.png'}
                />
                <label className={style.roleLabel}>Jungler</label>
              </div>
              <div
                onClick={() => setRole('mid')}
                className={
                  role === 'mid' ? style.currentRole : style.roleContainer
                }
              >
                <img
                  className={style.roleImage}
                  alt='Role-Mid'
                  src={process.env.PUBLIC_URL + '/images/roles/mid.png'}
                />
                <label className={style.roleLabel}>Mid</label>
              </div>
              <div
                onClick={() => setRole('adcarry')}
                className={
                  role === 'adcarry' ? style.currentRole : style.roleContainer
                }
              >
                <img
                  className={style.roleImage}
                  alt='Role-AD Carry'
                  src={process.env.PUBLIC_URL + '/images/roles/adcarry.png'}
                />
                <label className={style.roleLabel}>AD Carry</label>
              </div>
              <div
                onClick={() => setRole('support')}
                className={
                  role === 'support' ? style.currentRole : style.roleContainer
                }
              >
                <img
                  className={style.roleImage}
                  alt='Role-Support'
                  src={process.env.PUBLIC_URL + '/images/roles/support.png'}
                />
                <label className={style.roleLabel}>Support</label>
              </div>
            </div>

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
          {!loading ? (
            <>
              <div className={style.screenContainer}>
                <h2>Latest Champion{latest.length > 1 ? 's' : ''}</h2>
                <div
                  className={
                    !loading
                      ? style.latestContainerAnimate
                      : style.latestContainer
                  }
                >
                  <>
                    {latest.map((latest, i) => {
                      return (
                        <>
                          <Tooltip
                            key={i}
                            name={latest.name}
                            info={latest.title}
                            moreInfo={latest.blurb}
                          >
                            <div className={style.latestImage}>
                              <Link to='/championdetail'>
                                <img
                                  alt={latest.image.full}
                                  onClick={selectChampion}
                                  name={latest.id}
                                  realname={latest.name}
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${latest.image.full}`}
                                />
                              </Link>

                              <div className={style.champName}>
                                {latest.name}
                              </div>
                            </div>
                          </Tooltip>
                        </>
                      )
                    })}
                  </>
                </div>
                <div className={style.imageContainer}>
                  <>
                    {fade && input === ''
                      ? champs
                          .sort(function (a, b) {
                            if (a.name < b.name) {
                              return -1
                            }
                            if (a.name > b.name) {
                              return 1
                            }
                            return 0
                          })
                          .map((champ, i) => (
                            <Tooltip
                              key={i}
                              name={champ.name}
                              info={champ.title}
                              moreInfo={champ.blurb}
                            >
                              <div className={!loading && style.latestImage}>
                                <Link to='/championdetail'>
                                  <img
                                    alt={champ.image.full}
                                    onClick={selectChampion}
                                    name={champ.id}
                                    realname={champ.name}
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                                  />
                                </Link>

                                <div className={style.champName}>
                                  {champ.name}
                                </div>
                              </div>
                            </Tooltip>
                          ))
                      : autofill.map((champ, i) => (
                          <Tooltip
                            key={i}
                            name={champ.name}
                            info={champ.title}
                            moreInfo={champ.blurb}
                          >
                            <div className={style.latestImage}>
                              <Link to='/championdetail'>
                                <img
                                  alt={champ.image.full}
                                  onClick={selectChampion}
                                  name={champ.id}
                                  realname={champ.name}
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                                />
                              </Link>
                              <div className={style.champName}>
                                {champ.name}
                              </div>
                            </div>
                          </Tooltip>
                        ))}
                  </>
                </div>
              </div>
            </>
          ) : (
            <ChampionSkeleton latest={latest} champs={champInfo} />
          )}
        </>
      )}
    </>
  )
}

export default Champions
