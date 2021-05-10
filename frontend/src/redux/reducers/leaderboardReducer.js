/** @format */

import {
  GET_LEADERBOARD_CHAL,
  LEADERBOARD_ERROR,
  LEADERBOARD_LOADING,
} from '../constants/leaderboardConstants'

const leaderboardInitial = {
  leaderboardLoading: false,
  data: [],
  error: '',
}

export const leaderboardReducer = (state = leaderboardInitial, action) => {
  switch (action.type) {
    case LEADERBOARD_LOADING:
      return { ...state, leaderboardLoading: true }
    case GET_LEADERBOARD_CHAL:
      return { ...state, leaderboardLoading: false, data: action.payload }
    case LEADERBOARD_ERROR:
      return { ...state, leaderboardLoading: false, error: action.payload }
    default:
      return state
  }
}
