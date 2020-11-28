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
  const [inputValue, setInputValue] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [champions, setChampions] = useState([]);
  const [champInfo, setChampInfo] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion.json"
      )
      .then((res) => {
        setChampions(res.data.data);
      });
  }, []);

  useEffect(() => {
    const champNameArray = Object.keys(champions);
    const championArray = Object.values(champions);

    const newArray = [];

    for (let i = 0; i < champNameArray.length; i++) {
      const name = championArray[i].name;
      const key = championArray[i].key;
      const image = championArray[i].image.full.split(".")[0];

      const object = {
        name,
        key,
        image,
      };

      newArray.push(object);
    }
    setChampInfo(newArray);
  }, [champions]);

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5000/getSummonerName/${inputValue}`)
      .then((res) => {
        setSummonerInfo(res.data);

        //Set session data
        sessionStorage.setItem("summonerInfo", JSON.stringify(res.data));
        setRedirect(true);
      });
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
                  isAuthed={true}
                  champInfo={champInfo}
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
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
