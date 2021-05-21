import { createStore, combineReducers, applyMiddleware } from 'redux'
import { dependencyReducer } from './reducers/dependencyReducer'
import { inputReducer } from './reducers/inputReducer'
import { summonerInfoReducer } from './reducers/summonerInfoReducer'
import { leaderboardReducer } from './reducers/leaderboardReducer'
import { championReducer } from './reducers/championReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  summoner: summonerInfoReducer,
  dependency: dependencyReducer,
  input: inputReducer,
  leaderboard: leaderboardReducer,
  champion: championReducer,
})

const middleware = [thunk]

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
)
