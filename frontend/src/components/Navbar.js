import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaCaretDown } from 'react-icons/fa'
import style from './navbar.module.css'
import Dropdown from './Dropdown'

function Navbar({ visibility }) {
  const [click, setClick] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [vis, setVis] = useState(visibility)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false)
    } else {
      setDropdown(true)
    }
  }

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false)
    } else {
      setDropdown(false)
    }
  }

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
          <li
            className={style.navItem}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='#'
              className={`${style.navLinks} ${style.noLink}`}
              onClick={closeMobileMenu}
            >
              Champions{''}
              <i>
                <FaCaretDown className={style.faCaretDown} />
              </i>
            </Link>
            {dropdown && <Dropdown />}
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
