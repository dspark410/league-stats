import React from 'react'
import { useSelector } from 'react-redux'
import Tooltip from './Tooltip'

function ItemRow({ details, index }) {
  const {
    dependency: { items },
  } = useSelector((state) => state)

  return (
    <>
      {details[`item${index}`] ? (
        items
          .filter((i) => i.id === details[`item${index}`])
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
    </>
  )
}

export default ItemRow
