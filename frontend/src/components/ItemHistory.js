import React, { useState, useEffect } from 'react'
import style from './itemhistory.module.css'
import Tooltip from './Tooltip'
import axios from 'axios'
import Loader from './Loader'

export default function ItemHistory({ details, version }) {
  const [items, setItems] = useState()
  const [versionState, setVersionState] = useState()
  const [stateDetails, setStateDetails] = useState()
  const [loading, setLoading] = useState(true)

  // Store version into state and stop loading until new version of the item JSON is ready
  useEffect(() => {
    setLoading(true)
    setVersionState(version)
  }, [version])

  useEffect(() => {
    // Retrieve item list from Riot API
    if (versionState) {
      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${versionState}.1/data/en_US/item.json`
        )
        .then((res) => {
          setItems(res.data.data)
          setStateDetails(details)
          // When everything is ready set loading to false to render screen
          setLoading(false)
        })
    }
  }, [versionState])

  return (
    <>
      {!loading ? (
        <>
          <div className={style.itemRow1}>
            {stateDetails.item0 ? (
              <Tooltip
                name={items[stateDetails.item0].name}
                info={items[stateDetails.item0].description}
                moreInfo={`Cost: ${items[stateDetails.item0].gold.total} (${
                  items[stateDetails.item0].gold.base
                })`}
              >
                <img
                  alt='item'
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item0}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt='item'
                src={process.env.PUBLIC_URL + '/images/emptyitem.png'}
              />
            )}

            {stateDetails.item1 ? (
              <Tooltip
                name={items[stateDetails.item1].name}
                info={items[stateDetails.item1].description}
                moreInfo={`Cost: ${items[stateDetails.item1].gold.total} (${
                  items[stateDetails.item1].gold.base
                })`}
              >
                <img
                  alt='item'
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item1}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt='item'
                src={process.env.PUBLIC_URL + '/images/emptyitem.png'}
              />
            )}

            {stateDetails.item2 ? (
              <Tooltip
                name={items[stateDetails.item2].name}
                info={items[stateDetails.item2].description}
                moreInfo={`Cost: ${items[stateDetails.item2].gold.total} (${
                  items[stateDetails.item2].gold.base
                })`}
              >
                <img
                  alt='item'
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item2}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt='item'
                src={process.env.PUBLIC_URL + '/images/emptyitem.png'}
              />
            )}

            {stateDetails.item6 ? (
              <Tooltip
                name={items[stateDetails.item6].name}
                info={items[stateDetails.item6].description}
              >
                <img
                  alt='item'
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item6}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt='item'
                src={process.env.PUBLIC_URL + '/images/emptyitem.png'}
              />
            )}
          </div>
          <div className={style.itemRow2}>
            {stateDetails.item3 ? (
              <Tooltip
                name={items[stateDetails.item3].name}
                info={items[stateDetails.item3].description}
                moreInfo={`Cost: ${items[stateDetails.item3].gold.total} (${
                  items[stateDetails.item3].gold.base
                })`}
              >
                <img
                  alt='item'
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item3}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt='item'
                src={process.env.PUBLIC_URL + '/images/emptyitem.png'}
              />
            )}
            {stateDetails.item4 ? (
              <Tooltip
                name={items[stateDetails.item4].name}
                info={items[stateDetails.item4].description}
                moreInfo={`Cost: ${items[stateDetails.item4].gold.total} (${
                  items[stateDetails.item4].gold.base
                })`}
              >
                <img
                  alt='item'
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item4}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt='item'
                src={process.env.PUBLIC_URL + '/images/emptyitem.png'}
              />
            )}
            {stateDetails.item5 ? (
              <Tooltip
                name={items[stateDetails.item5].name}
                info={items[stateDetails.item5].description}
                moreInfo={`Cost: ${items[stateDetails.item5].gold.total} (${
                  items[stateDetails.item5].gold.base
                })`}
              >
                <img
                  alt='item'
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item5}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt='item'
                src={process.env.PUBLIC_URL + '/images/emptyitem.png'}
              />
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}
