import axios from 'axios'
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
  PREV_SKIN,
  NEXT_SKIN,
  RESET_SKIN,
  RESET_CHAMPION_DETAIL,
} from '../constants/championConstants'

let timer

export const getChampion = (champInfo) => (dispatch) => {
  dispatch({
    type: CHAMPION_LOADING,
  })
  timer = setTimeout(() => {
    dispatch({
      type: GET_CHAMPION,
      payload: champInfo,
    })
  }, 2500)
}

export const resetChampDetail = () => (dispatch) => {
  dispatch({
    type: RESET_CHAMPION_DETAIL,
  })
}

export const clearTimer = () => (dispatch) => {
  dispatch({
    type: CLEAR_CHAMP_LOADING,
  })
  clearTimeout(timer)
}

export const setRole = (role) => (dispatch) => {
  dispatch({
    type: SET_ROLE,
    payload: role,
  })
}

export const setInput = (input, filteredChamp) => (dispatch) => {
  dispatch({
    type: SET_INPUT,
    payload: [input, filteredChamp],
  })
}

export const setChampion = (champInfo) => (dispatch) => {
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

export const selectChampion = (version, champ) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champ}.json`
    )
    dispatch({
      type: SELECT_CHAMPION,
      payload: data[champ],
    })
  } catch (error) {
    dispatch({
      type: SELECT_CHAMPION_ERROR,
      payload: error.message,
    })
  }
}

export const setVideo = (key) => (dispatch) => {
  dispatch({
    type: VIDEO_LOADING,
  })

  setTimeout(() => {
    dispatch({
      type: SELECT_VIDEO,
      payload: key,
    })
  }, 100)
}

export const changeSkin = (action, currentSkin, skinLength) => (dispatch) => {
  dispatch({
    type: SKIN_FADE,
  })

  setTimeout(() => {
    if (action === 'prev') {
      dispatch({
        type: PREV_SKIN,
        payload: currentSkin === 0 ? skinLength - 1 : currentSkin - 1,
      })
    } else if (action === 'next') {
      dispatch({
        type: NEXT_SKIN,
        payload: currentSkin === skinLength - 1 ? 0 : currentSkin + 1,
      })
    } else {
      dispatch({
        type: RESET_SKIN,
        payload: 0,
      })
    }
  }, 200)
}
