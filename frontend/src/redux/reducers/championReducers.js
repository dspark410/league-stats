import {
  CHAMPION_LOADING,
  SET_ROLE,
  SET_INPUT,
  GET_CHAMPION,
  SET_CHAMPION,
  SET_FADE_FALSE,
  SET_FADE_TRUE,
} from '../constants/championConstants'

const championInitial = {
  championLoading: false,
  fade: true,
  role: 'all',
  input: '',
  autofill: [],
}

export const championReducer = (state = championInitial, action) => {
  switch (action.type) {
    case CHAMPION_LOADING:
      return { ...state, championLoading: true }
    case SET_ROLE:
      return {
        ...state,
        role: action.payload,
      }
    case SET_INPUT:
      return {
        ...state,
        input: action.payload,
      }
    case GET_CHAMPION:
      return { ...state, championLoading: false, autofill: action.payload }
    case SET_CHAMPION:
      return { ...state, autofill: action.payload }
    case SET_FADE_FALSE:
      return { ...state, fade: false }
    case SET_FADE_TRUE:
      return { ...state, fade: true }
    default:
      return state
  }
}
