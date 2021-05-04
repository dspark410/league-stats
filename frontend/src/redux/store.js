/** @format */

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { persist } from "./reduxPersist";
import {
  summonerInfoReducer,
  moreMatchesReducer,
  dependencyReducer,
  inputReducer,
} from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "root",
};

const reducers = combineReducers({
  summoner: persist(persistConfig, summonerInfoReducer),
  dependency: dependencyReducer,
  input: inputReducer,
  getMoreMatches: moreMatchesReducer,
});

const middleware = [thunk];

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
