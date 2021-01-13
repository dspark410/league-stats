import React from 'react'
import style from './tooltip.module.css'
import Tippy from '@tippyjs/react'

export default function Tooltip(props) {
  return (
    <Tippy
      animation='fade'
      content={
        <div className={style.tooltip}>
          <div className={style.tooltiptext}>
            <div className={style.name}>{props.name}</div>
            <div
              className={style.info}
              dangerouslySetInnerHTML={{
                __html: props.info,
              }}
            />
            <div
              className={style.moreInfo}
              dangerouslySetInnerHTML={{
                __html: props.moreInfo,
              }}
            />
          </div>
        </div>
      }
    >
      <div className={style.tooltip}>{props.children}</div>
    </Tippy>
  )
}
