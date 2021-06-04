import React, { useEffect } from 'react'
import style from './championdetail.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { changeNav, changeBackground } from '../redux/actions/inputActions'
import {
  setVideo,
  changeSkin,
  selectChampion,
  resetChampDetail,
} from '../redux/actions/championActions'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import Tooltip from '../components/Tooltip'

export default function ChampionDetail({ match }) {
  const dispatch = useDispatch()
  const {
    dependency: { version, backupItem, champMap },
    champion: {
      selectedChampion,
      videoKey,
      videoLoading,
      currentSkin,
      skinFade,
      error,
    },
  } = useSelector((state) => state)

  // add 0's to URL of champion skill video
  let key
  if (selectedChampion.key) {
    if (selectedChampion.key.length === 1) {
      key = '000' + selectedChampion.key
    } else if (selectedChampion.key.length === 2) {
      key = '00' + selectedChampion.key
    } else if (selectedChampion.key.length === 3) {
      key = '0' + selectedChampion.key
    } else {
      key = selectedChampion.key
    }
  }

  const selectVideo = (e) => {
    const key = e.target.getAttribute('value')
    dispatch(setVideo(key))
  }

  // onClick, increases skin + 1
  const nextSkin = () => {
    dispatch(changeSkin('next', currentSkin, selectedChampion.skins.length))
  }

  // onClick, increases skin - 1
  const prevSkin = () => {
    dispatch(changeSkin('prev', currentSkin, selectedChampion.skins.length))
  }

  useEffect(() => {
    dispatch(changeNav('showNav'))

    if (version) {
      let champName
      new Promise((resolve) => {
        for (let key in champMap) {
          if (key.toLowerCase() === match.params.champion) {
            champName = key
          }
        }
        resolve(champName)
      }).then((res) => dispatch(selectChampion(version, res)))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, version])

  useEffect(() => {
    window.scrollTo({
      top: 0,
    })

    if (selectedChampion.skins) {
      dispatch(
        changeBackground(
          'champBackground',
          `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${selectedChampion.id}_${selectedChampion.skins[currentSkin].num}.jpg`
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChampion])

  useEffect(() => {
    return () => {
      dispatch(changeBackground('brandBackground'))
      dispatch(changeSkin('reset'))
      dispatch(resetChampDetail())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return selectedChampion.key && backupItem ? (
    <div className={style.fadeContainer}>
      <div className={style.grid}>
        <div className={style.firstCard}>
          <div className={style.row1Col1}>
            <img
              className={style.freeChampsImg}
              alt={selectedChampion.image.full}
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${selectedChampion.image.full}`}
            />
            <h1 className={style.name}>{selectedChampion.name}</h1>
            <div className={style.tag}>
              {selectedChampion.tags.map((tag, i) => (
                <span key={i} className={style.tagSpan}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={style.infoContainer}>
              <span>Attack:&nbsp; </span>{' '}
              <div className={style.attack}>{selectedChampion.info.attack}</div>
              <span> &nbsp;|&nbsp;</span>
              <span>Defense:&nbsp; </span>{' '}
              <div className={style.defense}>
                {selectedChampion.info.defense}
              </div>
              <span> &nbsp;|&nbsp;</span>
              <span> Difficulty:&nbsp; </span>{' '}
              <div className={style.difficulty}>
                {selectedChampion.info.difficulty}
              </div>
              <span>&nbsp; |&nbsp;</span>
              <span> Magic:&nbsp; </span>{' '}
              <div className={style.magic}>{selectedChampion.info.magic} </div>
            </div>
          </div>
          <div className={style.loreContainer}>
            <p>"{selectedChampion.lore}"</p>
          </div>
        </div>

        <div className={style.row1Col2}>
          <div className={style.row1}>
            <h2>Ally Tips</h2>
            {selectedChampion.allytips.length === 0 ? (
              <div>No ally tips were provided by the Riot API.</div>
            ) : (
              selectedChampion.allytips.map((tip, i) => (
                <span key={i}>{tip}&nbsp;</span>
              ))
            )}
          </div>

          <div className={style.row2}>
            <h2>Enemy Tips</h2>
            {selectedChampion.enemytips.length === 0 ? (
              <div>No enemy tips were provided by the Riot API.</div>
            ) : (
              selectedChampion.enemytips.map((tip, i) => (
                <span key={i}>{tip}&nbsp;</span>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={style.grid2}>
        {/* Commented out build container */}
        {/* <div className={style.buildContainer}>
          <div className={style.recBuild}>RECOMMENDED ITEM BUILD</div>
          {selectedChampion.recommended.length === 0 ? (
            <div className={style.noBuild}>
              No builds were provided by the Riot API.
            </div>
          ) : (
            selectedChampion.recommended.map((build, i) => {
              return build.mode === 'CLASSIC' &&
                build.type.split('-').find((type) => type === 'riot') ? (
                <div className={style.blocksContainer} key={i}>
                  {build.blocks.map((block, i) => {
                    return block.type === 'starting' ||
                      block.type === 'early' ||
                      block.type === 'essential' ? (
                      <div key={i}>
                        <div className={style.type}>{block.type}</div>
                        <div className={style.buildType}>
                          {block.items.map((item, i) => {
                            return (
                              <div key={i} className={style.itemContainer}>
                                <Tooltip
                                  name={backupItem[item.id].name}
                                  info={backupItem[item.id].description}>
                                  <img
                                    alt={backupItem[item.id].image.full}
                                    src={`https://ddragon.leagueoflegends.com/cdn/${
                                      backupItem[item.id].version
                                    }/img/item/${
                                      backupItem[item.id].image.full
                                    }`}
                                  />
                                </Tooltip>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ) : null
                  })}
                </div>
              ) : null
            })
          )}
        </div> */}

        <div className={style.Container}>
          <div className={style.skillsHeader}>Champion Skills</div>
          <div className={style.spellContainer}>
            <div className={style.passiveImageContainer}>
              <span className={style.spellKey}>P</span>
              <Tooltip
                name={selectedChampion.passive.name}
                info={selectedChampion.passive.description}>
                <img
                  className={style.spellImage}
                  alt='champion passive'
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${selectedChampion.passive.image.full}`}
                />
              </Tooltip>
            </div>
            {selectedChampion.spells.map((spell, i) => {
              const buttonKey =
                i === 0 ? 'Q' : i === 1 ? 'W' : i === 2 ? 'E' : 'R'
              const tooltipInfo = `
                  <p>Spell Cooldown: ${spell.cooldownBurn} seconds</p>
                  <p>
                    Spell Cost: ${spell.costBurn} ${selectedChampion.partype}
                  </p>
                `

              return (
                <div key={i} className={style.spellImageContainer}>
                  <span className={style.spellKey}>{buttonKey}</span>
                  <Tooltip
                    name={spell.name}
                    info={spell.description}
                    moreInfo={tooltipInfo}>
                    <img
                      index={i}
                      onClick={selectVideo}
                      value={buttonKey}
                      className={`${style.spellImage} ${
                        videoKey === buttonKey ? style.spellImageActive : null
                      }`}
                      alt='champion skills'
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                    />
                  </Tooltip>
                </div>
              )
            })}
          </div>
          {!videoLoading ? (
            <video
              className={style.skillVideo}
              autoPlay
              playsInline
              loop
              muted
              src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${videoKey}1.webm`}
            />
          ) : null}
        </div>
      </div>
      <div className={style.grid3}>
        {selectedChampion && (
          <div className={style.skinContent}>
            <h1 className={style.skins}> Champion Skins</h1>
            {!skinFade && (
              <FaAngleLeft
                className={style.buttonImagePrev}
                onClick={prevSkin}
              />
            )}

            <div className={style.splashImage}>
              {!skinFade ? (
                <img
                  className={style.splashImageFade}
                  alt={selectedChampion.image.full}
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${selectedChampion.id}_${selectedChampion.skins[currentSkin].num}.jpg`}
                />
              ) : null}
            </div>

            {!skinFade && (
              <FaAngleRight
                className={style.buttonImageNext}
                onClick={nextSkin}
              />
            )}
          </div>
        )}
        <h3 className={style.splashHeader}>
          {selectedChampion.skins[currentSkin].name === 'default'
            ? selectedChampion.name
            : selectedChampion.skins[currentSkin].name}
        </h3>
      </div>
    </div>
  ) : error !== '' ? (
    <div className={style.notFound}>Champion Not Found</div>
  ) : null
}
