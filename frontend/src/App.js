import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

function App() {
  const [summonerInfo, setSummonerInfo] = useState({})
  const [inputValue, setInputValue] = useState({})
  const [redirect, setRedirect] = useState(false)

  const handleOnChange = (e) => {
    console.log(e.target.value)
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .get(`http://localhost:5000/getSummonerName/${inputValue}`)
      .then((res) => {
        setSummonerInfo(res.data)
        setRedirect(true)
      })
  }

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) =>
              redirect ? (
                <Redirect to='/welcome' />
              ) : (
                <Home
                  {...props}
                  summonerInfo={summonerInfo}
                  inputValue={inputValue}
                  change={handleOnChange}
                  submit={handleSubmit}
                  isAuthed={true}
                />
              )
            }
          />
          <Route
            path='/welcome'
            render={(props) => (
              <Welcome {...props} summonerInfo={summonerInfo} isAuthed={true} />
            )}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App
