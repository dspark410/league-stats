import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Home from './pages/Home'
import { Welcome } from './pages/Welcome'
import NotFound from './pages/NotFound'
import Champions from './pages/Champions'
import Leaderboard from './pages/Leaderboard'
import ChampionDetail from './pages/ChampionDetail'
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BrandBackground from './components/images/brand.jpg'
import { regions as existRgn } from './utils/constant'

function App() {
  const [summInfo, setSummInfo] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [region, setRegion] = useState(
    JSON.parse(sessionStorage.getItem('region')) || 'NA1'
  )
  const [existRegion, setExistRegion] = useState(true)
  const [champInfo, setChampInfo] = useState([])
  const [nonExist, setNonExist] = useState(0)
  const [champKeys, setChampKeys] = useState([])
  const [latest, setLatest] = useState()
  const [version, setVersion] = useState()

  const [champDetail, setChampDetail] = useState()
  const [backupItem, setBackupItem] = useState()
  const [navVisibility, setNavVisibility] = useState(false)
  const [leaderboard, setLeaderBoard] = useState([])
  const [leaderboardDone, setLeaderboardDone] = useState(false)
  const [leaderboardDiamondToIron, setLeaderBoardDiamondToIron] = useState([])
  const [background, setBackground] = useState(BrandBackground)
  const [prevEntries, setPrevEntries] = useState(
    JSON.parse(localStorage.getItem('searchedSummoner')) || []
  )
  const [fade, setFade] = useState(false)
  const [showStorage, setShowStorage] = useState(true)
  const [hideAnimation, setHideAnimation] = useState(true)
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(25)
  const [postsperPageDiamondToIron] = useState(41)

  const url = process.env.REACT_APP_API_URL || ''
  const endpoint = process.env.REACT_APP_API_ENDPOINT || ''

  const history = useHistory()
  const location = useLocation()

  const getSummInfo = (summonerName, rgn) => {
    if (existRgn.includes(rgn)) {
      axios
        .get(`${endpoint}/getSummonerInfo/${summonerName}/${rgn}`)
        .then((res) => {
          if (res.data === 'summoner not found...') {
            // Message will be displayed on Home Screen, dissapears after 3 seconds
            setSummInfo({})
            if (location.pathname === '/') {
              setInputValue(res.data)
              setTimeout(() => {
                setInputValue('')
              }, 2000)
            }
            setNonExist((prev) => prev + 1)
          } else if (res.data.summonerInfo) {
            setLoading(true)
            setSummInfo(res.data)
            changeURL(res.data.summonerInfo.name, region)
            setNonExist(0)

            const doNotAdd = prevEntries
              .map((entry) => {
                return (
                  entry[0].includes(res.data.summonerInfo.name) &&
                  entry[1].includes(rgn.toUpperCase())
                )
              })
              .includes(true)

            if (!doNotAdd) {
              const prevEntriesArr = [...prevEntries]

              if (prevEntriesArr.length === 4) {
                prevEntriesArr.pop()
              }

              prevEntriesArr.unshift([
                res.data.summonerInfo.name,
                rgn.toUpperCase(),
                res.data.summonerInfo.profileIconId,
              ])

              setPrevEntries(prevEntriesArr)
            }

            res.data.summonerInfo.profileIconId = res.data.summonerInfo.profileIconId.toString()
            sessionStorage.setItem('region', JSON.stringify(rgn))
            setRegion(rgn)
          }
        })
    }
  }

  const changeURL = (name, region) => {
    name &&
      region &&
      history.push(`/summoner/${region.toUpperCase()}/${name.toLowerCase()}`)
  }

  // onClick that makes an axios call to retrieve the specific champion json using
  // event.target.name from mapped free champ images
  const selectChampion = (event) => {
    const getChamp = event.target.getAttribute('name')
    sessionStorage.setItem('champion', getChamp)

    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${getChamp}.json`
      )
      .then((res) => {
        history.replace(`champions/${getChamp.toLowerCase()}`)
        setChampDetail(res.data.data[getChamp])
      })
  }

  //change the background to the champion selected on champdetail page
  const changeBackground = (url) => {
    setBackground(url)
    setFade(true)
    setTimeout(() => {
      setFade(false)
    }, 500)
  }

  // onChange for input field
  const handleOnChange = (e) => {
    setInputValue(e.target.value)
  }

  // onSubmit for input form
  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target.getAttribute('value')) {
      getSummInfo(
        e.target.getAttribute('value'),
        e.target.getAttribute('region')
      )

      handleBlur()
      setInputValue('')
      setRegion(e.target.getAttribute('region'))
    } else {
      if (inputValue.trim() === '') {
        return
      } else {
        getSummInfo(inputValue, region)
        handleBlur()
        setInputValue('')
      }
    }
  }

  // onChange for select menu
  const regionSelect = (e) => {
    setRegion(e.target.value)
  }

  // Function to remove a summoner from local storage onClick of the close button
  const removeSearchedSummoner = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const prevEntriesArr = [...prevEntries]
    const summonerName = e.target.getAttribute('value')
    const region = e.target.getAttribute('region')

    const remove = prevEntries.map((entry) => {
      return entry[0].includes(summonerName) && entry[1].includes(region)
    })

    const index = remove.indexOf(true)

    if (index > -1) {
      prevEntriesArr.splice(index, 1)
    }

    setPrevEntries(prevEntriesArr)
  }

  // Function to change displayed Summoner onClick in MatchHistoryCard to change Welcome Screen
  const getPlayerName = (e) => {
    setLoading(true)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    const summonerName = e.target.getAttribute('name')
    const region = e.target.getAttribute('region')
    getSummInfo(summonerName, region)
  }

  // Show the recent seraches box
  const handleFocus = () => {
    setHideAnimation(true)
    setShowStorage(true)
  }

  // Hide the recent seraches box
  const handleBlur = () => {
    setHideAnimation(false)
    setTimeout(() => {
      setShowStorage(false)
    }, 50)
  }

  // axios call to change the leaderboard page from diamond to iron ranks
  const changeLeaderBoardDiamondToIron = async (rank, division, page) => {
    let leaderboardData

    await axios
      .get(`${url}/leaderboard/${region}/${rank}/${division}/${page}`)
      .then((res) => {
        res.data
          .sort((a, b) => b.leaguePoints - a.leaguePoints)
          .forEach((entry, i) => {
            entry.number = i + 1
          })
        leaderboardData = res.data
      })
      .then(() => {
        if (leaderboardData.length === 0) {
          setLeaderBoardDiamondToIron([])
          return
        }
        setLeaderBoardDiamondToIron(leaderboardData)
      })
  }
  // axios call to change the leaderboard page from challenger to master ranks
  const changeLeaderBoardChallengertoMaster = async (tier, region) => {
    let leaderboardData

    await axios
      .get(`${url}/leaderboard/${tier}/${region}`)
      .then((res) => {
        res.data.entries
          .sort((a, b) => b.leaguePoints - a.leaguePoints)
          .forEach((entry, i) => {
            entry.tier = tier.toUpperCase()
            entry.number = i + 1
          })

        leaderboardData = res.data
      })
      .then(() => {
        setLeaderBoard(leaderboardData.entries)
        setLeaderboardDone(true)
      })
  }

  //Challenger to Master pagination info
  const indexOfLastPost = currentPage * postsPerPage
  const indexofFirstPost = indexOfLastPost - postsPerPage

  const currentPosts = leaderboard.slice(indexofFirstPost, indexOfLastPost)

  //Diamond to iron pagination info
  const indexofLastPost2 = currentPage * postsperPageDiamondToIron
  const indexofFirstPost2 = indexofLastPost2 - postsperPageDiamondToIron

  const currenPostsDiamondToIron = leaderboardDiamondToIron.slice(
    indexofFirstPost2,
    indexofLastPost2
  )

  // change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    setShowStorage(false)

    // split the pathname to make axios call for summoner
    if (location.pathname.includes('summoner')) {
      const summoner = location.pathname.split('/')[3]
      const region = location.pathname.split('/')[2].toUpperCase()
      const extra = location.pathname.split('/')[4]
      setExistRegion(existRgn.includes(region))

      if (summoner !== undefined && region !== undefined) {
        getSummInfo(summoner, region)
      }
      if (extra) {
        history.replace(`/summoner/${region}/${summoner}`)
      }
    }

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
            setChampKeys(
              Object.keys(result.data.data).map((name) => name.toLowerCase())
            )

            axios
              .get(
                // Link to champion.json from Riot
                `https://ddragon.leagueoflegends.com/cdn/${res.data[4]}/data/en_US/champion.json`
              )
              .then((response) => {
                const latestArr = Object.values(result.data.data).filter(
                  (champ) => !Object.keys(response.data.data).includes(champ.id)
                )
                // set the latest champion into state for champion page
                setLatest(latestArr)
              })
          })
        axios.get(`${url}/backupjson`).then((res) => {
          //Save backupitem json for the champdetail page for rec builds
          setBackupItem(res.data)
          sessionStorage.setItem('backupjson', JSON.stringify(res.data))
        })
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    //get champion for session storage to setinto state when refreshing champdetail page
    const getChamp = sessionStorage.getItem('champion')

    if (version && getChamp) {
      const thisChamp = getChamp[0].toUpperCase() + getChamp.slice(1)
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${thisChamp}.json`
        )
        .then((res) => {
          setChampDetail(res.data.data[thisChamp])
        })
    }

    // Get champ name from URL to champions page
    const champName = location.pathname.split('/')

    if (
      champName[1].toLowerCase() === 'champions' &&
      champName[2] &&
      version &&
      champInfo.length > 0
    ) {
      champInfo.forEach(async (champ) => {
        if (champ.id.toLowerCase() !== champName[2]) {
          return
        } else {
          const promiseChamp = champ.id

          await axios
            .get(
              `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${promiseChamp}.json`
            )
            .then((res) => {
              sessionStorage.setItem('champion', promiseChamp)
              setChampDetail(res.data.data[promiseChamp])
            })
        }
      })
    } else if (champKeys.includes(champName)) {
      history.push('/champions')
    }
    // eslint-disable-next-line
  }, [version, champInfo])

  // useEffect for calling champions when entering into url
  useEffect(() => {
    let getChamp
    if (sessionStorage.getItem('champion')) {
      getChamp = sessionStorage.getItem('champion').toLowerCase()
    }

    if (location.pathname.includes('summoner')) {
      const region = location.pathname.split('/')[2]
      const summoner = location.pathname.split('/')[3]
      if (summInfo.summonerInfo) {
        if (summInfo.summonerInfo.name.toLowerCase() !== summoner) {
          setLoading(true)
          getSummInfo(summoner, region)
        }
      }
    }

    if (location.pathname.includes('champions')) {
      let champName

      if (location.pathname.split('/')[2]) {
        champName = location.pathname.split('/')[2].toLowerCase()
      }

      const extra = location.pathname.split('/')[3]

      if (location.pathname === '/champions/Camille') {
        history.replace(`/champions/${champName}`)
      }
      if (location.pathname === '/champions/Ezreal') {
        history.replace(`/champions/${champName}`)
      }
      if (location.pathname === '/champions/Cassiopeia') {
        history.replace(`/champions/${champName}`)
      }
      if (location.pathname === '/champions/Illaoi') {
        history.replace(`/champions/${champName}`)
      }
      if (location.pathname === '/champions/Viego') {
        history.replace(`/champions/${champName}`)
      }
      if (location.pathname === '/champions/wukong') {
        history.replace(`/champions/monkeyking`)
      }

      if (champKeys.length > 0) {
        if (
          getChamp &&
          champKeys.includes(champName) &&
          champName !== getChamp.toLowerCase()
        ) {
          const thisChamp = champName[0].toUpperCase() + champName.slice(1)

          axios
            .get(
              `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${thisChamp}.json`
            )
            .then((res) => {
              sessionStorage.setItem('champion', champName)

              setChampDetail(res.data.data[thisChamp])
              history.push(`/champions/${champName.toLowerCase()}`)
            })
        }
        // } else if (
        //   getChamp &&
        //   champName &&
        //   getChamp.toLowerCase() !== champName
        // ) {
        //   history.push(`/champions/${getChamp}`)
        //   console.log('inside elseif', champName)
        // }
      }

      if (extra === '' || extra) {
        history.push(`/champions/${champName}`)
      }
    }

    // if (location.pathname.includes('leaderboard')) {
    //   const extra = location.pathname.split('/')[1]
    //   if (extra === '' || extra) {
    //     history.push(`/leaderboard`)
    //   }
    // }
    // eslint-disable-next-line
  }, [location, champKeys])

  // resetting saved summoner searches after deleting or searching new summoner
  useEffect(() => {
    localStorage.setItem('searchedSummoner', JSON.stringify(prevEntries))
  }, [prevEntries])

  return (
    <>
      {!fade ? (
        <div
          className={!fade && 'backgroundContainerFade'}
          style={{ backgroundImage: `url(${background})` }}
        />
      ) : null}

      <div className={navVisibility ? 'overlay' : 'overlay2'}>
        <div>
          <Navbar
            visibility={navVisibility}
            inputValue={inputValue}
            change={handleOnChange}
            submit={handleSubmit}
            isAuthed={true}
            version={version}
            prevSearches={prevEntries}
            removeSearchedSummoner={removeSearchedSummoner}
            regionSelect={regionSelect}
            region={region}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            hideAnimation={hideAnimation}
            showStorage={showStorage}
            summInfo={summInfo}
          />

          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <Home
                  inputValue={inputValue}
                  change={handleOnChange}
                  submit={handleSubmit}
                  isAuthed={true}
                  champInfo={champInfo}
                  version={version}
                  hideNav={setNavVisibility}
                  prevSearches={prevEntries}
                  removeSearchedSummoner={removeSearchedSummoner}
                  regionSelect={regionSelect}
                  region={region}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  hideAnimation={hideAnimation}
                  showStorage={showStorage}
                  closeStorage={setShowStorage}
                />
              )}
            />
            <Route
              path='/summoner/:region/:summonerName'
              render={() =>
                summInfo.summonerInfo ? (
                  <Welcome
                    champInfo={champInfo}
                    isAuthed={true}
                    version={version}
                    getPlayerName={getPlayerName}
                    showNav={setNavVisibility}
                    selectChampion={selectChampion}
                    region={region}
                    loading={loading}
                    setLoading={setLoading}
                    summInfo={summInfo}
                    setSummInfo={setSummInfo}
                  />
                ) : (
                  <NotFound
                    nonExist={nonExist}
                    showNav={setNavVisibility}
                    noRegion={existRegion}
                  />
                )
              }
            />
            <Route
              exact
              path='/champions'
              render={() => (
                <Champions
                  champInfo={champInfo}
                  latest={latest}
                  version={version}
                  champDetail={champDetail}
                  selectChampion={selectChampion}
                  showNav={setNavVisibility}
                  region={region}
                />
              )}
            />
            <Route
              exact
              path='/leaderboard'
              render={() => (
                <Leaderboard
                  version={version}
                  showNav={setNavVisibility}
                  leaderboardDone={leaderboardDone}
                  changeLeaderBoardChallengertoMaster={
                    changeLeaderBoardChallengertoMaster
                  }
                  changeLeaderBoardDiamondToIron={
                    changeLeaderBoardDiamondToIron
                  }
                  setLeaderboardDone={setLeaderboardDone}
                  leaderboard={currentPosts}
                  leaderboardDiamondToIron={currenPostsDiamondToIron}
                  postsPerPage={postsPerPage}
                  postsperPageDiamondToIron={postsperPageDiamondToIron}
                  totalPosts={leaderboard.length}
                  totalPosts2={leaderboardDiamondToIron.length}
                  paginate={paginate}
                  currentPage={currentPage}
                  region={region}
                  getPlayerName={getPlayerName}
                  fullLeaderboard={leaderboardDiamondToIron}
                  setCurrentPage={setCurrentPage}
                />
              )}
            />
            <Route
              path='/champions/:champion'
              render={() => (
                <ChampionDetail
                  version={version}
                  champDetail={champDetail}
                  itemObj={backupItem}
                  showNav={setNavVisibility}
                  changeBackground={changeBackground}
                />
              )}
            />
            <Route
              render={() =>
                location.pathname.includes('champions') ? (
                  ''
                ) : (
                  <Redirect to={{ pathname: '/' }} />
                )
              }
            />
          </Switch>

          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
