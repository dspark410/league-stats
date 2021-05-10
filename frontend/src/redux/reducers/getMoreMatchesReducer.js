/** @format */

import { GET_MORE_MATCHES } from '../constants/moreMatchesConstants'

const moreMatchesInitial = {}

export const moreMatchesReducer = (state = moreMatchesInitial, action) => {
  switch (action.type) {
    case GET_MORE_MATCHES:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
