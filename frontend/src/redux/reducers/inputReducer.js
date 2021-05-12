import BrandBackground from '../../components/images/brand.jpg'
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
} from '../constants/inputConstants'

const prevSearchesLocal =
  JSON.parse(localStorage.getItem('searchedSummoner')) || []

const inputInitial = {
  summonerInput: {
    name: '',
    region: JSON.parse(sessionStorage.getItem('region')) || 'NA1',
  },
  background: BrandBackground,
  nav: false,
  showPrevSearches: false,
  hideAnimation: true,
  prevSearches: prevSearchesLocal,
}

export const inputReducer = (state = inputInitial, action) => {
  switch (action.type) {
    case USER_INPUT:
      return {
        ...state,
        summonerInput: {
          name: action.payload.summoner,
          region: action.payload.region,
        },
      }

    case SHOW_NAV:
      return {
        ...state,
        nav: true,
      }
    case HIDE_NAV:
      return {
        ...state,
        nav: false,
      }
    case BRAND_BACKGROUND:
      return {
        ...state,
        background: BrandBackground,
      }
    case CHAMP_BACKGROUND:
      return {
        ...state,
        background: action.payload,
      }
    case SHOW_STORAGE:
      return {
        ...state,
        showPrevSearches: true,
      }
    case HIDE_STORAGE:
      return {
        ...state,
        showPrevSearches: false,
      }
    case ANIMATE_SHOW:
      return {
        ...state,
        hideAnimation: true,
      }
    case ANIMATE_HIDE:
      return {
        ...state,
        hideAnimation: false,
      }
    case ADD_SUMMONER:
      const prevSearchesArr = [...state.prevSearches]

      const doNotAdd = state.prevSearches
        .map((entry) => {
          return (
            entry[0].includes(action.payload[0]) &&
            entry[1].includes(action.payload[1])
          )
        })
        .includes(true)

      if (!doNotAdd) {
        if (prevSearchesArr.length === 4) {
          prevSearchesArr.pop()
        }

        prevSearchesArr.unshift([
          action.payload[0],
          action.payload[1],
          action.payload[2],
        ])

        localStorage.setItem(
          'searchedSummoner',
          JSON.stringify(prevSearchesArr)
        )
      }
      sessionStorage.setItem('region', JSON.stringify(action.payload[1]))

      return {
        ...state,
        prevSearches: prevSearchesArr,
      }
    case REMOVE_SUMMONER:
      const searchedSummoners = [
        ...state.prevSearches.filter((summoner) => {
          return (
            summoner[0] !== action.payload[0] ||
            summoner[1] !== action.payload[1]
          )
        }),
      ]

      localStorage.setItem(
        'searchedSummoner',
        JSON.stringify(searchedSummoners)
      )

      return {
        ...state,
        prevSearches: searchedSummoners,
      }
    default:
      return state
  }
}
