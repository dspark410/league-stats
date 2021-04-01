// Enable access to .env file
require("dotenv").config();
require("./itemCompiler");
const routes = require("./routes/routes");
const express = require("express");
const app = express();
const path = require("path");
const {
  getSummonerName2,
  getRank2,
  getMaps2,
  getQueues2,
  getLive2,
  getMatchList2,
  getVersion,
} = require("./controllers/summoner");
const { getChampInfo } = require("./controllers/champions");
const {
  getSummonerMasteries,
  getSummonerMatches,
  getMoreMatches,
} = require("./controllers/utils");
const port = process.env.PORT || 5000;

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api", routes);

let maps;
let queues;
let version;
let champInfo;

getMaps2().then((res) => (maps = res));
getQueues2().then((res) => (queues = res));
getVersion().then((res) => {
  version = res;
  getChampInfo(res).then((response) => (champInfo = response));
});

app.get("/getSummonerInfo/:summoner/:region", async (req, response) => {
  try {
    const summoner = req.params.summoner;
    const region = req.params.region;

    //getChampInfo(version).then((champInfo) => {
    getSummonerName2(summoner, region).then((summonerRes) => {
      Promise.all([
        getSummonerMasteries(summonerRes.id, region, champInfo),
        getRank2(summonerRes.id, region),
        getLive2(summonerRes.id, region),
        getSummonerMatches(summonerRes, region, queues, champInfo),
        getMatchList2(summonerRes.accountId, region),
      ]).then((res) => {
        response.json({
          summonerInfo: summonerRes,
          mastery: res[0],
          rank: res[1],
          live: res[2],
          matchHistory: res[3],
          matchList: res[4],
        });
      });
    });
    //});
  } catch (error) {
    console.log(error);
  }
});

app.get("/getMoreMatches/:gameIds/:summonerInfo/:region", async (req, res) => {
  const gameIds = JSON.parse(req.params.gameIds);
  const region = req.params.region;
  const summonerRes = req.params.summonerInfo;

  try {
    getMoreMatches(gameIds, summonerRes, region, queues, champInfo).then(
      (res) => res
    );
  } catch (error) {
    console.log(error);
  }
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  // Sends static folder
  app.use(express.static("frontend/build"));

  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });

  app.get("/*", function (req, res) {
    res.sendFile(
      path.join(__dirname, "./frontend/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
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