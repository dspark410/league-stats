import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import { persist } from './reduxPersist'
import { dependencyReducer } from './reducers/dependencyReducer'
import { inputReducer } from './reducers/inputReducer'
import { summonerInfoReducer } from './reducers/summonerInfoReducer'
import { leaderboardReducer } from './reducers/leaderboardReducer'
import { moreMatchesReducer } from './reducers/getMoreMatchesReducer'
import { championReducer } from './reducers/championReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'summoner',
  blacklist: [
    'dependency',
    'input',
    'getMoreMatches',
    'leaderboard',
    'champion',
  ],
}

const reducers = persist(
  persistConfig,
  combineReducers({
    summoner: summonerInfoReducer,
    dependency: dependencyReducer,
    input: inputReducer,
    getMoreMatches: moreMatchesReducer,
    leaderboard: leaderboardReducer,
    champion: championReducer,
  })
)

const middleware = [thunk]

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)
