import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  // const [summonerInfo, setSummonerInfo] = useState({})
  // const [inputValue, setInputValue] = useState({})

  // const handleOnChange = (e) => {
  //   console.log(e.target.value)
  //   setInputValue(e.target.value)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   axios
  //     .get(`http://localhost:5000/getSummonerName/${inputValue}`)
  //     .then((res) => {
  //       setSummonerInfo(res.data)
  //       console.log(res.data)
  //     })
  // }

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/welcome' component={Welcome} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
