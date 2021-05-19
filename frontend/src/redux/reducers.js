/** @format */

import {
  LOADING,
  GET_SUMMONER_INFO,
  GET_MORE_MATCHES,
  ERROR,
} from "./constants";

const summonerInfoInitial = { summLoading: false, data: {}, error: "" };
const moreMatchesInitial = {};

export const summonerInfoReducer = (state = summonerInfoInitial, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, summLoading: true };
    case GET_SUMMONER_INFO:
      return { ...state, summLoading: false, data: action.payload };
    case ERROR:
      return { ...state, summLoading: false, error: action.payload };
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
