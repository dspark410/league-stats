import React, { useState, useEffect } from 'react'
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
    input: { nav, background, fade },
  } = useSelector((state) => state)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 1000)
  }, [nav])
  return (
    <>
      {loading && !fade ? (
        <div
          className='backgroundContainerFade'
          style={{ backgroundImage: `url(${background})` }}
        />
      ) : null}
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
    </>
  )
}

export default App
