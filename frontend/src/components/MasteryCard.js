import React from 'react'
import style from './masterycard.module.css'

function MasteryCard({ filteredChamps, loading }) {
  return (
    <div className={style.masteryCardContainer}>
      <div>
        {loading ? (
          ''
        ) : (
          <img
            alt={filteredChamps[0].image}
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${filteredChamps[0].image}_0.jpg`}
          />
        )}
        <div>{loading ? '' : filteredChamps[0].name}</div>
        <div>{loading ? '' : filteredChamps[0].points}</div>
        <div> {loading ? '' : filteredChamps[0].level}</div>
      </div>
      <div>
        {loading ? (
          ''
        ) : (
          <img
            alt={filteredChamps[1].image}
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${filteredChamps[1].image}_0.jpg`}
          />
        )}
        <div>{loading ? '' : filteredChamps[1].name}</div>
        <div>{loading ? '' : filteredChamps[1].points}</div>
        <div> {loading ? '' : filteredChamps[1].level}</div>
      </div>
      <div>
        {loading ? (
          ''
        ) : (
          <img
            alt={filteredChamps[2].image}
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${filteredChamps[2].image}_0.jpg`}
          />
        )}
        <div>{loading ? '' : filteredChamps[2].name}</div>
        <div>{loading ? '' : filteredChamps[2].points}</div>
        <div> {loading ? '' : filteredChamps[2].level}</div>
      </div>
    </div>
  )
}

export default MasteryCard
