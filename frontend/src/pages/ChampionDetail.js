import React, { useState, useEffect } from 'react'
import style from './championdetail.module.css'
import Tooltip from '../components/Tooltip'
import Loader from '../components/Loader'
import { backupItem } from '../utils/constant'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

export default function ChampionDetail({
  version,
  champDetail,
  itemObj,
  showNav,
}) {
  const [video, setVideo] = useState('Q')
  const [loading, setLoading] = useState(false)
  const [championDetails, setChampionDetails] = useState()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    showNav()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setChampionDetails(champDetail)
    setCurrent(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champDetail])

  const selectVideo = (e) => {
    setLoading(true)
    const key = e.target.getAttribute('value')
    setVideo(key)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
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

  let key

  if (champDetail) {
    if (champDetail.key.length === 1) {
      key = '000' + champDetail.key
    } else if (champDetail.key.length === 2) {
      key = '00' + champDetail.key
    } else if (champDetail.key.length === 3) {
      key = '0' + champDetail.key
    } else {
      key = champDetail.key
    }
  }

  return champDetail && itemObj ? (
    <>
      <div className={style.grid}>
        <div className={style.row1Col1}>
          <img
            className={style.freeChampsImg}
            alt={champDetail.image.full}
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champDetail.image.full}`}
          />
          <h2>{champDetail.name}</h2>
          <h3>{champDetail.title}</h3>
          <div className={style.tag}>
            {champDetail.tags.map((tag, i) => (
              <span key={i} className={style.tagSpan}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={style.row1Col2}>
          <div className={style.row1}>
            <h3>Ally Tips</h3>
            {champDetail.allytips.map((tip, i) => (
              <span key={i}>{tip}</span>
            ))}
          </div>

          <div className={style.row2}>
            <h3>Enemy Tips</h3>
            {champDetail.enemytips.map((tip, i) => (
              <span key={i}>{tip}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={style.grid2}>
        <div className={style.buildContainer}>
          <h3>Recommended Build</h3>
          {champDetail.recommended.map((build, i) => {
            return build.mode === 'CLASSIC' ? (
              <div className={style.buildHeader} key={i}>
                {/* <h3>{build.type.split('-')[1]}</h3> */}

                {build.blocks.map((block, i) => {
                  return (
                    <div className={style.buildHeaderContainer} key={i}>
                      <h4>{block.type}</h4>
                      <div className={style.buildType}>
                        {block.items.map((item, i) => {
                          if (!itemObj[item.id] && !backupItem[item.id]) {
                            console.log(item.id)
                          }
                          return (
                            <div key={i} className={style.itemContainer}>
                              <Tooltip
                                name={
                                  !itemObj[item.id]
                                    ? backupItem[item.id].name
                                    : itemObj[item.id].name
                                }
                                info={
                                  !itemObj[item.id]
                                    ? backupItem[item.id].description
                                    : itemObj[item.id].description
                                }
                              >
                                <img
                                  alt={
                                    !itemObj[item.id]
                                      ? backupItem[item.id].image.full
                                      : itemObj[item.id].image.full
                                  }
                                  src={`https://ddragon.leagueoflegends.com/cdn/${
                                    !itemObj[item.id]
                                      ? backupItem[item.id].version
                                      : version
                                  }/img/item/${
                                    !itemObj[item.id]
                                      ? backupItem[item.id].image.full
                                      : itemObj[item.id].image.full
                                  }`}
                                />
                              </Tooltip>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null
          })}
        </div>

        <div className={style.Container}>
          <h3>Skills</h3>
          <div className={style.spellContainer}>
            <div className={style.passiveImageContainer}>
              <span className={style.spellKey}>P</span>
              <Tooltip
                name={champDetail.passive.name}
                info={champDetail.passive.description}
              >
                <img
                  className={style.spellImage}
                  alt='champion passive'
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champDetail.passive.image.full}`}
                />
              </Tooltip>
            </div>
            {champDetail.spells.map((spell, i) => {
              const buttonKey =
                i === 0 ? 'Q' : i === 1 ? 'W' : i === 2 ? 'E' : 'R'
              const tooltipInfo = `
                  <p>Spell Cooldown: ${spell.cooldownBurn} seconds</p>
                  <p>
                    Spell Cost: ${spell.costBurn} ${champDetail.partype}
                  </p>
                `

              return (
                <div key={i} className={style.spellImageContainer}>
                  <span className={style.spellKey}>{buttonKey}</span>
                  <Tooltip
                    name={spell.name}
                    info={spell.description}
                    moreInfo={tooltipInfo}
                  >
                    <img
                      onClick={selectVideo}
                      index={i}
                      value={buttonKey}
                      className={`${style.spellImage} ${
                        video === buttonKey ? style.spellImageActive : null
                      }`}
                      alt='champion skills'
                      src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                    />
                  </Tooltip>
                </div>
              )
            })}
          </div>
          {loading ? (
            <Loader />
          ) : (
            <video
              className={style.skillVideo}
              autoPlay
              playsInline
              loop
              muted
              src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${video}1.mp4`}
            />
          )}
        </div>
        <div>
          {championDetails && (
            <div className={style.modalContent}>
              <h1 className={style.modalHeader}>
                {championDetails.skins[current].name === 'default'
                  ? championDetails.name
                  : championDetails.skins[current].name}
              </h1>
              <FaAngleLeft
                className={style.buttonImagePrev}
                onClick={prevSkin}
              />

              <img
                className={style.modalSplashImage}
                alt={championDetails.image.full}
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championDetails.id}_${championDetails.skins[current].num}.jpg`}
              />

              <FaAngleRight
                className={style.buttonImageNext}
                onClick={nextSkin}
              />
              <div className={style.modalDetails}>
                <h5>{championDetails.lore}</h5>

                <h4 className={style.spellHeader}>Spells</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    ''
  )
}
