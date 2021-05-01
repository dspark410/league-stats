/** @format */

import {
  GET_DEPENDENCY,
  SHOW_STORAGE,
  HIDE_STORAGE,
  GET_SUMMONER_INFO,
  LOADING,
  ERROR,
  GET_MORE_MATCHES,
  ANIMATE_SHOW,
  ANIMATE_HIDE,
  REMOVE_SUMMONER,
} from "./constants";

const prevSearchesLocal =
  JSON.parse(localStorage.getItem("searchedSummoner")) || [];

const dependencyInitial = {};

const inputInitial = {
  showPrevSearches: false,
  hideAnimation: true,
  prevSearches: prevSearchesLocal,
};

const summonerInfoInitial = {
  summLoading: false,
  data: {},
  error: "",
};

const moreMatchesInitial = {};

export const dependencyReducer = (state = dependencyInitial, action) => {
  switch (action.type) {
    case GET_DEPENDENCY:
      return { ...state, ...action.payload };
    case ERROR:
      return { ...state, error: action.payload };
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
    case SHOW_STORAGE:
      return {
        ...state,
        showPrevSearches: true,
      };
    case HIDE_STORAGE:
      return {
        ...state,
        showPrevSearches: false,
      };
    case ANIMATE_SHOW:
      return {
        ...state,
        hideAnimation: true,
      };
    case ANIMATE_HIDE:
      return {
        ...state,
        hideAnimation: false,
      };
    case REMOVE_SUMMONER:
      return {
        ...state,
        prevSearches: state.prevSearches.filter((summoner) => {
          console.log("summoner", summoner[0], summoner[1]);
          console.log("action", action.payload[0], action.payload[1]);
          return (
            summoner[0] !== action.payload[0] ||
            summoner[1] !== action.payload[1]
          );
        }),
      };
    default:
      return state;
  }
};
