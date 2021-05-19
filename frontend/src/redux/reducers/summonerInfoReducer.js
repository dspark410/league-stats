import {
  GET_MORE_MATCHES,
  GET_SUMMONER_INFO,
  MATCHES_ERROR,
  MATCHES_LOADING,
  SUMMONER_INFO_ERROR,
  SUMMONER_INFO_LOADING,
} from '../constants/summonerInfoConstants'

const summonerInfoInitial = {
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
}

export const summonerInfoReducer = (state = summonerInfoInitial, action) => {
  switch (action.type) {
    case SUMMONER_INFO_LOADING:
      return { ...state, summLoading: true }
    case GET_SUMMONER_INFO:
      return { ...state, summLoading: false, data: action.payload }
    case SUMMONER_INFO_ERROR:
      return { ...state, summLoading: false, error: action.payload }
    case MATCHES_LOADING:
      return { ...state, matchesLoader: true }
    case GET_MORE_MATCHES:
      return {
        ...state,
        data: {
          ...state.data,
          matchHistory: [...state.data.matchHistory, ...action.payload],
        },
        matchesLoader: false,
      }
    case MATCHES_ERROR:
      return { ...state, error: action.payload, matchesLoader: false }
    default:
      return state
  }
}
