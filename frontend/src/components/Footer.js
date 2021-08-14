import React from 'react'
import style from './footer.module.css'

function Footer() {
  return (
    <div className={style.footerContainer}>
      <div className={style.footer}>
        league-stats.com isn't endorsed by Riot Games and doesn't reflect the
        views or opinions of Riot Games or anyone officially involved in
        producing or managing Riot Games properties. Riot Games, and all
        associated properties are trademarks or registered trademarks of Riot
        Games, Inc.
      </div>
    </div>
  )
}

export default Footer
