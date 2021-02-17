import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import Champions from './pages/Champions'
import ChampionRotation from './pages/ChampionRotation'
import Leaderboard from './pages/Leaderboard'
import ChampionDetail from './pages/ChampionDetail'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BrandBackground from './components/images/brand.jpg'

function App() {
  const [summonerInfo, setSummonerInfo] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [champInfo, setChampInfo] = useState([])
  const [latest, setLatest] = useState()
  const [version, setVersion] = useState()
  const [inputResponse, setInputResponse] = useState('')
  const [queues, setQueues] = useState([])
  const [champDetail, setChampDetail] = useState()
  const [backupItem, setBackupItem] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [navVisibility, setNavVisibility] = useState(false)
  const [leaderboard, setLeaderBoard] = useState([])
  const [background, setBackground] = useState(BrandBackground)
  const [prevEntries, setPrevEntries] = useState(
    JSON.parse(localStorage.getItem('searchedSummoner')) || []
  )

  const url = process.env.REACT_APP_API_URL || ''

  // Reusable function for changing the Summoner in the whole app

  const getAccountInfo = (summonerName) => {
    axios.get(`${url}/getSummonerName/${summonerName}`).then((res) => {
      if (!res.data.id) {
        // Message will be displayed on Home Screen, dissapears after 3 seconds
        setInputValue(res.data)

        setTimeout(() => {
          setInputValue('')
        }, 1000)
      }

      if (res.data.id) {
        if (!prevEntries.includes(summonerName)) {
          const prevEntriesArr = [...prevEntries]

          if (prevEntriesArr.length === 4) {
            prevEntriesArr.pop()
          }
          // if (inputValue !== '') {
          prevEntriesArr.unshift(summonerName)
          // }

          setPrevEntries(prevEntriesArr)
        }

        // Set summoner info which will be referenced by entire web app
        setSummonerInfo(res.data)

        //Set session data
        sessionStorage.setItem('summonerInfo', JSON.stringify(res.data))
        setRedirect(true)
      }
    })
  }

  // onClick that makes an axios call to retrieve the specific champion json using
  // event.target.name from mapped free champ images
  const selectChampion = (event) => {
    const getChamp = event.target.name

    sessionStorage.setItem('champion', getChamp)

    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${getChamp}.json`
      )
      .then((res) => {
        setChampDetail(res.data.data[getChamp])
        // setModalOpen(true)
      })
  }

  // onClick for champion details that opens up modal
  // Will send championDetail into ModalState
  const championModal = () => {
    setModalOpen(true)
  }

  // onClick to close modal
  const closeModal = () => {
    setModalOpen(false)
  }

  const showNav = () => {
    setNavVisibility(true)
  }

  const hideNav = () => {
    setNavVisibility(false)
  }

  const changeBackground = (url) => {
    setBackground(url)
  }

  useEffect(() => {
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
            `https://ddragon.leagueoflegends.com/cdn/${res.data[0]}/data/en_US/champion.json`
          )
          .then((result) => {
            // Loop through Riot's champion.json array and keeps object values, in the form of an array
            // Store championArray into state
            setChampInfo(Object.values(result.data.data))
            axios
              .get(
                // Link to champion.json from Riot
                `https://ddragon.leagueoflegends.com/cdn/${res.data[4]}/data/en_US/champion.json`
              )
              .then((response) => {
                const latestArr = Object.values(result.data.data).filter(
                  (champ) => !Object.keys(response.data.data).includes(champ.id)
                )
                setLatest(latestArr)
              })
          })
        axios.get(`${url}/backupjson`).then((res) => {
          setBackupItem(res.data)
          sessionStorage.setItem('backupjson', JSON.stringify(res.data))
        })
      })
    // if (prevEntries.length === 0) {
    //   setPrevEntries(['mistahpig', 'dambitwes'])
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getChamp = sessionStorage.getItem('champion')

    if (version && getChamp) {
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${getChamp}.json`
        )
        .then((res) => {
          setChampDetail(res.data.data[getChamp])
        })
    }
  }, [version])

  useEffect(() => {
    localStorage.setItem('searchedSummoner', JSON.stringify(prevEntries))
  }, [prevEntries])

  const changeLeaderBoard = (rank, division, page) => {
    axios
      .get(`${url}/leaderboard/${rank}/${division}/${page}`)
      .then(async (res) => {
        const leaderboardData = await res.data
        await leaderboardData.slice(0, 5).map((player) => {
          return axios
            .get(`${url}/getSummonerId/${player.summonerId}`)
            .then((res) => {
              console.log('profileicon', res.data)
              player.icon = res.data.profileIconId
            })
            .then(() => {
              console.log(leaderboardData)
              setLeaderBoard(leaderboardData)
            })
        })
      })
  }

  // onChange for input field
  const handleOnChange = (e) => {
    setInputValue(e.target.value)
  }

  // onSubmit for input form
  const handleSubmit = (e) => {
    e.preventDefault()

    if (e.target.getAttribute('value')) {
      getAccountInfo(e.target.getAttribute('value'))
      setInputValue('')
    } else {
      if (inputValue.trim() === '') {
        return
      } else {
        getAccountInfo(inputValue)
        setInputValue('')
      }
    }
  }

  // Function to remove a summoner from local storage onClick of the close button
  const removeSearchedSummoner = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const prevEntriesArr = [...prevEntries]
    const index = prevEntriesArr.indexOf(e.target.getAttribute('value'))

    if (index > -1) {
      prevEntriesArr.splice(index, 1)
    }

    setPrevEntries(prevEntriesArr)
  }

  // Function to change displayed Summoner onClick in MatchHistoryCard to change Welcome Screen
  const getPlayerName = (e) => {
    const summonerName = e.target.getAttribute('name')
    getAccountInfo(summonerName)
  }

  const changeRedirect = () => {
    setRedirect(false)
  }

  return (
    <div
      className='backgroundContainer'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={navVisibility ? 'overlay' : null}>
        <div>
          <Router>
            <Navbar visibility={navVisibility} />
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
                      hideNav={hideNav}
                      prevSearches={prevEntries}
                      removeSearchedSummoner={removeSearchedSummoner}
                    />
                  )
                }
              />
              <Route
                path='/welcome'
                render={() => (
                  <Welcome
                    redirect={changeRedirect}
                    summonerInfo={summonerInfo}
                    champInfo={champInfo}
                    isAuthed={true}
                    version={version}
                    getPlayerName={getPlayerName}
                    queues={queues}
                    showNav={showNav}
                  />
                )}
              />
              <Route
                path='/champions'
                render={() => (
                  <Champions
                    champInfo={champInfo}
                    latest={latest}
                    version={version}
                    champDetail={champDetail}
                    selectChampion={selectChampion}
                    modalState={modalOpen}
                    openModal={championModal}
                    closeModal={closeModal}
                    showNav={showNav}
                  />
                )}
              />
              <Route
                path='/championrotation'
                render={() => (
                  <ChampionRotation
                    champInfo={champInfo}
                    version={version}
                    champDetail={champDetail}
                    selectChampion={selectChampion}
                    modalState={modalOpen}
                    openModal={championModal}
                    closeModal={closeModal}
                    showNav={showNav}
                  />
                )}
              />
              <Route
                path='/leaderboard'
                render={() => (
                  <Leaderboard
                    version={version}
                    showNav={showNav}
                    changeLeaderBoard={changeLeaderBoard}
                    leaderboard={leaderboard}
                  />
                )}
              />
              <Route
                path='/championdetail'
                render={() => (
                  <ChampionDetail
                    version={version}
                    champDetail={champDetail}
                    itemObj={backupItem}
                    showNav={showNav}
                    changeBackground={changeBackground}
                  />
                )}
              />
            </Switch>
            <Footer />
          </Router>
        </div>
      </div>
    </div>
  )
}

export default App
