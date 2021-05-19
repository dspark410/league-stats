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
  INVALID_SUMMONER_COUNT,
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
    case 'brandBackground': {
      return {
        type: BRAND_BACKGROUND,
      }
    }
    case 'champBackground': {
      return {
        type: CHAMP_BACKGROUND,
        payload: summoner,
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
