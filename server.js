// Enable access to .env file
require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getSummonerName/:summoner", async (req, res) => {
  try {
    const summoner = req.params.summoner;
    const api = process.env.API_KEY;
    const summonerData = await axios.get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${api}`
    );
    res.json(summonerData.data);
  } catch (error) {
    console.log(error);
    res.send("Summoner not found");
  }
});

app.get("/masteries/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const api = process.env.API_KEY;
    const masteriesData = await axios.get(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${api}`
    );
    res.json(masteriesData.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/rank/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const api = process.env.API_KEY;
    const rankData = await axios.get(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api}`
    );
    res.json(rankData.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getChampionRotation", async (req, res) => {
  try {
    const api = process.env.API_KEY;
    const rotationData = await axios.get(
      `https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api}`
    );
    res.json(rotationData.data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
