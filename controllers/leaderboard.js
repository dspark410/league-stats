const axios = require('axios')

exports.getSummonerId = async (req, res) => {
  try {
    const summoner = req.params.summoner
    const region = req.params.region
    const api = process.env.API_KEY
    const summonerData = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summoner}?api_key=${api}`
    )
    res.json(summonerData.data)
  } catch (error) {
    console.log(error)
    res.send('Summoner not found...')
  }
}
