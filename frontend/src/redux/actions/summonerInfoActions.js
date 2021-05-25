import axios from 'axios'
import {
  SET_INITIAL,
  GET_SUMMONER_INFO,
  CLEAR_SUMMONER_INFO,
  SUMMONER_INFO_ERROR,
  SUMMONER_INFO_LOADING,
  GET_MORE_MATCHES,
  MATCHES_LOADING,
  MATCHES_ERROR,
  GET_SUMMONER_REGION,
} from '../constants/summonerInfoConstants'
const controller = new AbortController()
const endpoint = process.env.REACT_APP_API_ENDPOINT || ''

let timer

export const getSummonerInfo = (summonerName, region) => async (dispatch) => {
  try {
    dispatch({
      type: SUMMONER_INFO_LOADING,
    })
    const res = await fetch(
      `${endpoint}/getSummonerInfo/${summonerName}/${region}`,
      { signal: controller.signal }
    )
    const data = await res.json()

    timer = setTimeout(() => {
      console.log('timer running')
      if (data === 'summoner not found...') {
        dispatch({
          type: GET_SUMMONER_INFO,
          payload: { notFound: 'summoner not found...' },
        })
      } else {
        console.log('dispatch for summonerInfo Running')
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

export const setInitial = () => async (dispatch) => {
  console.log('setInitial in action running')
  clearTimeout(timer)
  controller.abort()
  dispatch({
    type: SET_INITIAL,
    payload: {
      summLoading: false,
      matchesLoader: false,
      data: {
        mastery: [],
        rank: [],
        live: 'Not In Live Game',
        matchHistory: [],
        matchList: {},
        rgn: 'NA1',
        notFound: 'summoner not found...',
      },
      error: '',
    },
  })
}

export const clearSummoner = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SUMMONER_INFO,
  })
  clearTimeout(timer)
  controller.abort()
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
