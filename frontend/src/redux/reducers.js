/** @format */

import {
  GET_DEPENDENCY,
  GET_SUMMONER_INFO,
  LOADING,
  ERROR,
  GET_MORE_MATCHES,
} from "./constants";

// version champInfo item.json backupJson freechamps
const dependencyInitial = {
  version: "",
  champInfo: [],
  items: [],
  backupItem: {},
  freeChamps: [],
};
const summonerInfoInitial = { summLoading: false, data: {}, error: "" };
const moreMatchesInitial = {};
const inputInitial = {
  inputValue: "",
  region: "NA1",
  showPrevSearches: false,
  prevSearches: [],
};

export const dependencyReducer = (state = dependencyInitial, action) => {
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

export const inputReducer = (state = inputInitial, action) => {
  switch (action.type) {
    case INPUT_VALUE:
      return { ...state, ...placeholder };
    default:
      return state;
  }
};
