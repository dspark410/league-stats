import React, { useState, useEffect, Suspense, lazy } from 'react'
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

const lazyHome = lazy(() => import('./pages/Home'))
const lazyWelcome = lazy(() => import('./pages/Welcome'))
const lazyChampions = lazy(() => import('./pages/Champions'))
const lazyChampionDetail = lazy(() => import('./pages/ChampionDetail'))
const lazyLeaderboard = lazy(() => import('./pages/Leaderboard'))

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
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route exact path='/' component={lazyHome} />
            <Route
              exact
              path='/summoner/:region/:summonerName'
              component={lazyWelcome}
            />
            <Route exact path='/champions' component={lazyChampions} />
            <Route
              exact
              path='/champions/:champion'
              component={lazyChampionDetail}
            />
            <Route exact path='/leaderboard' component={lazyLeaderboard} />
            <Redirect to='/' />
          </Switch>
        </Suspense>
        <Footer />
      </div>
    </>
  )
}

export default App
