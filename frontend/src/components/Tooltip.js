import React from 'react'
import style from './tooltip.module.css'
import Tippy, { tippy } from '@tippyjs/react'

export default function Tooltip(props) {
  tippy('.tomato')

  return (
    <Tippy
      animation='fade'
      theme='custom'
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
      }>
      <div className={style.tooltip}>{props.children}</div>
    </Tippy>
  )
}
