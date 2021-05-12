import {
  DECREMENT_PAGE,
  GET_LEADERBOARD,
  INCREMENT_PAGE,
  LEADERBOARD_ERROR,
  LEADERBOARD_LOADING,
  SET_CURRENT_PAGE,
  SET_PAGE,
  SET_POSTS_PER_PAGE,
  SET_RANK,
} from '../constants/leaderboardConstants'

const leaderboardInitial = {
  leaderboardLoading: false,
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
    case LEADERBOARD_LOADING:
      return { ...state, leaderboardLoading: true }
    case GET_LEADERBOARD:
      return {
        ...state,
        leaderboardLoading: false,
        data: action.payload,
        totalPosts: action.payload.length,
      }

    case LEADERBOARD_ERROR:
      return { ...state, leaderboardLoading: false, error: action.payload }
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

// export const leaderboardDiamondtoIronReducer = (
//   state = leaderboardInitial,
//   action
// ) => {
//   switch (action.type) {
//     case LEADERBOARD_LOADING:
//       return { ...state, leaderboardLoading: true }
//     case GET_LEADERBOARD:
//       return { ...state, leaderboardLoading: false, data: action.payload }
//     case LEADERBOARD_ERROR:
//       return { ...state, leaderboardLoading: false, error: action.payload }
//     default:
//       return state
//   }
// }
