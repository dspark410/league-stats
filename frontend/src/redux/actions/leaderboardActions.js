/** @format */
import axios from 'axios'
import {
  GET_LEADERBOARD_CHAL,
  GET_LEADERBOARD_DIA,
  LEADERBOARD_ERROR,
  LEADERBOARD_LOADING,
} from '../constants/leaderboardConstants'

const endpoint = process.env.REACT_APP_API_ENDPOINT || ''

export const getLeaderboardChalltoMaster =
  (region, rank) => async (dispatch) => {
    try {
      dispatch({
        type: LEADERBOARD_LOADING,
      })
      const { data } = await axios.get(
        `${endpoint}/api/leaderboard/${rank}/${region}`
      )

      data.entries
        .sort((a, b) => b.leaguePoints - a.leaguePoints)
        .forEach((entry, i) => {
          entry.tier = data.tier.toUpperCase()
          entry.number = i + 1
        })

      dispatch({
        type: GET_LEADERBOARD_CHAL,
        payload: data.entries,
      })
    } catch (error) {
      dispatch({
        type: LEADERBOARD_ERROR,
        payload: error.message,
      })
    }
  }

export const getLeaderboardDiamondtoIron =
  (region, rank, division, page) => async (dispatch) => {
    try {
      dispatch({
        type: LEADERBOARD_LOADING,
      })

      const { data } = await axios.get(
        `${endpoint}/api/leaderboard/${region}/${rank}/${division}/${page}`
      )

      data
        .sort((a, b) => b.leaguePoints - a.leaguePoints)
        .forEach((entry, i) => {
          entry.number = i + 1
        })

      if (data.length === 0) {
        data = []
      }

      dispatch({
        type: GET_LEADERBOARD_DIA,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: LEADERBOARD_ERROR,
        payload: error.message,
      })
    }
  }
