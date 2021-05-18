import axios from 'axios'
import {
  DEPENDENCY_ERROR,
  GET_DEPENDENCY,
} from '../constants/dependencyConstants'

const endpoint = process.env.REACT_APP_API_ENDPOINT || ''

export const getDependency = () => async (dispatch) => {
  try {
    const backupData = await axios.get(`${endpoint}/api/backupjson`)

    const versionData = await axios.get(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    )

    const items = await axios.get(
      `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json`
    )

    const spells = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${versionData.data[0]}/data/en_US/summoner.json`
    )

    const runes = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${versionData.data[0]}/data/en_US/runesReforged.json`
    )

    const champInfo = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${versionData.data[0]}/data/en_US/champion.json`
    )

    const champInfo2 = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${versionData.data[4]}/data/en_US/champion.json`
    )

    const latest = Object.values(champInfo.data.data).filter(
      (champ) => !Object.keys(champInfo2.data.data).includes(champ.id)
    )

    const freeChamps = await axios.get(
      `${endpoint}/api/getChampionRotation/NA1`
    )
    // Store array of numbers for free champion rotation in variable
    const championRotation = freeChamps.data.freeChampionIds
    // Filter through champInfo to keep only the object for free champions
    const rotationChamp = Object.values(champInfo.data.data).filter((champ) =>
      // If chamption rotation matches key of free champs, returns true
      championRotation.includes(Number(champ.key))
    )

    const data = {
      version: versionData.data[0],
      items: items.data,
      backupItem: backupData.data,
      spells: Object.values(spells.data.data),
      runes: runes.data,
      champInfo: Object.values(champInfo.data.data),
      champMap: champInfo.data.data,
      latestChamp: latest,
      freeChamps: rotationChamp,
    }

    dispatch({
      type: GET_DEPENDENCY,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DEPENDENCY_ERROR,
      payload: error.message,
    })
  }
}
