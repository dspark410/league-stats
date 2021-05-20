import {
  DECREMENT_PAGE,
  GET_LEADERBOARD,
  INCREMENT_PAGE,
  LEADERBOARD_ERROR,
  SET_CURRENT_PAGE,
  SET_PAGE,
  SET_POSTS_PER_PAGE,
  SET_RANK,
} from '../constants/leaderboardConstants'

const leaderboardInitial = {
  data: [],
  error: '',
  rank: 'CHALLENGER',
  page: 1,
  currentPage: 1,
  postsPerPage: 25,
  totalPosts: 0,
}

export const leaderboardReducer = (state = leaderboardInitial, action) => {
  switch (action.type) {
    case GET_LEADERBOARD:
      return {
        ...state,
        data: action.payload,
        totalPosts: action.payload.length,
      }
    case LEADERBOARD_ERROR:
      return { ...state, error: action.payload }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    case SET_POSTS_PER_PAGE:
      return {
        ...state,
        postsPerPage: action.payload,
      }
    case INCREMENT_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    case DECREMENT_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    case SET_RANK:
      return { ...state, rank: action.payload }
    default:
      return state
  }
}
