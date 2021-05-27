import {
  ADD_SUMMONER,
  ANIMATE_HIDE,
  ANIMATE_SHOW,
  BRAND_BACKGROUND,
  CHAMP_BACKGROUND,
  HIDE_NAV,
  HIDE_STORAGE,
  REMOVE_SUMMONER,
  SHOW_NAV,
  SHOW_STORAGE,
  USER_INPUT,
  SET_FADE,
} from '../constants/inputConstants'

export const getInput = (input, summoner, region, icon) => {
  switch (input) {
    case 'userInput': {
      return {
        type: USER_INPUT,
        payload: {
          summoner,
          region,
        },
      }
    }
    case 'show':
      return {
        type: SHOW_STORAGE,
      }
    case 'hide':
      return {
        type: HIDE_STORAGE,
      }
    case 'animateShow':
      return {
        type: ANIMATE_SHOW,
      }
    case 'animateHide':
      return {
        type: ANIMATE_HIDE,
      }
    case 'addSummoner':
      return {
        type: ADD_SUMMONER,
        payload: [summoner, region, icon],
      }
    case 'removeSummoner':
      return {
        type: REMOVE_SUMMONER,
        payload: [summoner, region],
      }
    default: {
      return
    }
  }
}

export const changeNav = (input) => {
  switch (input) {
    case 'showNav': {
      return {
        type: SHOW_NAV,
      }
    }
    case 'hideNav': {
      return {
        type: HIDE_NAV,
      }
    }
    default:
      break
  }
}

export const changeBackground = (input, championBackground) => (dispatch) => {
  if (input === 'brandBackground') {
    dispatch({
      type: SET_FADE,
    })
    setTimeout(() => {
      dispatch({
        type: BRAND_BACKGROUND,
      })
    }, 500)
  } else if (input === 'champBackground') {
    dispatch({
      type: SET_FADE,
    })
    setTimeout(() => {
      dispatch({
        type: CHAMP_BACKGROUND,
        payload: championBackground,
      })
    }, 500)
  }
}
