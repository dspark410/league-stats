import React from 'react'
import style from './champions.module.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function ChampionSkeleton({ champs, latest }) {
  return (
    <SkeletonTheme duration={3} color='#7a6b83' highlightColor='#e2c0f7'>
      <div className={style.screenContainer}>
        {latest.length === 0 ? null : (
          <h2>Latest Champion{latest.length > 1 ? 's' : ''}</h2>
        )}
        <div className={style.latestContainer}>
          <>
            {latest.map((_, i) => {
              return (
                <div key={i}>
                  <div className={style.latestImage}>
                    {
                      <Skeleton
                        width={115}
                        height={115}
                        circle={true}
                        style={{ margin: '10px 10px 15px 10px' }}
                      />
                    }

                    <div className={style.champName}>
                      <Skeleton
                        width={50}
                        height={15}
                        style={{ margin: '0px 0px 15px 0px' }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        </div>
        <div className={style.imageContainer}>
          <>
            {champs.map((_, i) => (
              <div className={style.latestImage} key={i}>
                <Skeleton
                  width={75}
                  height={75}
                  circle={true}
                  style={{ margin: '0px 20px 15px 20px' }}
                />

                <div className={style.champName}>
                  <Skeleton
                    width={50}
                    height={15}
                    style={{ margin: '0px 0px 10px 0px' }}
                  />
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default ChampionSkeleton
