import React from 'react'
import style from './pagination.module.css'

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <ul className={style.ul}>
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            className={`${style.li} ${currentPage === number && style.color} `}
            key={number}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
