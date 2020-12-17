import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import Champions from './pages/Champions'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  const [summonerInfo, setSummonerInfo] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [champInfo, setChampInfo] = useState([])
  const [version, setVersion] = useState('')
  const [inputResponse, setInputResponse] = useState('')
  const [queues, setQueues] = useState([])

  // Reusable function for changing the Summoner in the whole app
  const getAccountInfo = (summonerName) => {
    const url = process.env.REACT_APP_API_URL || ''
    axios.get(`${url}/getSummonerName/${summonerName}`).then((res) => {
      if (!res.data.id) {
        // Message will be displayed on Home Screen, dissapears after 3 seconds
        setInputResponse(res.data)
        setTimeout(() => {
          setInputResponse('')
        }, 3000)
      } else {
        // Set summoner info which will be referenced by entire web app
        setSummonerInfo(res.data)

        //Set session data
        sessionStorage.setItem('summonerInfo', JSON.stringify(res.data))
        setRedirect(true)
      }
    })
  }

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL || ''
    // Retrieve queueType list from Riot API
    axios.get(`${url}/queueType`).then((res) => setQueues(res.data))
    axios
      // Link to version list from Riot
      .get('https://ddragon.leagueoflegends.com/api/versions.json')
      .then((res) => {
        // Save current version into state
        setVersion(res.data[0])
        axios
          .get(
            // Link to champion.json from Riot
            `http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/en_US/champion.json`
          )
          .then((res) => {
            // Loop through Riot's champion.json array and keeps object values, in the form of an array
            // Store championArray into state
            setChampInfo(Object.values(res.data.data))
          })
      })
  }, [])

  // onChange for input field
  const handleOnChange = (e) => {
    setInputValue(e.target.value)
  }

  // onSubmit for input form
  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue.trim() === '') {
      setInputResponse('Please Enter A Summoner Name!')
      setTimeout(() => {
        setInputResponse('')
      }, 3000)
    } else {
      getAccountInfo(inputValue)
    }
  }

  // Function to change displayed Summoner onClick in MatchHistoryCard to change Welcome Screen
  const getPlayerName = (e) => {
    const summonerName = e.target.getAttribute('name')
    getAccountInfo(summonerName)
  }

  return (
    <div className='App'>
      <Router>
        <Navbar />

        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              redirect ? (
                <Redirect to='/welcome' />
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
            path='/welcome'
            render={() => (
              <Welcome
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
            path='/champions'
            render={() => <Champions champInfo={champInfo} version={version} />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
