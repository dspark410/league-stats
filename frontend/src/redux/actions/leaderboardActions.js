import axios from 'axios'
import {
  GET_LEADERBOARD,
  LEADERBOARD_ERROR,
  SET_CURRENT_PAGE,
  SET_RANK,
  SET_POSTS_PER_PAGE,
  INCREMENT_PAGE,
  DECREMENT_PAGE,
  SET_PAGE,
  LEADERBOARD_LOADING,
  CLEAR_LEADERBOARD,
  LEADERBOARD_TOKEN,
} from '../constants/leaderboardConstants'

const endpoint = process.env.REACT_APP_API_ENDPOINT || ''

let timer
let source

export const clearLeaderboard = () => (dispatch) => {
  dispatch({
    type: CLEAR_LEADERBOARD,
  })
  clearTimeout(timer)
  source.cancel('Leaderboard cancelled')
}

export const getLeaderboardChalltoMaster =
  (region, rank) => async (dispatch) => {
    source = axios.CancelToken.source()
    try {
      dispatch({
        type: LEADERBOARD_TOKEN,
        payload: source,
      })
      dispatch({
        type: LEADERBOARD_LOADING,
      })

      const { data } = await axios.get(
        `${endpoint}/api/leaderboard/${rank}/${region}`,
        { cancelToken: source.token }
      )

      if (data.entries.length > 0) {
        data.entries
          .sort((a, b) => b.leaguePoints - a.leaguePoints)
          .forEach((entry, i) => {
            entry.tier = data.tier.toUpperCase()
            entry.number = i + 1
          })
        timer = setTimeout(() => {
          dispatch({
            type: GET_LEADERBOARD,
            payload: data.entries,
          })
        }, 3000)
      }
    } catch (error) {
      dispatch({
        type: LEADERBOARD_ERROR,
        payload: error.message,
      })
    }
  }

export const getLeaderboardDiamondtoIron =
  (region, rank, division, page) => async (dispatch) => {
    source = axios.CancelToken.source()
    try {
      dispatch({
        type: LEADERBOARD_TOKEN,
        payload: source,
      })
      dispatch({
        type: LEADERBOARD_LOADING,
      })
      const { data } = await axios.get(
        `${endpoint}/api/leaderboard/${region}/${rank}/${division}/${page}`,
        { cancelToken: source.token }
      )

      if (data.length === 0) {
        data = []
      }

      if (data.length > 0) {
        data
          .sort((a, b) => b.leaguePoints - a.leaguePoints)
          .forEach((entry, i) => {
            entry.number = i + 1
          })
        timer = setTimeout(() => {
          dispatch({
            type: GET_LEADERBOARD,
            payload: data,
          })
        }, 3000)
      }
    } catch (error) {
      dispatch({
        type: LEADERBOARD_ERROR,
        payload: error.message,
      })
    }
  }

export const getCurrentPage = (action, pageNumber) => {
  switch (action) {
    case 'setCurrentPage': {
      return {
        type: SET_CURRENT_PAGE,
        payload: pageNumber,
      }
    }
    case 'setPage': {
      return {
        type: SET_PAGE,
        payload: pageNumber,
      }
    }
    case 'incrementPage': {
      return {
        type: INCREMENT_PAGE,
        payload: pageNumber + 1,
      }
    }
    case 'decrementPage': {
      return {
        type: DECREMENT_PAGE,
        payload: pageNumber - 1,
      }
    }
    default:
      break
  }
}

export const getSelectRank = (rank) => {
  return {
    type: SET_RANK,
    payload: rank,
  }
}

export const setPostsPerPage = (number) => {
  return {
    type: SET_POSTS_PER_PAGE,
    payload: number,
  }
}
