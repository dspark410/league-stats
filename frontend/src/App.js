/** @format */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Home from "./pages/Home";
import { Welcome } from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import Champions from "./pages/Champions";
import Leaderboard from "./pages/Leaderboard";
import ChampionDetail from "./pages/ChampionDetail";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const {
    input: { nav, background },
  } = useSelector((state) => state);

  return (
    <div
      className={`backgroundContainerFade`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={nav ? "overlay" : "overlay2"}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/summoner/:region/:summonerName" component={Welcome} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          {/* <Route exact path="/champions" component={Champions} />
        <Route path="/champions/:champion" component={ChampionDetail} /> */}
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
