import React from 'react'
import style from './pagination.module.css'

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <ul className={style.ul}>
        {pageNumbers.map((number) => (
          <li className={style.li} key={number}>
            <a onClick={() => paginate(number)} href='leaderboard'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
