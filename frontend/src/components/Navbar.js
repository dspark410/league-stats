import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import { AiOutlineClose, AiFillHome } from 'react-icons/ai'
import { GiSwordman } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
// import Home from '../pages/Home'
// import Champion from '../pages/Champion'

function Navbar() {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiOutlineClose />
              </Link>
            </li>
            <li className='nav-text'>
              <Link to='/'>
                <AiFillHome />
                <span>Home</span>
              </Link>
            </li>
            <li className='nav-text'>
              <Link to='/champions'>
                <GiSwordman />
                <span>Champions</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar
