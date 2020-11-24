const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getSummonerName", (req, res) => {
  async function getSummoner() {
    // fetch data from a url endpoint
    const data = await axios.get(
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/mistahpig?api_key=RGAPI-09ea864d-e4b8-41df-9a41-dc97b02fe32c"
    );
    console.log("Summoner Info", data.data);
    return data.data;
  }

  const summoner = getSummoner();

  res.send(summoner);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
