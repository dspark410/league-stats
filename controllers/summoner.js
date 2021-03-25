const axios = require('axios')

exports.getSummonerName = async (req, res) => {
  try {
    const summoner = encodeURIComponent(req.params.summoner)
    //console.log(req.params.summoner, summoner);
    const region = req.params.region
    const api = process.env.API_KEY
    const summonerData = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${api}`
    )

    res.json(summonerData.data)
  } catch (error) {
    console.log(error)
    res.send('summoner not found...')
  }
}
