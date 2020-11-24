import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
;(function () {
  var cors_api_host = 'cors-anywhere.herokuapp.com'
  var cors_api_url = 'https://' + cors_api_host + '/'
  var slice = [].slice
  var origin = window.location.protocol + '//' + window.location.host
  var open = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function () {
    var args = slice.call(arguments)
    var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1])
    if (
      targetOrigin &&
      targetOrigin[0].toLowerCase() !== origin &&
      targetOrigin[1] !== cors_api_host
    ) {
      args[1] = cors_api_url + args[1]
    }
    return open.apply(this, args)
  }
})()

function App() {
  const [summonerInfo, setSummonerInfo] = useState({})

  const getSummonerName = async () => {
    const res = await axios.get(
      'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/mistahpig?api_key=RGAPI-7fde24cf-5990-45f9-81b9-d10de3363462'
    )
    setSummonerInfo(res.data)
  }

  getSummonerName()

  return (
    <div className='App'>
      Hello World
      <pre>{JSON.stringify(summonerInfo, null, 2)}</pre>
    </div>
  )
}

export default App
