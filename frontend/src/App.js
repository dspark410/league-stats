import React, { useState, useEffect } from 'react'
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
  const [inputValue, setInputValue] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [champions, setChampions] = useState([])
  const [champInfo, setChampInfo] = useState([])
  const [version, setVersion] = useState('')

  useEffect(() => {
    axios
      .get('https://ddragon.leagueoflegends.com/api/versions.json')
      .then((res) => {
        setVersion(res.data[0])
      })
  }, [])

  useEffect(() => {
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
      )
      .then((res) => {
        setChampions(res.data.data)
      })
  }, [version])

  useEffect(() => {
    const champNameArray = Object.keys(champions)
    const championArray = Object.values(champions)

    const newArray = []

    for (let i = 0; i < champNameArray.length; i++) {
      const name = championArray[i].name
      const key = championArray[i].key
      const image = championArray[i].image.full.split('.')[0]
      const title = championArray[i].title
      const blurb = championArray[i].blurb
      const tags = championArray[i].tags

      const object = {
        name,
        key,
        image,
        title,
        blurb,
        tags,
      }

      newArray.push(object)
    }
    setChampInfo(newArray)
  }, [champions])

  const handleOnChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue.trim() === '') {
      console.log('Please enter something')
    } else {
      axios
        .get(`http://localhost:5000/getSummonerName/${inputValue}`)
        .then((res) => {
          if (res.data === 'Summoner not found') {
            console.log(res.data)
          } else {
            setSummonerInfo(res.data)

            //Set session data
            sessionStorage.setItem('summonerInfo', JSON.stringify(res.data))
            setRedirect(true)
          }
        })
    }
  }

  return (
    <Router>
      <div className='App'>
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
                  isAuthed={true}
                  champInfo={champInfo}
                  version={version}
                />
              )
            }
          />
          <Route
            path='/welcome'
            render={(props) => (
              <Welcome
                {...props}
                summonerInfo={summonerInfo}
                champInfo={champInfo}
                isAuthed={true}
                version={version}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App
