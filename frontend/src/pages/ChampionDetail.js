import React, { useState, useEffect } from 'react'
import style from './championdetail.module.css'
import Tooltip from '../components/Tooltip'
import BrandBackground from '../components/images/brand.jpg'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

export default function ChampionDetail({
  version,
  champDetail,
  itemObj,
  showNav,
  changeBackground,
  championLoading,
}) {
  const [video, setVideo] = useState('Q')
  const [loading, setLoading] = useState(false)
  const [championDetails, setChampionDetails] = useState()
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(false)
  const [containerFade, setContainerFade] = useState(false)

  const sessionData = JSON.parse(sessionStorage.getItem('backupjson'))

  // show navbar and fade in background of champion
  useEffect(() => {
    showNav(true)
    setContainerFade(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // sets the details of the champion to the page and reset the background to brand if going back pages
  useEffect(() => {
    setChampionDetails(champDetail)
    setCurrent(0)
    return () => {
      changeBackground(BrandBackground)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [champDetail])

  useEffect(() => {
    if (championDetails) {
      changeBackground(
        `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championDetails.id}_${championDetails.skins[current].num}.jpg`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [championDetails])

  // function for selecting champion skill video
  const selectVideo = (e) => {
    setLoading(true)
    const key = e.target.getAttribute('value')
    setVideo(key)
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }

  // onClick, increases skin + 1
  const nextSkin = () => {
    setCurrent(current === championDetails.skins.length - 1 ? 0 : current + 1)
    setFade(true)
    setTimeout(() => {
      setFade(false)
    }, 100)
  }

  // onClick, increases skin - 1
  const prevSkin = () => {
    setCurrent(current === 0 ? championDetails.skins.length - 1 : current - 1)
    setFade(true)
    setTimeout(() => {
      setFade(false)
    }, 100)
  }

  // add 0's to URL of champion skill video
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

  return champDetail &&
    itemObj &&
    championDetails &&
    containerFade &&
    !championLoading ? (
    <div className={style.fadeContainer}>
      <div className={style.grid}>
        <div className={style.firstCard}>
          <div className={style.row1Col1}>
            <img
              className={style.freeChampsImg}
              alt={champDetail.image.full}
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champDetail.image.full}`}
            />
            <h1 className={style.name}>{champDetail.name}</h1>
            <div className={style.tag}>
              {champDetail.tags.map((tag, i) => (
                <span key={i} className={style.tagSpan}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={style.infoContainer}>
              <span>Attack:&nbsp; </span>{' '}
              <div className={style.attack}>{champDetail.info.attack}</div>
              <span> &nbsp;|&nbsp;</span>
              <span>Defense:&nbsp; </span>{' '}
              <div className={style.defense}>{champDetail.info.defense}</div>
              <span> &nbsp;|&nbsp;</span>
              <span> Difficulty:&nbsp; </span>{' '}
              <div className={style.difficulty}>
                {champDetail.info.difficulty}
              </div>
              <span>&nbsp; |&nbsp;</span>
              <span> Magic:&nbsp; </span>{' '}
              <div className={style.magic}>{champDetail.info.magic} </div>
            </div>
          </div>
          <div className={style.loreContainer}>
            <p>"{championDetails.lore}"</p>
          </div>
        </div>

        <div className={style.row1Col2}>
          <div className={style.row1}>
            <h2>Ally Tips</h2>
            {champDetail.allytips.length === 0 ? (
              <div>No ally tips were provided by the RIOT API.</div>
            ) : (
              champDetail.allytips.map((tip, i) => (
                <span key={i}>{tip}&nbsp;</span>
              ))
            )}
          </div>

          <div className={style.row2}>
            <h2>Enemy Tips</h2>
            {champDetail.enemytips.length === 0 ? (
              <div>No enemy tips were provided by the RIOT API.</div>
            ) : (
              champDetail.enemytips.map((tip, i) => (
                <span key={i}>{tip}&nbsp;</span>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={style.grid2}>
        <div className={style.buildContainer}>
          <div className={style.recBuild}>RECOMMENDED ITEM BUILD</div>
          {champDetail.recommended.length === 0 ? (
            <div className={style.noBuild}>
              No builds were provided by the RIOT API.
            </div>
          ) : (
            champDetail.recommended.map((build, i) => {
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
                                  name={
                                    itemObj
                                      ? itemObj[item.id].name
                                      : sessionData[item.id].name
                                  }
                                  info={
                                    itemObj
                                      ? itemObj[item.id].description
                                      : sessionData[item.id].description
                                  }
                                >
                                  <img
                                    alt={
                                      itemObj
                                        ? itemObj[item.id].image.full
                                        : sessionData[item.id].image.full
                                    }
                                    src={`https://ddragon.leagueoflegends.com/cdn/${
                                      itemObj
                                        ? itemObj[item.id].version
                                        : sessionData[item.id].version
                                    }/img/item/${
                                      itemObj
                                        ? itemObj[item.id].image.full
                                        : sessionData[item.id].image.full
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
        </div>

        <div className={style.Container}>
          <div className={style.skillsHeader}>Champion Skills</div>
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
          {!loading ? (
            <video
              className={style.skillVideo}
              autoPlay
              playsInline
              loop
              muted
              src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${video}1.webm`}
            />
          ) : null}
        </div>
      </div>
      <div className={style.grid3}>
        {championDetails && (
          <div className={style.skinContent}>
            <h1 className={style.skins}> Champion Skins</h1>
            {!fade && (
              <FaAngleLeft
                className={style.buttonImagePrev}
                onClick={prevSkin}
              />
            )}

            <div className={style.splashImage}>
              {!fade ? (
                <img
                  className={style.splashImageFade}
                  alt={championDetails.image.full}
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championDetails.id}_${championDetails.skins[current].num}.jpg`}
                />
              ) : null}
            </div>

            {!fade && (
              <FaAngleRight
                className={style.buttonImageNext}
                onClick={nextSkin}
              />
            )}
          </div>
        )}
        <h3 className={style.splashHeader}>
          {championDetails.skins[current].name === 'default'
            ? championDetails.name
            : championDetails.skins[current].name}
        </h3>
      </div>
    </div>
  ) : (
    ''
  )
}
