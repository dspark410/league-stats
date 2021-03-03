import React, { useState, useEffect } from 'react'
import style from './paginate.module.css'

function Paginate({ postsPerPage, totalPosts, paginate, currentPage, rank }) {
  const [begin, setBegin] = useState(0)
  const [end, setEnd] = useState(10)

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  useEffect(() => {
    setBegin(0)
    setEnd(10)
    paginate(1)
  }, [rank])

  const next = () => {
    if (pageNumbers.length > end) {
      const start = begin
      setEnd((prev) => prev + 10)
      setBegin((prev) => prev + 10)
      paginate(start + 11)
    }
  }

  const before = () => {
    if (currentPage === 1 || end <= 10) {
      return
    }
    if (pageNumbers.length > begin && begin > 10) {
      setEnd((prev) => prev - 10)
      if (begin > 10) {
        const start = begin
        setBegin((prev) => prev - 10)

        paginate(start - 9)
      }
    } else if (begin <= 10) {
      setBegin(0)
      setEnd(10)
      paginate(1)
    }
  }

  const firstPage = () => {
    if (end <= 10 || currentPage === 1) {
      return
    }
    setBegin(0)
    setEnd(10)
    paginate(1)
  }

  const lastPage = () => {
    if (end < pageNumbers.length) {
      setEnd(Math.ceil(pageNumbers.length / 10) * 10)
      setBegin(Math.ceil(pageNumbers.length / 10) * 10 - 10)
      paginate(Math.ceil(pageNumbers.length / 10) * 10 - 9)
    }
  }

  return (
    <div>
      <ul className={style.ul}>
        <li
          onClick={firstPage}
          className={begin === 0 ? style.liNone : style.li}
        >
          &#60;&#60;
        </li>
        <li onClick={before} className={begin === 0 ? style.liNone : style.li}>
          &#60;
        </li>
        {pageNumbers.slice(begin, end).map((number) => (
          <li
            onClick={() => paginate(number)}
            className={`${style.li} ${currentPage === number && style.color} `}
            key={number}
          >
            {number}
          </li>
        ))}
        <li
          onClick={next}
          className={
            end === Math.ceil(pageNumbers.length / 10) * 10
              ? style.liNone
              : style.li
          }
        >
          &#62;
        </li>
        <li
          onClick={lastPage}
          className={
            end === Math.ceil(pageNumbers.length / 10) * 10
              ? style.liNone
              : style.li
          }
        >
          &#62;&#62;
        </li>
      </ul>
    </div>
  )
}

export default Paginate
