import {
  GET_MORE_MATCHES,
  GET_SUMMONER_INFO,
  GET_SUMMONER_REGION,
  CLEAR_SUMMONER_INFO,
  CLEAR_SUMMONER_STATE,
  MATCHES_ERROR,
  MATCHES_LOADING,
  SUMMONER_INFO_ERROR,
  SUMMONER_INFO_LOADING,
  GET_TOKEN,
  CLEAR_SEARCH,
} from '../constants/summonerInfoConstants'

const summonerInfoInitial = {
  summLoading: false,
  matchesLoader: false,
  controller: '',
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
    case GET_TOKEN:
      return { ...state, controller: action.payload }
    case SUMMONER_INFO_LOADING:
      return { ...state, summLoading: true }
    case CLEAR_SUMMONER_INFO:
      return { ...state, summLoading: false }
    case CLEAR_SUMMONER_STATE:
      return { ...summonerInfoInitial, summLoading: true }
    case GET_SUMMONER_INFO:
      return {
        ...state,
        summLoading: false,
        data: action.payload,
      }
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
    case GET_SUMMONER_REGION:
      return { ...state, summLoading: false }
    case CLEAR_SEARCH:
      return { ...state, summLoading: false }
    default:
      return state
  }
}
