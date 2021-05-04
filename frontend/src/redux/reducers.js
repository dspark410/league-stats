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
  ADD_SUMMONER,
  SHOW_NAV,
  HIDE_NAV,
  BRAND_BACKGROUND,
  CHAMP_BACKGROUND,
  USER_INPUT,
} from "./constants";
import BrandBackground from "../components/images/brand.jpg";

const prevSearchesLocal =
  JSON.parse(localStorage.getItem("searchedSummoner")) || [];

const dependencyInitial = {};

const inputInitial = {
  summonerInput: {
    name: "",
    region: JSON.parse(sessionStorage.getItem("region")) || "NA1",
  },
  background: BrandBackground,
  nav: false,
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

export const inputReducer = (state = inputInitial, action) => {
  switch (action.type) {
    case USER_INPUT:
      return {
        ...state,
        summonerInput: {
          name: action.payload.summoner,
          region: action.payload.region,
        },
      };

    case SHOW_NAV:
      return {
        ...state,
        nav: true,
      };
    case HIDE_NAV:
      return {
        ...state,
        nav: false,
      };
    case BRAND_BACKGROUND:
      return {
        ...state,
        background: BrandBackground,
      };
    case CHAMP_BACKGROUND:
      return {
        ...state,
        background: action.payload,
      };
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
    case ADD_SUMMONER:
      const prevSearchesArr = [...state.prevSearches];

      const doNotAdd = state.prevSearches
        .map((entry) => {
          return (
            entry[0].includes(action.payload[0]) &&
            entry[1].includes(action.payload[1])
          );
        })
        .includes(true);

      if (!doNotAdd) {
        if (prevSearchesArr.length === 4) {
          prevSearchesArr.pop();
        }

        prevSearchesArr.unshift([
          action.payload[0],
          action.payload[1],
          action.payload[2],
        ]);

        localStorage.setItem(
          "searchedSummoner",
          JSON.stringify(prevSearchesArr)
        );
      }
      sessionStorage.setItem("region", JSON.stringify(action.payload[1]));

      return {
        ...state,
        prevSearches: prevSearchesArr,
      };
    case REMOVE_SUMMONER:
      const searchedSummoners = [
        ...state.prevSearches.filter((summoner) => {
          return (
            summoner[0] !== action.payload[0] ||
            summoner[1] !== action.payload[1]
          );
        }),
      ];

      localStorage.setItem(
        "searchedSummoner",
        JSON.stringify(searchedSummoners)
      );

      return {
        ...state,
        prevSearches: searchedSummoners,
      };
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
