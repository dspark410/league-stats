// Enable access to .env file
require("dotenv").config();
require("./itemCompiler");
const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
const backupItem = require("./Items/backupItems.json");
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Call from frontend along with summoner name to retrieve puuid/summoner_id/account_id
app.get("/getSummonerName/:summoner/:region", async (req, res) => {
  try {
    const summoner = encodeURIComponent(req.params.summoner);
    //console.log(req.params.summoner, summoner);
    const region = req.params.region;
    const api = process.env.API_KEY;
    const summonerData = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${api}`
    );
    res.json(summonerData.data);
  } catch (error) {
    console.log(error);
    res.send("summoner not found...");
  }
});

// Call from frontend along with summoner id
app.get("/getSummonerId/:summoner/:region", async (req, res) => {
  try {
    const summoner = req.params.summoner;
    const region = req.params.region;
    const api = process.env.API_KEY;
    const summonerData = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summoner}?api_key=${api}`
    );
    res.json(summonerData.data);
  } catch (error) {
    console.log(error);
    res.send("Summoner not found...");
  }
});

// Call from frontend with id to retrieve a summoner's masteries
app.get("/masteries/:id/:region", async (req, res) => {
  try {
    const id = req.params.id;
    const region = req.params.region;
    const api = process.env.API_KEY;
    const masteriesData = await axios.get(
      `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${api}`
    );
    res.json(masteriesData.data);
  } catch (error) {
    console.log(error);
  }
});

// Call from frontend with id to retrieve a summoner's rank
app.get("/rank/:id/:region", async (req, res) => {
  try {
    const id = req.params.id;
    const region = req.params.region;
    const api = process.env.API_KEY;
    const rankData = await axios.get(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api}`
    );
    res.json(rankData.data);
  } catch (error) {
    console.log(error);
  }
});

// Call from frontend to retrieve free champion rotation for the week
app.get("/getChampionRotation/:region", async (req, res) => {
  try {
    const region = req.params.region;
    const api = process.env.API_KEY;
    const rotationData = await axios.get(
      `https://${region}.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api}`
    );
    res.json(rotationData.data);
  } catch (error) {
    console.log(error);
  }
});

// Call from frontend to retrieve list of LOL maps
app.get("/mapList", async (req, res) => {
  try {
    const mapListData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/maps.json`
    );
    res.json(mapListData.data);
  } catch (error) {
    console.log(error);
  }
});

// Call from frontend to retrieve list of game types
app.get("/queueType", async (req, res) => {
  try {
    const queueTypeData = await axios.get(
      `https://static.developer.riotgames.com/docs/lol/queues.json`
    );
    res.json(queueTypeData.data);
  } catch (error) {
    console.log(error);
  }
});

// Call from frontend with summoner id to retrieve list of recently played matches
app.get("/matchList/:id/:region", async (req, res) => {
  try {
    const id = req.params.id;
    const region = req.params.region;
    const api = process.env.API_KEY;
    const matchListData = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?api_key=${api}`
    );
    res.json(matchListData.data);
  } catch (error) {
    res.send(error);
  }
});

// Call from frontend with game ID to retrieve specific details of a single match
app.get("/matchDetails/:id/:region", async (req, res) => {
  try {
    const id = req.params.id;
    const region = req.params.region;
    const api = process.env.API_KEY;
    const matchDetailsData = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v4/matches/${id}?api_key=${api}`
    );
    res.json(matchDetailsData.data);
  } catch (error) {
    console.log(error);
    res.json(error.response.status);
  }
});

// Call to get challenger solo ranks
app.get("/leaderboard/:region/:rank/:division/:page", async (req, res) => {
  try {
    const api = process.env.API_KEY;
    const region = req.params.region;
    const leaderboardData = await axios.get(
      `https://${region}.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/${req.params.rank}/${req.params.division}?page=${req.params.page}&api_key=${api}`
    );
    res.json(leaderboardData.data);
  } catch (error) {
    console.log(error);
  }
});

//Call for live game for summoner
app.get("/live/:summonerId/:region", async (req, res) => {
  try {
    const api = process.env.API_KEY;
    const region = req.params.region;
    const liveData = await axios.get(
      `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${req.params.summonerId}?api_key=${api}`
    );
    res.json(liveData.data);
  } catch (error) {
    console.log("Not in Live Game");
  }
});

//Call for live game for summoner
app.get("/backupjson", async (req, res) => {
  try {
    res.json(backupItem);
  } catch (error) {
    console.log("Not in Live Game");
  }
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  // Sends static folder
  app.use(express.static("frontend/build"));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
  });
}

// Requested by Riot
app.get("/riot.txt", async (req, res) => {
  res.sendFile(__dirname + "/riot.txt");
});
app.get("//riot.txt", async (req, res) => {
  res.sendFile(__dirname + "/riot.txt");
});

app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
