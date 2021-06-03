import React from 'react'
import style from './welcome.module.css'
import { useSelector } from 'react-redux'

import WelcomeSkeleton from './WelcomeSkeleton'

export default function NotFound({ noRegion }) {
  const {
    summoner: { summLoading },
  } = useSelector((state) => state)

  return summLoading ? (
    <WelcomeSkeleton />
  ) : noRegion ? (
    <div className={style.notFound}>Invalid Region</div>
  ) : (
    <div className={style.notFound}>Summoner Not Found</div>
  )
}
