import {
  DEPENDENCY_ERROR,
  GET_DEPENDENCY,
} from '../constants/dependencyConstants'

export const dependencyReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DEPENDENCY:
      return { ...state, ...action.payload }
    case DEPENDENCY_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
