import axios from 'axios'
import {
  CHAMPION_LOADING,
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

export const setVideo = (key) => async (dispatch) => {
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

export const changeSkin =
  (action, currentSkin, skinLength) => async (dispatch) => {
    dispatch({
      type: SKIN_FADE,
    })

    setTimeout(() => {
      if (action === 'prev') {
        dispatch({
          type: PREV_SKIN,
          payload: currentSkin === 0 ? skinLength - 1 : currentSkin - 1,
        })
      } else {
        dispatch({
          type: NEXT_SKIN,
          payload: currentSkin === skinLength - 1 ? 0 : currentSkin + 1,
        })
      }
    }, 200)
  }
