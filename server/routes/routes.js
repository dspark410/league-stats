const express = require("express");
const router = express.Router();
const { getMoreMatches } = require("../controllers/utils");
const {
  getSummonerName,
  getMasteries,
  getRank,
  getMaps,
  getQueues,
  getMatchList,
  getMatchDetails,
  getLive,
  getBackup,
} = require("../controllers/summoner");
const {
  getSummonerId,
  getLeaderboard,
  getChallengerGrandMasterMaster,
} = require("../controllers/leaderboard");
const { getFreeChamps } = require("../controllers/champions");

router.get("/getSummonerName/:summoner/:region", getSummonerName);
router.get("/getSummonerId/:summoner/:region", getSummonerId);
router.get("/masteries/:id/:region", getMasteries);
router.get("/rank/:id/:region", getRank);
router.get("/getChampionRotation/:region", getFreeChamps);
router.get("/mapList", getMaps);
router.get("/queueType", getQueues);
router.get("/matchList/:id/:region", getMatchList);
router.get("/matchDetails/:id/:region", getMatchDetails);
router.get("/leaderboard/:region/:rank/:division/:page", getLeaderboard);
router.get("/leaderboard/:tier/:region", getChallengerGrandMasterMaster);
router.get("/live/:summonerId/:region", getLive);
router.get("/getMoreMatches/:gameIds/:summonerInfo/:region", getMoreMatches);
router.get("/backupjson", getBackup);

module.exports = router;
