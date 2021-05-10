/** @format */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { persist } from './reduxPersist'

import { dependencyReducer } from './reducers/dependencyReducer'
import { inputReducer } from './reducers/inputReducer'
import { summonerInfoReducer } from './reducers/summonerInfoReducer'
import {
  leaderboardChalltoMasterReducer,
  leaderboardDiamondtoIronReducer,
} from './reducers/leaderboardReducer'
import { moreMatchesReducer } from './reducers/getMoreMatchesReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const persistConfig = {
  key: 'root',
}

const reducers = combineReducers({
  summoner: persist(persistConfig, summonerInfoReducer),
  dependency: dependencyReducer,
  input: inputReducer,
  getMoreMatches: moreMatchesReducer,
  leaderboardChalltoMaster: leaderboardChalltoMasterReducer,
  leaderboardDiamondtoIron: leaderboardDiamondtoIronReducer,
})

const middleware = [thunk]

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)
