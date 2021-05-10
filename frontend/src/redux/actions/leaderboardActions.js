/** @format */
import axios from 'axios'
import {
  GET_LEADERBOARD_CHAL,
  LEADERBOARD_ERROR,
  LEADERBOARD_LOADING,
} from '../constants/leaderboardConstants'

const endpoint = process.env.REACT_APP_API_ENDPOINT || ''

export const getLeaderboard = (region, rank, division) => async (dispatch) => {
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

    // const allData = await Promise.all(
    //   data.entries.sort((a, b) => b.leaguePoints - a.leaguePoints).map(async (player) => {
    //     const { data } = await axios.get(
    //       `${endpoint}/api/getSummonerId/${player.summonerId}/${region}`
    //     )

    //     if (data.profileIconId === 0) {
    //       player.icon = data.profileIconId.toString()
    //     } else {
    //       player.icon = data.profileIconId
    //     }

    //     player.tier = data.tier.toUpperCase()
    //     player.number = i + 1
    //     return data
    //   })
    // )

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
