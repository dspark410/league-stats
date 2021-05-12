import React from 'react'
import style from './leaderboard.module.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function LeaderboardSkeleton({ loading }) {
  return (
    <SkeletonTheme duration={3} color='#7a6b83' highlightColor='#e2c0f7'>
      <div
        style={loading ? { display: 'block' } : { display: 'none' }}
        className={style.leaderboardContainer}>
        <h1 className={style.leaderHeader}> Ranked Leaderboard</h1>
        <div className={style.selectContainer}>
          <Skeleton
            width={163}
            height={41}
            style={{ margin: '10px 10px 15px 10px' }}
          />
          <Skeleton
            width={58}
            height={41}
            style={{ margin: '10px 10px 15px 10px' }}
          />
        </div>
        <div className={style.tableContainer}>
          {Array.from({ length: 26 }).map((_, i) => (
            <Skeleton key={i} className={style.table} width={945} height={49} />
          ))}
        </div>
        <div className={style.buttonContainer}>
          {Array.from({ length: 13 }).map((_, i) => (
            <Skeleton
              key={i}
              width={50}
              height={31}
              style={{ margin: '10px 5px 15px 5px' }}
            />
          ))}
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default LeaderboardSkeleton
