import React from 'react'
import style from './welcome.module.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import MatchHistoryCardSkeleton from '../components/MatchHistoryCardSkeleton'
import MasteryCardSkeleton from '../components/MasteryCardSkeleton'
import SummonerCardSkeleton from '../components/SummonerCardSkeleton'

function WelcomeSkeleton() {
  return (
    <SkeletonTheme duration={3} color='#7a6b83' highlightColor='#e2c0f7'>
      <div className={style.rowContainer}>
        <SummonerCardSkeleton />
        <div className={style.row3}>
          <div className={style.row3}>
            <MatchHistoryCardSkeleton />
            <MasteryCardSkeleton />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default WelcomeSkeleton
