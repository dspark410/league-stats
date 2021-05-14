import {
  CHAMPION_LOADING,
  SET_ROLE,
  SET_INPUT,
  GET_CHAMPION,
  SET_CHAMPION,
  SET_FADE_FALSE,
  SET_FADE_TRUE,
} from '../constants/championConstants'

export const getChampion = (champInfo) => async (dispatch) => {
  dispatch({
    type: CHAMPION_LOADING,
  })
  setTimeout(() => {
    dispatch({
      type: GET_CHAMPION,
      payload: champInfo,
    })
  }, 2500)
}

export const setRole = (role) => async (dispatch) => {
  dispatch({
    type: SET_ROLE,
    payload: role,
  })
}

export const setInput = (input, filteredChamp) => async (dispatch) => {
  dispatch({
    type: SET_INPUT,
    payload: [input, filteredChamp],
  })
}

export const setChampion = (champInfo) => async (dispatch) => {
  dispatch({
    type: SET_FADE_FALSE,
  })

  setTimeout(() => {
    dispatch({
      type: SET_CHAMPION,
      payload: champInfo,
    })
    dispatch({
      type: SET_FADE_TRUE,
    })
  }, 50)
}
