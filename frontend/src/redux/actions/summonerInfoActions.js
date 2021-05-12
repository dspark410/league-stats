import axios from 'axios'
import {
  GET_SUMMONER_INFO,
  SUMMONER_INFO_ERROR,
  SUMMONER_INFO_LOADING,
} from '../constants/summonerInfoConstants'

const endpoint = process.env.REACT_APP_API_ENDPOINT || ''

export const getSummonerInfo = (summonerName, region) => async (dispatch) => {
  try {
    dispatch({
      type: SUMMONER_INFO_LOADING,
    })
    const { data } = await axios.get(
      `${endpoint}/getSummonerInfo/${summonerName}/${region}`
    )
    if (data === 'summoner not found...') {
      dispatch({
        type: GET_SUMMONER_INFO,
        payload: { notFound: 'summoner not found...' },
      })
    } else {
      dispatch({
        type: GET_SUMMONER_INFO,
        payload: data,
      })
    }
  } catch (error) {
    dispatch({
      type: SUMMONER_INFO_ERROR,
      payload: error.message,
    })
  }
}
