import React from 'react'
import style from './masterycard.module.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function MasteryCardSkeleton() {
  return (
    <SkeletonTheme
      duration={3}
      color=' rgba(59, 43, 68)'
      highlightColor='rgb(91, 66, 105)'>
      <div className={style.skeletonMasteryCard}>
        <div className={style.header}>
          <Skeleton width={200} height={45} />
        </div>

        <div className={style.skeletonMasteryHeader}>
          <Skeleton style={{ marginLeft: '15px' }} width={80} height={21} />
          <Skeleton width={70} height={21} />
          <Skeleton width={70} height={21} />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className={style.skeletonListContainer}>
            <div className={style.masteryRow}>
              <div className={style.champImgContainer}>
                <Skeleton circle={true} width={35} height={35} />
              </div>

              <div className={style.name}>
                <Skeleton width={70} height={20} />
              </div>
              <div className={style.champLvlContainer}>
                <Skeleton
                  style={{ marginLeft: '19px' }}
                  width={30}
                  height={30}
                />
              </div>

              <div className={style.points}>
                <Skeleton
                  style={{ marginLeft: '14px' }}
                  width={70}
                  height={20}
                />
              </div>
            </div>
          </li>
        ))}
      </div>
    </SkeletonTheme>
  )
}
