import React, { useState } from 'react'
import axios from 'axios'
import './home.css'

function Home() {
  const [summonerInfo, setSummonerInfo] = useState({})
  const [inputValue, setInputValue] = useState({})

  const handleOnChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .get(`http://localhost:5000/getSummonerName/${inputValue}`)
      .then((res) => {
        setSummonerInfo(res.data)
        console.log(res.data)
      })
  }

  return (
    <div className='home-background-container'>
      <div className='home-container'>
        <h1>Enter Summoner Name</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={handleOnChange} type='text' />
        </form>
        <h1>{summonerInfo.name}</h1>
      </div>
    </div>
  )
}

export default Home
