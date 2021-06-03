import {
  CHAMPION_LOADING,
  CLEAR_CHAMP_LOADING,
  SET_ROLE,
  SET_INPUT,
  GET_CHAMPION,
  SET_CHAMPION,
  SET_FADE_FALSE,
  SET_FADE_TRUE,
  SELECT_CHAMPION,
  SELECT_CHAMPION_ERROR,
  SELECT_VIDEO,
  VIDEO_LOADING,
  SKIN_FADE,
  NEXT_SKIN,
  PREV_SKIN,
  RESET_SKIN,
  RESET_CHAMPION_DETAIL,
} from '../constants/championConstants'

const championInitial = {
  championLoading: false,
  fade: true,
  role: 'all',
  input: '',
  autofill: [],
  champs: [],
  selectedChampion: {},
  videoKey: 'Q',
  videoLoading: false,
  currentSkin: 0,
  skinFade: false,
  backgroundLoading: false,
  error: '',
}

export const championReducer = (state = championInitial, action) => {
  switch (action.type) {
    case CHAMPION_LOADING:
      return { ...state, championLoading: true }
    case CLEAR_CHAMP_LOADING:
      return { ...state, championLoading: false }
    case SET_ROLE:
      return {
        ...state,
        role: action.payload,
      }
    case SET_INPUT:
      return {
        ...state,
        input: action.payload[0],
        autofill: action.payload[1],
      }
    case GET_CHAMPION:
      return {
        ...state,
        championLoading: false,
        autofill: action.payload,
        champs: action.payload,
      }
    case SET_CHAMPION:
      return { ...state, autofill: action.payload, champs: action.payload }
    case SET_FADE_FALSE:
      return { ...state, fade: false }
    case SET_FADE_TRUE:
      return { ...state, fade: true }
    case SELECT_CHAMPION:
      return { ...state, selectedChampion: action.payload }
    case SELECT_CHAMPION_ERROR:
      return { ...state, error: action.payload }
    case SELECT_VIDEO:
      return { ...state, videoKey: action.payload, videoLoading: false }
    case VIDEO_LOADING:
      return { ...state, videoLoading: true }
    case SKIN_FADE:
      return { ...state, skinFade: true }
    case NEXT_SKIN:
      return { ...state, skinFade: false, currentSkin: action.payload }
    case PREV_SKIN:
      return { ...state, skinFade: false, currentSkin: action.payload }
    case RESET_SKIN:
      return { ...state, skinFade: false, currentSkin: action.payload }
    case RESET_CHAMPION_DETAIL:
      return championInitial
    default:
      return state
  }
}
