import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaCaretDown, FaHome } from 'react-icons/fa'
import './Navbar.css'
import Dropdown from './Dropdown'

function Navbar() {
  const [click, setClick] = useState(false)
  const [dropdown, setDropdown] = useState(false)

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

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          League Stats
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className='icon'>
            {click ? (
              <FaTimes className='fa-times' />
            ) : (
              <FaBars className='fa-bars' />
            )}{' '}
          </i>
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/champions'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Champions{' '}
              <i>
                <FaCaretDown className='fa-caret-down' />{' '}
              </i>
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link
              to='/leaderboard'
              className='nav-links'
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
