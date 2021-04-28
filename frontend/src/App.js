import React, { useState, useEffect } from "react";
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
import BrandBackground from "./components/images/brand.jpg";

function App() {
  return (
    <div className={"overlay"}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/summoner/:region/:summonerName" component={Welcome} />
        <Route exact path="/champions" component={Champions} />
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route path="/champions/:champion" component={ChampionDetail} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
