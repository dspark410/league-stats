import React, { useState, useEffect } from 'react'
import style from './welcome.module.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import MatchHistoryCardSkeleton from '../components/MatchHistoryCardSkeleton'
import MasteryCardSkeleton from '../components/MasteryCardSkeleton'

export default function NotFound({ showNav, noRegion, nonExist }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    showNav(true)
    let timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line
  }, [])

  return loading ? (
    <SkeletonTheme duration={3} color='#7a6b83' highlightColor='#e2c0f7'>
      <div className={style.rowContainer}>
        <div className={style.row1}>
          <div className={style.emblemContainer}>
            <div className={style.nameLiveSkeleton}>
              <Skeleton circle={true} width={115} height={115} />
              <Skeleton
                style={{ marginLeft: '25px' }}
                width={250}
                height={55}
              />
              {
                <Skeleton
                  width={110}
                  height={33}
                  className={`${style.inGameSkeleton} `}
                />
              }
            </div>

            <div className={style.rankCardContainer}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  margin: '25px 0px 25px 0px',
                }}
              >
                <div>
                  <Skeleton
                    style={{ marginLeft: '10px' }}
                    circle={true}
                    width={75}
                    height={75}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    marginLeft: '10px',
                    flexDirection: 'column',
                  }}
                >
                  <Skeleton
                    style={{ marginBottom: '2px' }}
                    width={40}
                    height={20}
                  />
                  <Skeleton
                    style={{ marginBottom: '2px' }}
                    width={180}
                    height={35}
                  />
                  <Skeleton
                    style={{ marginBottom: '2px' }}
                    width={40}
                    height={25}
                  />
                  <Skeleton
                    style={{ marginBottom: '2px' }}
                    width={130}
                    height={25}
                  />
                </div>

                <div>
                  <Skeleton
                    className={style.skeletonRectangle}
                    width={15}
                    height={15}
                  />
                </div>

                <div>
                  <Skeleton circle={true} width={75} height={75} />
                </div>

                <div
                  style={{
                    display: 'flex',
                    marginLeft: '10px',
                    flexDirection: 'column',
                  }}
                >
                  <Skeleton
                    style={{ marginBottom: '2px' }}
                    width={40}
                    height={20}
                  />
                  <Skeleton
                    style={{ marginBottom: '2px' }}
                    width={180}
                    height={35}
                  />
                  <Skeleton
                    style={{ marginBottom: '2px' }}
                    width={40}
                    height={25}
                  />
                  <Skeleton
                    style={{ marginBottom: '2px' }}
                    width={130}
                    height={25}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.row2}>
          <div className={style.linksContainer}>
            <Skeleton
              style={{ display: 'inlineBlock', marginLeft: '15px' }}
              height={30}
              width={74}
            />

            <Skeleton
              style={{ display: 'inlineBlock', marginLeft: '15px' }}
              height={30}
              width={84}
            />
          </div>
        </div>
        <div className={style.row3}>
          <div className={style.row3}>
            <MatchHistoryCardSkeleton />
            <MasteryCardSkeleton />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  ) : !noRegion ? (
    <div className={style.notFound}>Invalid Region</div>
  ) : (
    <div className={style.notFound}>
      Summoner Not Found {nonExist > 1 ? '(' + nonExist + ')' : ''}
    </div>
  )
}
