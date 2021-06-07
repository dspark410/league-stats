import React, { useEffect } from 'react'
import style from './champions.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { changeNav } from '../redux/actions/inputActions'
import {
  getChampion,
  setChampion,
  setRole,
  setInput,
  clearTimer,
} from '../redux/actions/championActions'
import { AiOutlineSearch } from 'react-icons/ai'
import { laneChamp } from '../utils/constant'
import ChampionSkeleton from './ChampionSkeleton'
import Tooltip from '../components/Tooltip'

function Champions({ history }) {
  const dispatch = useDispatch()
  const roleArr = ['All', 'Free', 'Top', 'Jungle', 'Mid', 'AD Carry', 'Support']

  const {
    summoner: {
      data: { mastery },
    },
    dependency: { version, champInfo, freeChamps, latestChamp },
    champion: { championLoading, autofill, champs, role, input, fade },
  } = useSelector((state) => state)

  // Change Handler for input
  const changeHandler = (event) => {
    // Filters as user types to display only champion with matching string
    const filtered = champs.filter((champ) =>
      champ.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    if (!championLoading) dispatch(setInput(event.target.value, filtered))
  }

  const clickHandler = (event) => {
    const getChamp = event.target.getAttribute('name')
    history.push(`/champions/${getChamp.toLowerCase()}`)
  }

  useEffect(() => {
    dispatch(changeNav('showNav'))
    dispatch(getChampion(champInfo))
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })

    return () => {
      dispatch(clearTimer())
      dispatch(setRole('all'))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champInfo, dispatch])

  // useEffect(() => {
  //   dispatch(setChampion(champInfo))
  // }, [champs, role])

  // filtering onClick by role
  useEffect(() => {
    switch (role) {
      case 'all':
        dispatch(setChampion(champInfo))
        dispatch(setInput('', champInfo))
        break
      case 'free':
        dispatch(setChampion(freeChamps))
        dispatch(setInput('', champInfo))
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

        dispatch(setChampion(topS.concat(topA).concat(topB)))
        dispatch(setInput('', champInfo))
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

        dispatch(setChampion(midS.concat(midA).concat(midB)))
        dispatch(setInput('', champInfo))
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

        dispatch(setChampion(adcS.concat(adcA).concat(adcB)))
        dispatch(setInput('', champInfo))
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

        dispatch(setChampion(supportS.concat(supportA).concat(supportB)))
        dispatch(setInput('', champInfo))
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

        dispatch(setChampion(jungleS.concat(jungleA).concat(jungleB)))
        dispatch(setInput('', champInfo))
        break
      default:
        dispatch(setChampion(champInfo))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, champInfo])

  return (
    <>
      {latestChamp && (
        <>
          <div className={style.searchContainer}>
            <h1 className={style.championList}>Champion List</h1>
            <div className={style.rolesContainer}>
              {roleArr.map((roles, i) => (
                <div
                  key={i}
                  onClick={
                    championLoading
                      ? null
                      : () =>
                          dispatch(
                            setRole(roles.toLowerCase().replace(/\s/g, ''))
                          )
                  }
                  className={
                    championLoading
                      ? style.noHover
                      : role === roles.toLowerCase().replace(/\s/g, '')
                      ? style.currentRole
                      : style.roleContainer
                  }>
                  <img
                    className={
                      roles === 'Free'
                        ? `${style.rotateImage}`
                        : `${style.roleImage}`
                    }
                    alt={role.toLowerCase()}
                    src={
                      roles === 'Free'
                        ? `https://res.cloudinary.com/mistahpig/image/upload/v1621898912/league-stats/champion%20role%20icons/all.png`
                        : `https://res.cloudinary.com/mistahpig/image/upload/v1621898912/league-stats/champion%20role%20icons/${roles
                            .toLowerCase()
                            .replace(/\s/g, '')}.png`
                    }
                  />
                  <label className={style.roleLabel}>{roles}</label>
                </div>
              ))}
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
          {!championLoading && champInfo && version && autofill ? (
            <>
              <div className={style.screenContainer}>
                {latestChamp.length === 0 ? null : (
                  <h2>Latest Champion{latestChamp.length > 1 ? 's' : ''}</h2>
                )}

                <div
                  className={
                    !championLoading
                      ? style.latestContainerAnimate
                      : style.latestContainer
                  }>
                  <>
                    {latestChamp.map((latestChamp, i) => {
                      return (
                        <Tooltip
                          key={i}
                          name={latestChamp.name}
                          info={latestChamp.title}
                          moreInfo={latestChamp.blurb}>
                          <div className={style.latestImage}>
                            <img
                              alt={latestChamp.image.full}
                              onClick={clickHandler}
                              name={latestChamp.id}
                              realname={latestChamp.name}
                              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${latestChamp.image.full}`}
                            />
                            <div className={style.champName}>
                              {latestChamp.name}
                            </div>
                          </div>
                        </Tooltip>
                      )
                    })}
                  </>
                </div>
                <div className={style.imageContainer}>
                  <>
                    {fade &&
                      autofill &&
                      autofill
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
                            moreInfo={champ.blurb}>
                            <div
                              className={!championLoading && style.latestImage}>
                              <img
                                style={{
                                  border: mastery
                                    ? mastery
                                        .filter((master) => {
                                          return master.id === champ.id
                                        })
                                        .map(
                                          (mast) => 'solid 3px rgb(199 169 100'
                                        )
                                    : 'solid 2px #9865b6',
                                }}
                                alt={champ.image.full}
                                onClick={clickHandler}
                                name={champ.id}
                                realname={champ.name}
                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                              />

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
            latestChamp &&
            champInfo && (
              <ChampionSkeleton latest={latestChamp} champs={champInfo} />
            )
          )}
        </>
      )}
    </>
  )
}

export default Champions
