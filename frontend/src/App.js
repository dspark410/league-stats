import React from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import Champions from './pages/Champions'
import ChampionDetail from './pages/ChampionDetail'
import Leaderboard from './pages/Leaderboard'
import Footer from './components/Footer'

function App() {
  const {
    input: { nav, background },
  } = useSelector((state) => state)

  return (
    <div
      className={`backgroundContainerFade`}
      style={{ backgroundImage: `url(${background})` }}>
      <div className={nav ? 'overlay' : 'overlay2'}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            exact
            path='/summoner/:region/:summonerName'
            component={Welcome}
          />
          <Route exact path='/champions' component={Champions} />
          <Route exact path='/champions/:champion' component={ChampionDetail} />
          <Route exact path='/leaderboard' component={Leaderboard} />
          <Redirect to='/' />
        </Switch>
        <Footer />
      </div>
    </div>
  )
}

export default App
