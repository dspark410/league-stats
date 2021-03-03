import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Home from "./pages/Home";
import { Welcome } from "./pages/Welcome";
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

function App() {
  const [summonerInfo, setSummonerInfo] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [region, setRegion] = useState(
    JSON.parse(sessionStorage.getItem("region")) || "NA1"
  );
  const [redirect, setRedirect] = useState(false);
  const [champInfo, setChampInfo] = useState([]);
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
  const sessionData = JSON.parse(sessionStorage.getItem("summonerInfo"));
  const url = process.env.REACT_APP_API_URL || "";
  let source = axios.CancelToken.source();

  // const inputRef = useRef();
  const history = useHistory();
  const location = useLocation();

  // Reusable function for changing the Summoner in the whole app
  const getAccountInfo = (summonerName, rgn) => {
    setTimeout(() => {
      source.cancel();
    }, 3000);
    axios
      .get(`${url}/getSummonerName/${summonerName}/${rgn}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (!res.data.id) {
          // Message will be displayed on Home Screen, dissapears after 3 seconds
          setInputValue(res.data);

          setTimeout(() => {
            setInputValue("");
          }, 1000);
        }

        if (res.data.id) {
          const doNotAdd = prevEntries
            .map((entry) => {
              return entry[0].includes(res.data.name) && entry[1].includes(rgn);
            })
            .includes(true);

          if (!doNotAdd) {
            const prevEntriesArr = [...prevEntries];

            if (prevEntriesArr.length === 4) {
              prevEntriesArr.pop();
            }

            prevEntriesArr.unshift([
              res.data.name,
              rgn,
              res.data.profileIconId,
            ]);

            setPrevEntries(prevEntriesArr);
          }

          // Set summoner info which will be referenced by entire web app

          setSummonerInfo(res.data);

          setRegion(rgn);
          setRedirect(true);

          history.push(
            `/summoner/${rgn.toLowerCase()}/${res.data.name.toLowerCase()}`
          );

          //Set session data
          sessionStorage.setItem("summonerInfo", JSON.stringify(res.data));
          sessionStorage.setItem("region", JSON.stringify(rgn));

          setTimeout(() => {
            setRedirect(false);
          }, 100);
        }
      });
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

        history.replace(`championdetail/${getChamp.toLowerCase()}`);
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
      getAccountInfo(
        e.target.getAttribute("value"),
        e.target.getAttribute("region"),
        e.target.getAttribute("icon")
      );
      handleBlur();
      setInputValue("");
      setRegion(e.target.getAttribute("region"));
    } else {
      if (inputValue.trim() === "") {
        return;
      } else {
        // if (
        //   summonerInfo.name
        //     ? summonerInfo.name &&
        //       history.location.pathname.includes('summoner')
        //     : sessionData.name &&
        //       sessionData.name &&
        //       history.location.pathname.includes('summoner')
        // ) {
        //   if (
        //     summonerInfo.name
        //       ? summonerInfo.name.toLowerCase().split(' ').join() ===
        //         inputValue.toLowerCase().split(' ').join()
        //       : sessionData.name &&
        //         sessionData.name.toLowerCase().split(' ').join() ===
        //           inputValue.toLowerCase().split(' ').join()
        //   ) {
        //     setInputValue('')
        //     return
        //   }
        // }

        getAccountInfo(inputValue, region);
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
    const icon = e.target.getAttribute("icon");
    getAccountInfo(summonerName, region, icon);
  };

  const changeRedirect = () => {
    setRedirect(false);
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
    setTimeout(() => {
      source.cancel();
    }, 3000);
    await axios
      .get(`${url}/leaderboard/${region}/${rank}/${division}/${page}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        res.data
          .sort((a, b) => b.leaguePoints - a.leaguePoints)
          .forEach((entry, i) => {
            entry.number = i + 1;
          });
        leaderboardData = res.data;
      });
    return Promise.all(
      leaderboardData.slice(0, 5).map((player) => {
        return axios
          .get(`${url}/getSummonerId/${player.summonerId}/${region}`)
          .then((res) => {
            player.icon = res.data.profileIconId;
          });
      })
    ).then(() => {
      if (leaderboardData.length === 0) {
        setLeaderBoardDiamondToIron([]);
        return;
      }
      setLeaderBoardDiamondToIron(leaderboardData);
    });
  };

  const changeLeaderBoard = async (tier) => {
    let leaderboardData;
    setTimeout(() => {
      source.cancel();
    }, 3000);
    await axios
      .get(`${url}/leaderboard/${tier}/${region}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        res.data.entries
          .sort((a, b) => b.leaguePoints - a.leaguePoints)
          .forEach((entry, i) => {
            entry.tier = tier.toUpperCase();
            entry.number = i + 1;
          });

        leaderboardData = res.data;
      });
    return Promise.all(
      leaderboardData.entries.slice(0, 5).map((player) => {
        return axios
          .get(`${url}/getSummonerId/${player.summonerId}/${region}`)
          .then((res) => {
            player.icon = res.data.profileIconId;
          });
      })
    ).then(() => setLeaderBoard(leaderboardData.entries));
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

  useEffect(() => {
    closeStorage();
    // Retrieve queueType list from Riot API
    axios.get(`${url}/queueType`).then((res) => setQueues(res.data));
    axios
      // Link to version list from Riot
      .get("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => {
        // Save current version into state
        setVersion(res.data[1]);
        axios
          .get(
            // Link to champion.json from Riot
            `https://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/en_US/champion.json`
          )
          .then((result) => {
            // Loop through Riot's champion.json array and keeps object values, in the form of an array
            // Store championArray into state
            setChampInfo(Object.values(result.data.data));

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

    // Get champ name from URL to championdetail page
    const champName = window.location.href.split("/");

    if (
      champName[3].toLowerCase() === "championdetail" &&
      champName[4] &&
      version &&
      champInfo.length > 0
    ) {
      champInfo.forEach(async (champ) => {
        if (champ.id.toLowerCase() !== champName[4]) {
          return;
        } else {
          const promiseChamp = champ.id;

          await axios
            .get(
              `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${promiseChamp}.json`
            )
            .then((res) => {
              setChampDetail(res.data.data[promiseChamp]);
            });
        }
      });
    }
  }, [version, champInfo]);

  // useEffect(() => {
  //   if (location.pathname.includes("summoner")) {
  //     const summonerCall = decodeURIComponent(location.pathname).split("/");

  //     if (
  //       `/summoner/na1/${summonerInfo.name.toLowerCase()} ` !== summonerCall
  //     ) {
  //       getAccountInfo(summonerCall[3], summonerCall[2].toUpperCase());
  //     }
  //   }
  // }, [location]);

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
          {summonerInfo?.name ? (
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
          ) : sessionData?.name ? (
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
              summonerInfo={sessionData}
              // inputRef={inputRef}
            />
          ) : null}
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                redirect ? (
                  <Redirect
                    to={`/summoner/${region.toLowerCase()}/${
                      summonerInfo.name
                        ? summonerInfo.name.toLowerCase()
                        : sessionData.name.toLowerCase()
                    } `}
                  />
                ) : (
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
                )
              }
            />
            <Route
              path="/summoner/:region/:summonerName"
              render={() => (
                <Welcome
                  redirect={changeRedirect}
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
                />
              )}
            />
            <Route
              path="/champions"
              render={() =>
                redirect ? (
                  <Redirect
                    to={`/summoner/${region.toLowerCase()}/${
                      summonerInfo.name
                        ? summonerInfo.name.toLowerCase()
                        : sessionData.name.toLowerCase()
                    } `}
                  />
                ) : (
                  <Champions
                    champInfo={champInfo}
                    latest={latest}
                    version={version}
                    champDetail={champDetail}
                    selectChampion={selectChampion}
                    showNav={showNav}
                    region={region}
                  />
                )
              }
            />
            <Route
              path="/leaderboard"
              render={() =>
                redirect ? (
                  <Redirect
                    to={`/summoner/${region.toLowerCase()}/${
                      summonerInfo.name
                        ? summonerInfo.name.toLowerCase()
                        : sessionData.name.toLowerCase()
                    } `}
                  />
                ) : (
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
                  />
                )
              }
            />
            <Route
              path="/championdetail"
              render={() =>
                redirect ? (
                  <Redirect
                    to={`/summoner/${region.toLowerCase()}/${
                      summonerInfo.name
                        ? summonerInfo.name.toLowerCase()
                        : sessionData.name.toLowerCase()
                    } `}
                  />
                ) : (
                  <ChampionDetail
                    version={version}
                    champDetail={champDetail}
                    itemObj={backupItem}
                    showNav={showNav}
                    changeBackground={changeBackground}
                  />
                )
              }
            />
          </Switch>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
