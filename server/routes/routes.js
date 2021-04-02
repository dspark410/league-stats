const express = require('express')
const router = express.Router()
const { getMoreMatches } = require('../controllers/utils')
const {
  getSummonerNameFE,
  getMasteriesFE,
  getRankFE,
  getMapsFE,
  getQueuesFE,
  getMatchListFE,
  getMatchDetailsFE,
  getLiveFE,
  getBackup,
} = require('../controllers/summoner')
const {
  getSummonerId,
  getLeaderboard,
  getChallengerGrandMasterMaster,
} = require('../controllers/leaderboard')
const { getFreeChamps } = require('../controllers/champions')

router.get('/getSummonerName/:summoner/:region', getSummonerNameFE)
router.get('/getSummonerId/:summoner/:region', getSummonerId)
router.get('/masteries/:id/:region', getMasteriesFE)
router.get('/rank/:id/:region', getRankFE)
router.get('/getChampionRotation/:region', getFreeChamps)
router.get('/mapList', getMapsFE)
router.get('/queueType', getQueuesFE)
router.get('/matchList/:id/:region', getMatchListFE)
router.get('/matchDetails/:id/:region', getMatchDetailsFE)
router.get('/leaderboard/:region/:rank/:division/:page', getLeaderboard)
router.get('/leaderboard/:tier/:region', getChallengerGrandMasterMaster)
router.get('/live/:summonerId/:region', getLiveFE)
router.get('/backupjson', getBackup)

module.exports = router
