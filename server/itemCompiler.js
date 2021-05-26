const axios = require('axios')
const fs = require('fs')

let version
let items
let oldItems

fs.readFile('./Items/backupItems.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  oldItems = JSON.parse(data)
})

const getItem = async (num) => {
  for (let i = num - 1; i >= 0; i--) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${version[i]}/data/en_US/item.json`
    )

    if (!oldItems) {
      oldItems = { ...res.data.data }
    }
    items = res.data.data
    Object.values(items).forEach((item) => {
      item['version'] = version[i]
    })
    if (oldItems['1001']) {
      Object.keys(items).forEach((item) => {
        oldItems[item] = items[item]
      })
    }
  }
}

const newJson = () => {
  fs.writeFile(
    './items/backupItems.json',
    JSON.stringify(oldItems, null, 4),
    (err) => {
      if (err) {
        console.log('Error occured', err)
      }
      console.log('New backup item.json created', items['1001'].version)
    }
  )
}

const init = async () => {
  const res = await axios.get(
    'https://ddragon.leagueoflegends.com/api/versions.json'
  )

  version = res.data.filter((num) => !num.includes('lolpatch'))

  if (oldItems) {
    console.log(oldItems['1001'].version)
    if (oldItems['1001'].version === version[0]) {
      console.log('No Change')
    } else {
      const start = version.indexOf(oldItems['1001'].version)
      await getItem(start)
      newJson()
    }
  } else {
    console.log('stuff changed')
    getItem(version.length)
    newJson()
  }
}

init()
