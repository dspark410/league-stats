import React from "react";
import style from "./tooltip.module.css";

export default function Tooltip(props) {
  return (
    <div className={style.tooltip}>
      {props.children}
      <div className={style.tooltiptext}>
        <div>{props.name}</div>
        <div
          className={style.info}
          dangerouslySetInnerHTML={{
            __html: props.info,
          }}
        />

        <div>{props.moreInfo}</div>
      </div>
    </div>
  );
}
