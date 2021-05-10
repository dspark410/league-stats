/** @format */

import { GET_MORE_MATCHES } from '../constants/moreMatchesConstants'

const endpoint = process.env.REACT_APP_API_ENDPOINT || ''

export const getMoreMatches =
  (gameIds, summonerInfo, region) => async (dispatch) => {
    const { data } = await axios.get(
      `${endpoint}/getMoreMatches/${gameIds}/${summonerInfo}/${region}`
    )

    console.log('getMoreMatches', data)

    dispatch({
      type: GET_MORE_MATCHES,
      payload: data,
    })
  }
