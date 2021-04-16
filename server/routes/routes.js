const express = require('express')
const router = express.Router()
const { getBackup } = require('../controllers/summoner')
const {
  getSummonerId,
  getLeaderboardDiamondtoIron,
  getChallengerGrandMasterMaster,
} = require('../controllers/leaderboard')
const { getFreeChamps } = require('../controllers/champions')

router.get('/getSummonerId/:summoner/:region', getSummonerId)
router.get('/getChampionRotation/:region', getFreeChamps)
router.get(
  '/leaderboard/:region/:rank/:division/:page',
  getLeaderboardDiamondtoIron
)
router.get('/leaderboard/:tier/:region', getChallengerGrandMasterMaster)
router.get('/backupjson', getBackup)

module.exports = router
