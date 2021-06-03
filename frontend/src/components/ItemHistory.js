import React from 'react'
import style from './itemhistory.module.css'
import { useSelector } from 'react-redux'
import Tooltip from './Tooltip'

export default function ItemHistory({ details }) {
  const {
    dependency: { items },
  } = useSelector((state) => state)

  return (
    <>
      <div className={style.itemRow1}>
        {details.item0 ? (
          items
            .filter((i) => i.id === details.item0)
            .map((item, i) => (
              <Tooltip
                key={i}
                name={item.id > 7000 ? item.name.split('%')[2] : item.name}
                info={item.description}
                moreInfo={`Cost: ${item.priceTotal} (${item.price})`}>
                <img
                  alt={item.id > 7000 ? item.name.split('%')[2] : item.name}
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                    .split('/')[6]
                    .toLowerCase()}`}
                />
              </Tooltip>
            ))
        ) : (
          <img
            alt='item'
            src='https://res.cloudinary.com/mistahpig/image/upload/v1621899018/league-stats/icons/emptyitem_cgiatq.png'
          />
        )}

        {details.item1 ? (
          items
            .filter((i) => i.id === details.item1)
            .map((item, i) => (
              <Tooltip
                key={i}
                name={item.id > 7000 ? item.name.split('%')[2] : item.name}
                info={item.description}
                moreInfo={`Cost: ${item.priceTotal} (${item.price})`}>
                <img
                  alt={item.id > 7000 ? item.name.split('%')[2] : item.name}
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                    .split('/')[6]
                    .toLowerCase()}`}
                />
              </Tooltip>
            ))
        ) : (
          <img
            alt='item'
            src='https://res.cloudinary.com/mistahpig/image/upload/v1621899018/league-stats/icons/emptyitem_cgiatq.png'
          />
        )}

        {details.item2 ? (
          items
            .filter((i) => i.id === details.item2)
            .map((item, i) => (
              <Tooltip
                key={i}
                name={item.id > 7000 ? item.name.split('%')[2] : item.name}
                info={item.description}
                moreInfo={`Cost: ${item.priceTotal} (${item.price})`}>
                <img
                  alt={item.id > 7000 ? item.name.split('%')[2] : item.name}
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                    .split('/')[6]
                    .toLowerCase()}`}
                />
              </Tooltip>
            ))
        ) : (
          <img
            alt='item'
            src='https://res.cloudinary.com/mistahpig/image/upload/v1621899018/league-stats/icons/emptyitem_cgiatq.png'
          />
        )}

        {details.item6 ? (
          items
            .filter((i) => i.id === details.item6)
            .map((item, i) => (
              <Tooltip key={i} name={item.name} info={item.description}>
                <img
                  alt={item.id > 7000 ? item.name.split('%')[2] : item.name}
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                    .split('/')[6]
                    .toLowerCase()}`}
                />
              </Tooltip>
            ))
        ) : (
          <img
            alt='item'
            src='https://res.cloudinary.com/mistahpig/image/upload/v1621899018/league-stats/icons/emptyitem_cgiatq.png'
          />
        )}
      </div>

      <div className={style.itemRow2}>
        {details.item3 ? (
          items
            .filter((i) => i.id === details.item3)
            .map((item, i) => (
              <Tooltip
                key={i}
                name={item.id > 7000 ? item.name.split('%')[2] : item.name}
                info={item.description}
                moreInfo={`Cost: ${item.priceTotal} (${item.price})`}>
                <img
                  alt={item.id > 7000 ? item.name.split('%')[2] : item.name}
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                    .split('/')[6]
                    .toLowerCase()}`}
                />
              </Tooltip>
            ))
        ) : (
          <img
            alt='item'
            src='https://res.cloudinary.com/mistahpig/image/upload/v1621899018/league-stats/icons/emptyitem_cgiatq.png'
          />
        )}
        {details.item4 ? (
          items
            .filter((i) => i.id === details.item4)
            .map((item, i) => (
              <Tooltip
                key={i}
                name={item.id > 7000 ? item.name.split('%')[2] : item.name}
                info={item.description}
                moreInfo={`Cost: ${item.priceTotal} (${item.price})`}>
                <img
                  alt={item.id > 7000 ? item.name.split('%')[2] : item.name}
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                    .split('/')[6]
                    .toLowerCase()}`}
                />
              </Tooltip>
            ))
        ) : (
          <img
            alt='item'
            src='https://res.cloudinary.com/mistahpig/image/upload/v1621899018/league-stats/icons/emptyitem_cgiatq.png'
          />
        )}
        {details.item5 ? (
          items
            .filter((i) => i.id === details.item5)
            .map((item, i) => (
              <Tooltip
                key={i}
                name={item.id > 7000 ? item.name.split('%')[2] : item.name}
                info={item.description}
                moreInfo={`Cost: ${item.priceTotal} (${item.price})`}>
                <img
                  alt={item.id > 7000 ? item.name.split('%')[2] : item.name}
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                    .split('/')[6]
                    .toLowerCase()}`}
                />
              </Tooltip>
            ))
        ) : (
          <img
            alt='item'
            src='https://res.cloudinary.com/mistahpig/image/upload/v1621899018/league-stats/icons/emptyitem_cgiatq.png'
          />
        )}
      </div>
    </>
  )
}
