import React, { useEffect } from 'react'

function MasteryCard({ mastery, champions, loading }) {
  useEffect(() => {
    const getChampionKey = () => {
      const championArr = Object.values(champions)
      const keyArr = championArr.map((champion) => {
        return +champion.key
      })
      console.log(keyArr)
      //console.log('champion mastery id', mastery[0].championId)
      //   if (mastery) {

      //     const filteredKey = keyArr.filter((key) => {
      //       if (key === mastery[0].championId) {
      //         console.log(filteredKey)
      //       }
      //     })
      //   }
    }
    getChampionKey()
  }, [champions])

  return (
    <div>
      <div>{loading ? '' : mastery[0].championPoints}</div>
      <div>{loading ? '' : mastery[1].championPoints}</div>
      <div>{loading ? '' : mastery[2].championPoints}</div>
    </div>
  )
}

export default MasteryCard
