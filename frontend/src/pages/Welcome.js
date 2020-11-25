import React, { useState } from 'react'
import './welcome.css'
import axios from 'axios'

function Welcome({ summonerInfo }) {
  const [mastery, setMastery] = useState([])

  const handleClick = () => {
    axios
      .get(`http://localhost:5000/summoner/${summonerInfo.id}`)
      .then((res) => {
        setMastery(res.data)
        console.log(res.data)
      })
  }

  return (
    <div className='welcome-background-container'>
      <div className='welcome-container'>
        <div>
          <h1>Welcome {summonerInfo.name}</h1>
          <button onClick={handleClick}>Get info</button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
