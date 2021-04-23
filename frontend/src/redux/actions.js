import axios from "axios";
import { LOADING, GET_SUMMONER_INFO, GET_MORE_MATCHES } from "./constants";

export const loadingTrue = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
};

export const getSummonerInfo = (summonerName, region) => async (dispatch) => {
  const { data } = await axios.get(
    `/getSummonerInfo/${region}/${summonerName}`
  );
  dispatch({
    type: GET_SUMMONER_INFO,
    payload: data,
  });
};
