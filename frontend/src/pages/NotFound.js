import React, { useEffect } from 'react'
import style from './welcome.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getInput } from '../redux/actions/inputActions'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import MatchHistoryCardSkeleton from '../components/MatchHistoryCardSkeleton'
import MasteryCardSkeleton from '../components/MasteryCardSkeleton'

export default function NotFound() {
  const {
    summoner: {
      data: { notFound },
      summLoading,
    },
  } = useSelector((state) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(getInput('showNav'))
    }, 50)
    // eslint-disable-next-line
  }, [dispatch])

  return summLoading ? (
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
                }}>
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
                  }}>
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
                  }}>
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
  ) : (
    notFound && <div className={style.notFound}>Invalid Summoner</div>
  )
}
