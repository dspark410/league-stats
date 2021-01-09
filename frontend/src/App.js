import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Champions from "./pages/Champions";
import ChampionRotation from "./pages/ChampionRotation";
import Leaderboard from "./pages/Leaderboard";
import ChampionDetail from "./pages/ChampionDetail";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [summonerInfo, setSummonerInfo] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [champInfo, setChampInfo] = useState([]);
  const [version, setVersion] = useState();
  const [inputResponse, setInputResponse] = useState("");
  const [queues, setQueues] = useState([]);
  const [solo, setSolo] = useState([]);
  const [soloTier, setSoloTier] = useState([]);
  const [champDetail, setChampDetail] = useState();
  const [item, setItem] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);
  const [modalOpen, setModalOpen] = useState(false);

  // Reusable function for changing the Summoner in the whole app
  const getAccountInfo = (summonerName) => {
    const url = process.env.REACT_APP_API_URL || "";
    axios.get(`${url}/getSummonerName/${summonerName}`).then((res) => {
      if (!res.data.id) {
        // Message will be displayed on Home Screen, dissapears after 3 seconds
        setInputResponse(res.data);
        setTimeout(() => {
          setInputResponse("");
        }, 3000);
      } else {
        // Set summoner info which will be referenced by entire web app
        setSummonerInfo(res.data);

        //Set session data
        sessionStorage.setItem("summonerInfo", JSON.stringify(res.data));
        setRedirect(true);
      }
    });
  };

  // onClick that makes an axios call to retrieve the specific champion json using
  // event.target.name from mapped free champ images
  const selectChampion = (event) => {
    const getChamp = event.target.name;
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${getChamp}.json`
      )
      .then((res) => {
        setChampDetail(res.data.data[getChamp]);
        setModalOpen(true);
      });
  };

  // onClick for champion details that opens up modal
  // Will send championDetail into ModalState
  const championModal = () => {
    setModalOpen(true);
  };

  // onClick to close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL || "";
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
          .then((res) => {
            // Loop through Riot's champion.json array and keeps object values, in the form of an array
            // Store championArray into state
            setChampInfo(Object.values(res.data.data));
          });
        axios
          .get(
            `https://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/en_US/item.json`
          )
          .then((res) => {
            setItem(res.data.data);
          });
      });

    axios.get(`${url}/leaderboard/solo`).then(async (res) => {
      const boardArray = [];

      setSoloTier(res.data.tier);
      const soloPlayer = await res.data.entries.sort(
        (a, b) => b.leaguePoints - a.leaguePoints
      );
      await soloPlayer.slice(0, 5).map(
        async (player, i) =>
          await axios
            .get(`${url}/getSummonerId/${player.summonerId}`)
            .then((res) => {
              player.icon = res.data.profileIconId;
              player.number = i + 1;
              boardArray.push(player, i);
            })
      );
      setSolo(soloPlayer);
    });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = solo.slice(indexofFirstPost, indexOfLastPost);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // onChange for input field
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  // onSubmit for input form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      setInputResponse("Please Enter A Summoner Name!");
      setTimeout(() => {
        setInputResponse("");
      }, 3000);
    } else {
      getAccountInfo(inputValue);
    }
  };

  // Function to change displayed Summoner onClick in MatchHistoryCard to change Welcome Screen
  const getPlayerName = (e) => {
    const summonerName = e.target.getAttribute("name");
    getAccountInfo(summonerName);
  };

  const changeRedirect = () => {
    setRedirect(false);
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              redirect ? (
                <Redirect to="/welcome" />
              ) : (
                <Home
                  summonerInfo={summonerInfo}
                  inputValue={inputValue}
                  change={handleOnChange}
                  submit={handleSubmit}
                  inputResponse={inputResponse}
                  isAuthed={true}
                  champInfo={champInfo}
                  version={version}
                />
              )
            }
          />
          <Route
            path="/welcome"
            render={() => (
              <Welcome
                redirect={changeRedirect}
                summonerInfo={summonerInfo}
                champInfo={champInfo}
                isAuthed={true}
                version={version}
                getPlayerName={getPlayerName}
                queues={queues}
              />
            )}
          />
          <Route
            path="/champions"
            render={() => (
              <Champions
                champInfo={champInfo}
                version={version}
                champDetail={champDetail}
                selectChampion={selectChampion}
                modalState={modalOpen}
                openModal={championModal}
                closeModal={closeModal}
              />
            )}
          />
          <Route
            path="/championrotation"
            render={() => (
              <ChampionRotation
                champInfo={champInfo}
                version={version}
                champDetail={champDetail}
                selectChampion={selectChampion}
              />
            )}
          />
          <Route
            path="/leaderboard"
            render={() => (
              <Leaderboard
                version={version}
                solo={currentPosts}
                soloTier={soloTier}
                postsPerPage={postsPerPage}
                totalPosts={solo.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          />
          <Route
            path="/championdetail"
            render={() => (
              <ChampionDetail
                version={version}
                champDetail={champDetail}
                itemObj={item}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
