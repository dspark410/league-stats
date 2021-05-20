import axios from 'axios'
import {
  GET_SUMMONER_INFO,
  SUMMONER_INFO_ERROR,
  SUMMONER_INFO_LOADING,
  GET_MORE_MATCHES,
  MATCHES_LOADING,
  MATCHES_ERROR,
  GET_SUMMONER_REGION,
} from '../constants/summonerInfoConstants'

const endpoint = process.env.REACT_APP_API_ENDPOINT || ''

export const getSummonerInfo = (summonerName, region) => async (dispatch) => {
  try {
    dispatch({
      type: SUMMONER_INFO_LOADING,
    })
    const { data } = await axios.get(
      `${endpoint}/getSummonerInfo/${summonerName}/${region}`
    )
    setTimeout(() => {
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
      }
    }, 3000)
  } catch (error) {
    dispatch({
      type: SUMMONER_INFO_ERROR,
      payload: error.message,
    })
  }
}

export const getMoreMatches =
  (gameIds, summonerInfo, region) => async (dispatch) => {
    try {
      dispatch({
        type: MATCHES_LOADING,
      })
      const { data } = await axios.get(
        `${endpoint}/getMoreMatches/[${gameIds}]/${JSON.stringify(
          summonerInfo
        )}/${region}`
      )
      setTimeout(() => {
        dispatch({
          type: GET_MORE_MATCHES,
          payload: data,
        })
      }, 2000)
    } catch (error) {
      dispatch({
        type: MATCHES_ERROR,
        payload: error.message,
      })
    }
  }

export const getSummonerRegion = () => async (dispatch) => {
  dispatch({
    type: SUMMONER_INFO_LOADING,
  })

  setTimeout(() => {
    dispatch({
      type: GET_SUMMONER_REGION,
    })
  }, 3000)
}
