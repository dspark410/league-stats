import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [summonerInfo, setSummonerInfo] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [champInfo, setChampInfo] = useState([]);
  const [version, setVersion] = useState("");
  const [inputResponse, setInputResponse] = useState("");

  // Reusable function for changing the Summoner in the whole app
  const getAccountInfo = (summonerName) => {
    axios
      .get(`http://localhost:5000/getSummonerName/${summonerName}`)
      .then((res) => {
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

  useEffect(() => {
    axios
      // Link to version list from Riot
      .get("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((res) => {
        // Save current version into state
        setVersion(res.data[0]);
        axios
          .get(
            // Link to champion.json from Riot
            `http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/en_US/champion.json`
          )
          .then((res) => {
            // Loop through Riot's champion.json array and keeps object values, in the form of an array
            // Store championArray into state
            setChampInfo(Object.values(res.data.data));
          });
      });
  }, []);

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

  return (
    <Router>
      <div className="App">
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
            render={(props) => (
              <Welcome
                {...props}
                summonerInfo={summonerInfo}
                champInfo={champInfo}
                isAuthed={true}
                version={version}
                getPlayerName={getPlayerName}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
