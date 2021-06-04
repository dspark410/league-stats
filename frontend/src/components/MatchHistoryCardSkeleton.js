import React from 'react'
import style from './historycardsimpleskeleton.module.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function MatchHistoryCardSkeleton() {
  return (
    <div className={style.matchContainer}>
      {Array.from({ length: 7 }).map((_, i) => (
        <SkeletonTheme
          key={i}
          duration={3}
          color=' rgba(59, 43, 68)'
          highlightColor='rgb(91, 66, 105)'>
          <div className={`${style.historyCard}`}>
            <div className={style.firstCol}>
              <Skeleton circle={true} width={75} height={75} />
            </div>
            <div className={style.secondCol}>
              <Skeleton width={135} height={30} />

              <Skeleton width={100} height={20} />
            </div>
            <div className={style.thirdCol}>
              <Skeleton
                style={{ marginBottom: '0px' }}
                width={100}
                height={30}
              />

              <Skeleton width={95} height={25} />
            </div>
            <div className={style.fourthCol}>
              <Skeleton
                style={{ marginBottom: '0px' }}
                width={120}
                height={35}
              />
              <Skeleton width={50} height={30} />
            </div>
            <div className={style.fifthCol}>
              <Skeleton width={50} height={30} />
              <Skeleton width={60} height={20} />
            </div>
            <div className={style.sixthCol}>
              <Skeleton width={30} height={20} />
            </div>
          </div>
        </SkeletonTheme>
      ))}

      <Skeleton
        style={{ display: 'flex', margin: '0 auto' }}
        height={44}
        width={120}
      />
    </div>
  )
}

export default MatchHistoryCardSkeleton
