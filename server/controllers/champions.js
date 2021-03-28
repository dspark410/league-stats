const axios = require('axios')

// Call from frontend to retrieve free champion rotation for the week
exports.getFreeChamps = async (req, res) => {
  try {
    const region = req.params.region
    const api = process.env.API_KEY
    const rotationData = await axios.get(
      `https://${region}.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api}`
    )
    res.json(rotationData.data)
  } catch (error) {
    console.log(error)
  }
}
