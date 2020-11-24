import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [summonerInfo, setSummonerInfo] = useState({});

  const clickHandler = () => {
    axios.get("http://localhost:5000/getSummonerName").then((res) => {
      setSummonerInfo(res.data);
    });
  };

  return (
    <div className="App">
      Hello World
      <pre>{JSON.stringify(summonerInfo, null, 2)}</pre>
      <button onClick={clickHandler}>Click</button>
    </div>
  );
}

export default App;
