import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Home from "./pages/Home";
import { Welcome } from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import Champions from "./pages/Champions";
import Leaderboard from "./pages/Leaderboard";
import ChampionDetail from "./pages/ChampionDetail";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BrandBackground from "./components/images/brand.jpg";
import { regions as existRgn } from "./utils/constant";

function App() {
  const [summInfo, setSummInfo] = useState({});
  const [summonerInfo, setSummonerInfo] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [region, setRegion] = useState(
    JSON.parse(sessionStorage.getItem("region")) || "NA1"
  );
  const [existRegion, setExistRegion] = useState(true);
  const [champInfo, setChampInfo] = useState([]);

  const [champKeys, setChampKeys] = useState([]);
  const [latest, setLatest] = useState();
  const [version, setVersion] = useState();
  const [queues, setQueues] = useState([]);
  const [champDetail, setChampDetail] = useState();
  const [backupItem, setBackupItem] = useState();
  const [navVisibility, setNavVisibility] = useState(false);
  const [leaderboard, setLeaderBoard] = useState([]);
  const [leaderboardDiamondToIron, setLeaderBoardDiamondToIron] = useState([]);

  const [background, setBackground] = useState(BrandBackground);
  const [prevEntries, setPrevEntries] = useState(
    JSON.parse(localStorage.getItem("searchedSummoner")) || []
  );
  const [fade, setFade] = useState(false);
  const [showStorage, setShowStorage] = useState(true);
  const [hideAnimation, setHideAnimation] = useState(true);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);
  const [postsperPageDiamondToIron] = useState(41);

  const url = process.env.REACT_APP_API_URL || "";
  const endpoint = process.env.REACT_APP_API_ENDPOINT || "";
  // const inputRef = useRef();
  const history = useHistory();
  const location = useLocation();

  const getSummInfo = (summonerName, rgn) => {
    axios
      .get(`${endpoint}/getSummonerInfo/${summonerName}/${rgn}`)
      .then((res) => {
        setSummInfo(res.data);
      });
  };

  // Reusable function for changing the Summoner in the whole app
  const getAccountInfo = (summonerName, rgn) => {
    if (existRgn.includes(rgn)) {
      axios.get(`${url}/getSummonerName/${summonerName}/${rgn}`).then((res) => {
        if (!res.data.id) {
          // Message will be displayed on Home Screen, dissapears after 3 seconds
          setInputValue(res.data);
          setSummonerInfo({});
          setTimeout(() => {
            setInputValue("");
          }, 1000);
        }

        if (res.data.id) {
          const doNotAdd = prevEntries
            .map((entry) => {
              return (
                entry[0].includes(res.data.name) &&
                entry[1].includes(rgn.toUpperCase())
              );
            })
            .includes(true);

          if (!doNotAdd) {
            const prevEntriesArr = [...prevEntries];

            if (prevEntriesArr.length === 4) {
              prevEntriesArr.pop();
            }

            prevEntriesArr.unshift([
              res.data.name,
              rgn.toUpperCase(),
              res.data.profileIconId,
            ]);

            setPrevEntries(prevEntriesArr);
          }

          // Set summoner info which will be referenced by entire web app

          res.data.profileIconId = res.data.profileIconId.toString();
          setSummonerInfo(res.data);
          setRegion(rgn);

          //Set session data
          sessionStorage.setItem("summonerInfo", JSON.stringify(res.data));
          sessionStorage.setItem("region", JSON.stringify(rgn));
        }
      });
    }
  };

  const changeURL = (name, region) => {
    name &&
      region &&
      history.push(`/summoner/${region.toUpperCase()}/${name.toLowerCase()}`);
  };

  // onClick that makes an axios call to retrieve the specific champion json using
  // event.target.name from mapped free champ images
  const selectChampion = (event) => {
    const getChamp = event.target.getAttribute("name");

    sessionStorage.setItem("champion", getChamp);

    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${getChamp}.json`
      )
      .then((res) => {
        setChampDetail(res.data.data[getChamp]);

        history.replace(`champions/${getChamp.toLowerCase()}`);
      });
  };

  const showNav = () => {
    setNavVisibility(true);
  };

  const hideNav = () => {
    setNavVisibility(false);
  };

  const changeBackground = (url) => {
    setBackground(url);
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 500);
  };

  // onChange for input field
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  // onSubmit for input form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.getAttribute("value")) {
      getSummInfo(
        e.target.getAttribute("value"),
        e.target.getAttribute("region")
      );
      // changeURL(
      //   e.target.getAttribute("value"),
      //   e.target.getAttribute("region")
      // );

      handleBlur();
      setInputValue("");
      setRegion(e.target.getAttribute("region"));
    } else {
      if (inputValue.trim() === "") {
        return;
      } else {
        getSummInfo(inputValue, region);
        //changeURL(inputValue, region);
        handleBlur();

        setInputValue("");
      }
    }
  };

  // onChange for select menu
  const regionSelect = (e) => {
    setRegion(e.target.value);
  };

  // Function to remove a summoner from local storage onClick of the close button
  const removeSearchedSummoner = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const prevEntriesArr = [...prevEntries];

    const summonerName = e.target.getAttribute("value");
    const region = e.target.getAttribute("region");

    const remove = prevEntries.map((entry) => {
      return entry[0].includes(summonerName) && entry[1].includes(region);
    });

    const index = remove.indexOf(true);

    if (index > -1) {
      prevEntriesArr.splice(index, 1);
    }

    setPrevEntries(prevEntriesArr);
  };

  // Function to change displayed Summoner onClick in MatchHistoryCard to change Welcome Screen
  const getPlayerName = (e) => {
    const summonerName = e.target.getAttribute("name");
    const region = e.target.getAttribute("region");
    getSummInfo(summonerName, region);
    changeURL(summonerName, region);
  };

  const handleFocus = () => {
    setHideAnimation(true);
    setShowStorage(true);
  };

  const handleBlur = () => {
    setHideAnimation(false);
    setTimeout(() => {
      setShowStorage(false);
    }, 50);
  };

  const closeStorage = () => {
    setShowStorage(false);
  };

  const skeletonTrue = () => {
    setLoading(true);
  };

  const skeletonFalse = () => {
    setLoading(false);
  };

  const changeLeaderBoardPage = async (rank, division, page) => {
    let leaderboardData;

    await axios
      .get(`${url}/leaderboard/${region}/${rank}/${division}/${page}`)
      .then((res) => {
        res.data
          .sort((a, b) => b.leaguePoints - a.leaguePoints)
          .forEach((entry, i) => {
            entry.number = i + 1;
          });
        leaderboardData = res.data;
      })
      .then(() => {
        if (leaderboardData.length === 0) {
          setLeaderBoardDiamondToIron([]);
          return;
        }
        setLeaderBoardDiamondToIron(leaderboardData);
      });
  };

  const changeLeaderBoard = async (tier) => {
    let leaderboardData;

    await axios
      .get(`${url}/leaderboard/${tier}/${region}`)
      .then((res) => {
        res.data.entries
          .sort((a, b) => b.leaguePoints - a.leaguePoints)
          .forEach((entry, i) => {
            entry.tier = tier.toUpperCase();
            entry.number = i + 1;
          });

        leaderboardData = res.data;
      })
      .then(() => setLeaderBoard(leaderboardData.entries));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;

  const indexofLastPost2 = currentPage * postsperPageDiamondToIron;
  const indexofFirstPost2 = indexofLastPost2 - postsperPageDiamondToIron;

  const currentPosts = leaderboard.slice(indexofFirstPost, indexOfLastPost);

  const currenPostsDiamondToIron = leaderboardDiamondToIron.slice(
    indexofFirstPost2,
    indexofLastPost2
  );

  // change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const setPagetoOne = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    closeStorage();
    // Retrieve queueType list from Riot API
    axios.get(`${url}/queueType`).then((res) => setQueues(res.data));
    axios
      // Link to version list from Riot
      .get("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => {
        // Save current version into state
        setVersion(res.data[0]);
        axios
          .get(
            // Link to champion.json from Riot
            `https://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/en_US/champion.json`
          )
          .then((result) => {
            // Loop through Riot's champion.json array and keeps object values, in the form of an array
            // Store championArray into state
            setChampInfo(Object.values(result.data.data));
            setChampKeys(
              Object.keys(result.data.data).map((name) => name.toLowerCase())
            );

            axios
              .get(
                // Link to champion.json from Riot
                `https://ddragon.leagueoflegends.com/cdn/${res.data[4]}/data/en_US/champion.json`
              )
              .then((response) => {
                const latestArr = Object.values(result.data.data).filter(
                  (champ) => !Object.keys(response.data.data).includes(champ.id)
                );
                setLatest(latestArr);
              });
          });
        axios.get(`${url}/backupjson`).then((res) => {
          setBackupItem(res.data);
          sessionStorage.setItem("backupjson", JSON.stringify(res.data));
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getChamp = sessionStorage.getItem("champion");

    if (version && getChamp) {
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${getChamp}.json`
        )
        .then((res) => {
          setChampDetail(res.data.data[getChamp]);
        });
    }

    // Get champ name from URL to champions page
    const champName = location.pathname.split("/");

    if (
      champName[1].toLowerCase() === "champions" &&
      champName[2] &&
      version &&
      champInfo.length > 0
    ) {
      champInfo.forEach(async (champ) => {
        if (champ.id.toLowerCase() !== champName[2]) {
          return;
        } else {
          const promiseChamp = champ.id;

          await axios
            .get(
              `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${promiseChamp}.json`
            )
            .then((res) => {
              sessionStorage.setItem("champion", promiseChamp);
              setChampDetail(res.data.data[promiseChamp]);
            });
        }
      });
    } else if (champKeys.includes(champName)) {
      history.push("/champions");
    }
    // eslint-disable-next-line
  }, [version, champInfo]);

  useEffect(() => {
    let getChamp;
    if (sessionStorage.getItem("champion")) {
      getChamp = sessionStorage.getItem("champion").toLowerCase();
    }

    if (location.pathname.includes("summoner")) {
      const summoner = location.pathname.split("/")[3];
      const region = location.pathname.split("/")[2].toUpperCase();
      const extra = location.pathname.split("/")[4];
      setExistRegion(existRgn.includes(region));

      if (summoner !== undefined && region !== undefined) {
        getAccountInfo(summoner, region);
      }
      if (extra) {
        history.replace(`/summoner/${region}/${summoner}`);
      }
    }

    if (location.pathname.includes("champions")) {
      let champName;

      if (location.pathname.split("/")[2]) {
        champName = location.pathname.split("/")[2].toLowerCase();
      }

      const extra = location.pathname.split("/")[3];

      if (location.pathname === "/champions/Camille") {
        history.replace(`/champions/${champName}`);
      }
      if (location.pathname === "/champions/Ezreal") {
        history.replace(`/champions/${champName}`);
      }
      if (location.pathname === "/champions/Cassiopeia") {
        history.replace(`/champions/${champName}`);
      }
      if (location.pathname === "/champions/Illaoi") {
        history.replace(`/champions/${champName}`);
      }
      if (location.pathname === "/champions/Viego") {
        history.replace(`/champions/${champName}`);
      }
      if (location.pathname === "/champions/wukong") {
        history.replace(`/champions/monkeyking`);
      }

      if (champKeys.length > 0) {
        if (
          getChamp &&
          champKeys.includes(champName) &&
          champName !== getChamp.toLowerCase()
        ) {
          history.replace(`/champions/${champName.toLowerCase()}`);
        } else if (
          getChamp &&
          champName &&
          getChamp.toLowerCase() !== champName
        ) {
          history.replace(`/champions/${getChamp}`);
        }
      }

      if (extra) {
        history.replace(`/champions/${champName}`);
      }
    }

    // eslint-disable-next-line
  }, [location, champKeys]);

  useEffect(() => {
    if (summInfo.summonerInfo) {
      changeURL(summInfo.summonerInfo.name, region);
    }
    // eslint-disable-next-line
  }, [summInfo]);

  useEffect(() => {
    localStorage.setItem("searchedSummoner", JSON.stringify(prevEntries));
  }, [prevEntries]);

  return (
    <>
      {!fade ? (
        <div
          className={!fade && "backgroundContainerFade"}
          style={{ backgroundImage: `url(${background})` }}
        />
      ) : null}

      <div className={navVisibility ? "overlay" : null}>
        <div>
          <Navbar
            visibility={navVisibility}
            inputValue={inputValue}
            change={handleOnChange}
            submit={handleSubmit}
            isAuthed={true}
            version={version}
            hideNav={hideNav}
            prevSearches={prevEntries}
            removeSearchedSummoner={removeSearchedSummoner}
            regionSelect={regionSelect}
            region={region}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            hideAnimation={hideAnimation}
            showStorage={showStorage}
            skeletonTrue={skeletonTrue}
            skeletonFalse={skeletonFalse}
            summonerInfo={summonerInfo}
            // inputRef={inputRef}
          />

          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  summonerInfo={summonerInfo}
                  inputValue={inputValue}
                  change={handleOnChange}
                  submit={handleSubmit}
                  isAuthed={true}
                  champInfo={champInfo}
                  version={version}
                  hideNav={hideNav}
                  prevSearches={prevEntries}
                  removeSearchedSummoner={removeSearchedSummoner}
                  regionSelect={regionSelect}
                  region={region}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  hideAnimation={hideAnimation}
                  showStorage={showStorage}
                  closeStorage={closeStorage}
                  // inputRef={inputRef}
                />
              )}
            />
            <Route
              path="/summoner/:region/:summonerName"
              render={() =>
                summInfo.summonerInfo.id ? (
                  <Welcome
                    summonerInfo={summonerInfo}
                    champInfo={champInfo}
                    isAuthed={true}
                    version={version}
                    getPlayerName={getPlayerName}
                    queues={queues}
                    showNav={showNav}
                    selectChampion={selectChampion}
                    region={region}
                    loading={loading}
                    skeletonTrue={skeletonTrue}
                    skeletonFalse={skeletonFalse}
                    summInfo={summInfo}
                    setSummInfo={setSummInfo}
                  />
                ) : (
                  <NotFound showNav={showNav} noRegion={existRegion} />
                )
              }
            />
            <Route
              exact
              path="/champions"
              render={() => (
                <Champions
                  champInfo={champInfo}
                  latest={latest}
                  version={version}
                  champDetail={champDetail}
                  selectChampion={selectChampion}
                  showNav={showNav}
                  region={region}
                />
              )}
            />
            <Route
              exact
              path="/leaderboard"
              render={() => (
                <Leaderboard
                  version={version}
                  showNav={showNav}
                  changeLeaderBoard={changeLeaderBoard}
                  changeLeaderBoardPage={changeLeaderBoardPage}
                  leaderboard={currentPosts}
                  leaderboardDiamondToIron={currenPostsDiamondToIron}
                  postsPerPage={postsPerPage}
                  postsperPageDiamondToIron={postsperPageDiamondToIron}
                  totalPosts={leaderboard.length}
                  totalPosts2={leaderboardDiamondToIron.length}
                  paginate={paginate}
                  currentPage={currentPage}
                  region={region}
                  getPlayerName={getPlayerName}
                  fullLeaderboard={leaderboardDiamondToIron}
                  setPagetoOne={setPagetoOne}
                />
              )}
            />
            <Route
              path="/champions/:champion"
              render={() => (
                <ChampionDetail
                  version={version}
                  champDetail={champDetail}
                  itemObj={backupItem}
                  showNav={showNav}
                  changeBackground={changeBackground}
                />
              )}
            />
            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
