import React, { useEffect } from 'react'
import style from './champions.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getInput } from '../redux/actions/inputActions'
import {
  getChampion,
  setChampion,
  setRole,
  setInput,
} from '../redux/actions/championActions'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { laneChamp } from '../utils/constant'
import ChampionSkeleton from './ChampionSkeleton'
import Tooltip from '../components/Tooltip'

function Champions({ selectChampion }) {
  const dispatch = useDispatch()

  const {
    dependency: { version, champInfo, freeChamps, latestChamp },
    champion: { championLoading, autofill, champs, role, input, fade },
  } = useSelector((state) => state)

  // Change Handler for input
  const changeHandler = (event) => {
    // Filters as user types to display only champion with matching string
    const filtered = champs.filter((champ) =>
      champ.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    dispatch(setInput(event.target.value, filtered))
  }

  useEffect(() => {
    dispatch(getInput('showNav'))
    dispatch(getChampion(champInfo))
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champInfo])

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
  }, [role])

  return (
    <>
      {latestChamp && (
        <>
          <div className={style.searchContainer}>
            <h1 className={style.championList}>Champion List</h1>
            <div className={style.rolesContainer}>
              <div
                onClick={() => dispatch(setRole('all'))}
                className={
                  role === 'all' ? style.currentRole : style.roleContainer
                }>
                <img
                  className={style.roleImage}
                  alt='Role-Top'
                  src={process.env.PUBLIC_URL + '/images/roles/all.png'}
                />
                <label className={style.roleLabel}>All</label>
              </div>
              <div
                onClick={() => dispatch(setRole('free'))}
                className={
                  role === 'free' ? style.currentRole : style.roleContainer
                }>
                <img
                  className={`${style.roleImage} ${style.rotateImage}`}
                  alt='Role-Top'
                  src={process.env.PUBLIC_URL + '/images/roles/all.png'}
                />
                <label className={style.roleLabel}>Free</label>
              </div>
              <div
                onClick={() => dispatch(setRole('top'))}
                className={
                  role === 'top' ? style.currentRole : style.roleContainer
                }>
                <img
                  className={style.roleImage}
                  alt='Role-Top'
                  src={process.env.PUBLIC_URL + '/images/roles/top.png'}
                />
                <label className={style.roleLabel}>Top</label>
              </div>
              <div
                onClick={() => dispatch(setRole('jungle'))}
                className={
                  role === 'jungle' ? style.currentRole : style.roleContainer
                }>
                <img
                  className={style.roleImage}
                  alt='Role-Jungle'
                  src={process.env.PUBLIC_URL + '/images/roles/jungle.png'}
                />
                <label className={style.roleLabel}>Jungler</label>
              </div>
              <div
                onClick={() => dispatch(setRole('mid'))}
                className={
                  role === 'mid' ? style.currentRole : style.roleContainer
                }>
                <img
                  className={style.roleImage}
                  alt='Role-Mid'
                  src={process.env.PUBLIC_URL + '/images/roles/mid.png'}
                />
                <label className={style.roleLabel}>Mid</label>
              </div>
              <div
                onClick={() => dispatch(setRole('adcarry'))}
                className={
                  role === 'adcarry' ? style.currentRole : style.roleContainer
                }>
                <img
                  className={style.roleImage}
                  alt='Role-AD Carry'
                  src={process.env.PUBLIC_URL + '/images/roles/adcarry.png'}
                />
                <label className={style.roleLabel}>AD Carry</label>
              </div>
              <div
                onClick={() => dispatch(setRole('support'))}
                className={
                  role === 'support' ? style.currentRole : style.roleContainer
                }>
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
          {!championLoading && autofill ? (
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
                            <Link to='/champion/:champions'>
                              <img
                                alt={latestChamp.image.full}
                                onClick={selectChampion}
                                name={latestChamp.id}
                                realname={latestChamp.name}
                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${latestChamp.image.full}`}
                              />
                            </Link>

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
                              <Link to={`/champions/${champ.id.toLowerCase()}`}>
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
            <ChampionSkeleton latest={latestChamp} champs={champInfo} />
          )}
        </>
      )}
    </>
  )
}

export default Champions
