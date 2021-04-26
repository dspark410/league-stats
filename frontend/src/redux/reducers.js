import { LOADING, GET_SUMMONER_INFO, GET_MORE_MATCHES } from "./constants";

const summonerInfoInitial = {};
const moreMatchesInitial = {};

export const summonerInfoReducer = (state = summonerInfoInitial, action) => {
  switch (action.type) {
    case GET_SUMMONER_INFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const moreMatchesReducer = (state = moreMatchesInitial, action) => {
  switch (action.type) {
    case GET_MORE_MATCHES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
