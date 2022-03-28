import axios from 'axios'
import {
  GET_SUMMONER_INFO,
  CLEAR_SUMMONER_INFO,
  SUMMONER_INFO_ERROR,
  SUMMONER_INFO_LOADING,
  GET_MORE_MATCHES,
  MATCHES_LOADING,
  MATCHES_ERROR,
  GET_SUMMONER_REGION,
  GET_TOKEN,
  CLEAR_SUMMONER_STATE,
  CLEAR_SEARCH,
} from '../constants/summonerInfoConstants'

const endpoint = process.env.REACT_APP_API_ENDPOINT || ''
let timer
let source

export const getSummonerInfo = (summonerName, region) => async (dispatch) => {
  source = axios.CancelToken.source()
  try {
    dispatch({
      type: GET_TOKEN,
      payload: source,
    })
    dispatch({
      type: SUMMONER_INFO_LOADING,
    })
    const { data } = await axios(
      `${endpoint}/getSummonerInfo/${summonerName}/${region}`,
      { cancelToken: source.token }
    )

    timer = setTimeout(() => {
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
    })
  } catch (error) {
    dispatch({
      type: SUMMONER_INFO_ERROR,
      payload: error.message,
    })
  }
}

export const clearSummoner = () => (dispatch) => {
  dispatch({
    type: CLEAR_SUMMONER_INFO,
  })
  source.cancel('cancelled getSummonerInfo')
  clearTimeout(timer)
}

export const clearSummonerState = () => (dispatch) => {
  dispatch({
    type: CLEAR_SUMMONER_STATE,
  })
  clearTimeout(timer)
}

export const getMoreMatches =
  (gameIds, summonerInfo, region) => async (dispatch) => {
    try {
      dispatch({
        type: MATCHES_LOADING,
      })
      const { data } = await axios.get(
        `${endpoint}/getMoreMatches/${JSON.stringify(gameIds)}/${JSON.stringify(
          summonerInfo
        )}/${region}`
      )
      timer = setTimeout(() => {
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

export const getSummonerRegion = () => (dispatch) => {
  dispatch({
    type: SUMMONER_INFO_LOADING,
  })

  timer = setTimeout(() => {
    dispatch({
      type: GET_SUMMONER_REGION,
    })
  })
}

export const clearSearch = () => (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH,
  })

  clearTimeout(timer)
}
