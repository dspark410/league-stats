import React from 'react'
import style from './tooltip.module.css'

export default function Tooltip(props) {
  return (
    <div className={style.tooltip}>
      {props.children}
      <div className={style.tooltiptext}>
        <div className={style.name}>{props.name}</div>
        <div
          className={style.info}
          dangerouslySetInnerHTML={{
            __html: props.info,
          }}
        />
        <div
          className={style.info}
          dangerouslySetInnerHTML={{
            __html: props.moreInfo,
          }}
        />
      </div>
    </div>
  )
}
