import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import style from './matchhistory.module.css'

function MatchHistoryCardSkeleton() {
  const playerArr = [1, 2, 3, 4, 5]
  const matchArr = [1, 2, 3, 4, 5, 6, 7]
  return (
    <SkeletonTheme
      duration={3}
      color=' rgba(59, 43, 68)'
      highlightColor='rgb(91, 66, 105)'
    >
      <div className={style.matchContainer}>
        {matchArr.map((match) => (
          <div className={style.skeletonContainer}>
            <span className={style.cardContainer}>
              <div className={style.firstCard}>
                <p className={style.gameType}>
                  <Skeleton width={115} />
                </p>
                <p className={style.gameCreation}>
                  <Skeleton width={115} />
                </p>
                <p>
                  <Skeleton width={80} />
                </p>
                <p className={style.gameDuration}>
                  <Skeleton width={90} />
                </p>
              </div>

              <div className={style.secondCard}>
                <div className={style.championName}>
                  <Skeleton width={105} />
                </div>
                <div className={style.imageContainer}>
                  <div className={style.championImg}>
                    <Skeleton
                      style={{ marginRight: '3px' }}
                      width={50}
                      height={50}
                    />
                  </div>

                  <div className={style.summonerSpellContainer}>
                    <Skeleton
                      style={{ margin: '3px' }}
                      width={30}
                      height={30}
                    />
                    <Skeleton
                      style={{ margin: '3px' }}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className={style.summonerSpellContainer}>
                    <Skeleton
                      style={{ margin: '3px' }}
                      width={30}
                      height={30}
                    />
                    <Skeleton
                      style={{ margin: '3px' }}
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              </div>
            </span>
            <span className={style.cardContainer}>
              <div className={style.thirdCard}>
                <div className={style.killDeathAssists}>
                  <span>
                    <Skeleton width={56} />
                  </span>
                </div>
                <div className={style.kdaRatio}>
                  <span>
                    <Skeleton width={65} />
                  </span>
                  <div>
                    <span>
                      <Skeleton width={70} />
                    </span>
                  </div>
                </div>
              </div>

              <div className={style.fourthCard}>
                <span>
                  <Skeleton width={46} />
                </span>
                <Skeleton width={31} />
                <Skeleton width={30} />
              </div>

              <div className={style.fifthCard}>
                <div>
                  <div>
                    <Skeleton
                      style={{ margin: '2px' }}
                      count={4}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div>
                    <Skeleton
                      style={{ margin: '2px' }}
                      count={3}
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              </div>
            </span>

            <span className={style.cardContainer}>
              <div className={style.sixthCard}>
                {playerArr.map((player, i) => {
                  return (
                    <div name={player.name} className={style.col} key={i}>
                      <Skeleton width={20} height={20} />

                      <Skeleton style={{ margin: '0px 3px' }} width={70} />
                    </div>
                  )
                })}
              </div>

              <div className={style.seventhCard}>
                {playerArr.map((player, i) => {
                  return (
                    <div name={player.name} className={style.col} key={i}>
                      <Skeleton width={20} height={20} />

                      <Skeleton style={{ margin: '0px 3px' }} width={70} />
                    </div>
                  )
                })}
              </div>
            </span>
          </div>
        ))}
        <Skeleton
          style={{ display: 'flex', margin: '0 auto' }}
          height={44}
          width={167}
        />
      </div>
    </SkeletonTheme>
  )
}

export default MatchHistoryCardSkeleton
