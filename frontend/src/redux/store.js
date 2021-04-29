/** @format */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
  summonerInfoReducer,
  moreMatchesReducer,
  dependencyReducer,
  inputReducer,
} from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
  dependency: dependencyReducer,
  input: inputReducer,
  summoner: summonerInfoReducer,
  getMoreMatches: moreMatchesReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducers,

  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
