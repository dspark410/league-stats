import React, { useState, useEffect } from 'react'
import style from './rankcard.module.css'
import axios from 'axios'

function RankCard({ summonerInfo }) {
  const [rank, setRank] = useState([])
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState({})

  useEffect(() => {
    if (!summonerInfo.id) {
      console.log('Summoner info not in state')

      //Get Sessions data
      const sessionData = JSON.parse(sessionStorage.getItem('summonerInfo'))
      setSession(sessionData)

      axios.get(`http://localhost:5000/rank/${sessionData.id}`).then((res) => {
        setRank(res.data)
        console.log('rankinfo', res.data)
        setLoading(false)
      })
    } else {
      axios.get(`http://localhost:5000/rank/${summonerInfo.id}`).then((res) => {
        setRank(res.data)
        console.log('rankinfo', res.data)
        setLoading(false)
      })
    }
  }, [summonerInfo.id])

  return (
    <>
      {loading ? (
        ''
      ) : (
        <div className={style.rankCardContainer}>
          {!rank[0] ? (
            <div className={style.singleCardContainer}>
              <img src={process.env.PUBLIC_URL + `/images/banner.png`} />
              <img
                className={style.emblemImage}
                src={process.env.PUBLIC_URL + `/images/emblems/UNRANKED.png`}
              />
              <span className={style.queue}>unranked</span>
              <span className={style.rank}>unranked</span>
              <span className={style.ratio}>0 wins / 0 losses</span>
            </div>
          ) : (
            <div className={style.singleCardContainer}>
              <img src={process.env.PUBLIC_URL + `/images/banner.png`} />
              <img
                className={style.emblemImage}
                src={
                  process.env.PUBLIC_URL + `/images/emblems/${rank[0].tier}.png`
                }
              />

              <span className={style.queue}>
                {rank[0].queueType.split('_').slice(0, 2).join(' ')}
              </span>

              <span className={style.rank}>
                {rank[0].tier +
                  ' ' +
                  rank[0].rank +
                  ' ' +
                  '(' +
                  rank[0].leaguePoints +
                  ')'}
              </span>

              <span
                className={style.ratio}
              >{`${rank[0].wins} wins / ${rank[0].losses} losses`}</span>
            </div>
          )}

          {!rank[1] ? (
            <div className={style.singleCardContainer}>
              <img src={process.env.PUBLIC_URL + `/images/banner.png`} />
              <img
                className={style.emblemImage}
                src={process.env.PUBLIC_URL + `/images/emblems/UNRANKED.png`}
              />
              <span className={style.queue}>unranked</span>
              <span className={style.rank}>unranked</span>
              <span className={style.ratio}>0 wins / 0 losses</span>
            </div>
          ) : (
            <div className={style.singleCardContainer}>
              <img src={process.env.PUBLIC_URL + `/images/banner.png`} />
              <img
                className={style.emblemImage}
                src={
                  process.env.PUBLIC_URL + `/images/emblems/${rank[1].tier}.png`
                }
              />

              <span className={style.queue}>
                {rank[1].queueType.split('_').slice(0, 2).join(' ')}
              </span>

              <span className={style.rank}>
                {rank[1].tier +
                  ' ' +
                  rank[1].rank +
                  ' ' +
                  '(' +
                  rank[1].leaguePoints +
                  ')'}
              </span>

              <span
                className={style.ratio}
              >{`${rank[1].wins} wins / ${rank[1].losses} losses`}</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RankCard
