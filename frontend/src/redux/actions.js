/** @format */

import axios from "axios";
import {
  GET_DEPENDENCY,
  SHOW_STORAGE,
  HIDE_STORAGE,
  ANIMATE_SHOW,
  ANIMATE_HIDE,
  REMOVE_SUMMONER,
  LOADING,
  GET_SUMMONER_INFO,
  GET_MORE_MATCHES,
  ERROR,
  ADD_SUMMONER,
  SHOW_NAV,
  HIDE_NAV,
  BRAND_BACKGROUND,
  CHAMP_BACKGROUND,
  USER_INPUT,
  LEADERBOARD_LOADING,
  GET_LEADERBOARD_CHAL,
  GET_LEADERBOARD_DIA,
  LEADERBOARD_ERROR,
} from "./constants";

const endpoint = process.env.REACT_APP_API_ENDPOINT || "";

export const getDependency = () => async (dispatch) => {
  try {
    const backupData = await axios.get(`${endpoint}/api/backupjson`);

    const versionData = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    const items = await axios.get(
      `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json`
    );

    const spells = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${versionData.data[0]}/data/en_US/summoner.json`
    );

    const runes = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${versionData.data[0]}/data/en_US/runesReforged.json`
    );

    const champInfo = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${versionData.data[0]}/data/en_US/champion.json`
    );

    const champInfo2 = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${versionData.data[4]}/data/en_US/champion.json`
    );

    const latest = Object.values(champInfo.data.data).filter(
      (champ) => !Object.keys(champInfo2.data.data).includes(champ.id)
    );

    const freeChamps = await axios.get(
      `${endpoint}/api/getChampionRotation/NA1`
    );

    const data = {
      version: versionData.data[0],
      items: items.data,
      backupItem: backupData.data,
      spells: Object.values(spells.data.data),
      runes: runes.data,
      champInfo: Object.values(champInfo.data.data),
      latestChamp: latest,
      freeChamps: freeChamps.data.freeChampionIds,
    };

    dispatch({
      type: GET_DEPENDENCY,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const getInput = (input, summoner, region, icon) => {
  switch (input) {
    case "userInput": {
      return {
        type: USER_INPUT,
        payload: {
          summoner,
          region,
        },
      };
    }

    case "showNav": {
      return {
        type: SHOW_NAV,
      };
    }
    case "hideNav": {
      return {
        type: HIDE_NAV,
      };
    }
    case "brandBackground": {
      return {
        type: BRAND_BACKGROUND,
      };
    }
    case "champBackground": {
      return {
        type: CHAMP_BACKGROUND,
      };
    }
    case "show":
      return {
        type: SHOW_STORAGE,
      };

    case "hide":
      return {
        type: HIDE_STORAGE,
      };
    case "animateShow":
      return {
        type: ANIMATE_SHOW,
      };

    case "animateHide":
      return {
        type: ANIMATE_HIDE,
      };
    case "addSummoner":
      return {
        type: ADD_SUMMONER,
        payload: [summoner, region, icon],
      };
    case "removeSummoner":
      return {
        type: REMOVE_SUMMONER,
        payload: [summoner, region],
      };
    default: {
      return;
    }
  }
};

export const getSummonerInfo = (summonerName, region) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    const { data } = await axios.get(
      `${endpoint}/getSummonerInfo/${summonerName}/${region}`
    );
    if (data === "summoner not found...") {
      dispatch({
        type: GET_SUMMONER_INFO,
        payload: { notFound: "summoner not found..." },
      });
    } else {
      dispatch({
        type: GET_SUMMONER_INFO,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const getMoreMatches = (gameIds, summonerInfo, region) => async (
  dispatch
) => {
  const { data } = await axios.get(
    `${endpoint}/getMoreMatches/${gameIds}/${summonerInfo}/${region}`
  );

  console.log("getMoreMatches", data);

  dispatch({
    type: GET_MORE_MATCHES,
    payload: data,
  });
};

export const getLeaderboard = (region, rank, division) => async (dispatch) => {
  try {
    dispatch({
      type: LEADERBOARD_LOADING,
    });
    const { data } = await axios.get(
      `${endpoint}/api/leaderboard/${rank}/${region}`
    );
    dispatch({
      type: GET_LEADERBOARD_CHAL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEADERBOARD_ERROR,
      payload: error.message,
    });
  }
};
