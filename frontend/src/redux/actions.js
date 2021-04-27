/** @format */

import axios from 'axios'
import { LOADING, GET_SUMMONER_INFO, GET_MORE_MATCHES } from './constants'

// export const loadingTrue = () => async (dispatch) => {
//   dispatch({
//     type: LOADING,
//   });
// };

export const getSummonerInfo = (summonerName, region) => async (dispatch) => {
  const { data } = await axios.get(
    `http://localhost:5000/getSummonerInfo/${summonerName}/${region}`
  )
  if (data === 'summoner not found...') {
    dispatch({
      type: GET_SUMMONER_INFO,
      payload: { notFound: 'summoner not found...' },
    })
  } else {
    dispatch({
      type: GET_SUMMONER_INFO,
      payload: data,
    })
    dispatch(
      window.location.assign(
        `/summoner/${data.region}/${data.summonerInfo.name}`
      )
    )
  }
}

export const getMoreMatches = (gameIds, summonerInfo, region) => async (
  dispatch
) => {
  const { data } = await axios.get(
    `http://localhost:5000/getMoreMatches/${gameIds}/${summonerInfo}/${region}`
  )

  console.log('getMoreMatches', data)

  dispatch({
    type: GET_MORE_MATCHES,
    payload: data,
  })
}
