import {
  GET_SUMMONER_INFO,
  SUMMONER_INFO_ERROR,
  SUMMONER_INFO_LOADING,
} from '../constants/summonerInfoConstants'

const summonerInfoInitial = {
  summLoading: false,
  data: {
    mastery: [],
    rank: [],
    live: 'Not In Live Game',
    matchHistory: [],
    matchList: {},
    rgn: 'NA1',
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
    default:
      return state
  }
}
