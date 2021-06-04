import React from 'react'
import style from './itemhistory.module.css'
import ItemRow from './ItemRow'

export default function ItemHistory({ details }) {
  const itemRow1Arr = [0, 1, 2, 6],
    itemRow2Arr = [3, 4, 5]

  return (
    <>
      <div className={style.itemRow1}>
        {itemRow1Arr.map((num) => {
          return <ItemRow key={num} details={details} index={num} />
        })}
      </div>

      <div className={style.itemRow2}>
        {itemRow2Arr.map((num) => {
          return <ItemRow key={num} details={details} index={num} />
        })}
      </div>
    </>
  )
}
