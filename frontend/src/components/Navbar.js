import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import style from './navbar.module.css'

function Navbar({ visibility }) {
  const [click, setClick] = useState(false)
  const [vis, setVis] = useState(visibility)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  useEffect(() => {
    setVis(visibility)
  }, [visibility])

  return (
    <>
      <nav className={style.navbar} style={{ display: !vis ? 'none' : 'flex' }}>
        <div className={style.navHeader}>
          <Link to='/' className={style.navbarLogo} onClick={closeMobileMenu}>
            League Stats
          </Link>
        </div>

        <div className={style.menuIcon} onClick={handleClick}>
          <i className={style.icon}>
            {click ? (
              <FaTimes className={style.faTimes} />
            ) : (
              <FaBars className={style.faBars} />
            )}{' '}
          </i>
        </div>
        <ul
          className={click ? `${style.navMenu} ${style.active}` : style.navMenu}
        >
          <li className={style.navItem}>
            <Link to='/' className={style.navLinks} onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className={style.navItem}>
            <Link
              to='/champions'
              className={style.navLinks}
              onClick={closeMobileMenu}
            >
              Champions
            </Link>
          </li>
          <li className={style.navItem}>
            <Link
              to='/leaderboard'
              className={style.navLinks}
              onClick={closeMobileMenu}
            >
              Leaderboard
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
