import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from './leaderboard.module.css'

function Leaderboard() {
  const [solo, setSolo] = useState([])
  const [flex, setFlex] = useState([])

  const url = process.env.REACT_APP_API_URL || ''

  useEffect(() => {
    axios
      .get(`${url}/leaderboard/solo`)
      .then((res) => setSolo(res.data.entries))
    axios
      .get(`${url}/leaderboard/flex`)
      .then((res) => setFlex(res.data.entries))
  }, [])

  return <div></div>
}

export default Leaderboard
