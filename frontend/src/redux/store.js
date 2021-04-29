import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { summonerInfoReducer, moreMatchesReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
  summoner: summonerInfoReducer,
  getMoreMatches: moreMatchesReducer,
});

const middleware = [thunk];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
