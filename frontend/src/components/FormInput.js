import React from 'react'
import style from './forminput.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getInput } from '../redux/actions/inputActions'
import { AiOutlineSearch } from 'react-icons/ai'
import { regions } from '../utils/constant'

function FormInput({ handleSubmit, inputEl, handleOnBlur }) {
  const homeStyles = {
    padding: '11px 10px',
    fontSize: '16px',
    searchIconfontSize: '25px',
  }

  const navBarStyles = {
    padding: '9px 10px',
    fontSize: '14px',
    searchIconfontSize: '21px',
  }

  const dispatch = useDispatch()

  const {
    input: {
      summonerInput: { name, region },
    },
  } = useSelector((state) => state)

  const handleOnFocus = () => {
    dispatch(getInput('show'))
    dispatch(getInput('animateShow'))
  }

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit} className={style.selectContainer}>
        <select
          style={{
            padding: navBarStyles.padding,
            fontSize: navBarStyles.fontSize,
          }}
          className={style.selectContainerSelect}
          value={region}
          onChange={(e) =>
            dispatch(getInput('userInput', name, e.target.value))
          }>
          {regions.map((r, i) => (
            <option className={style.regionOption} value={r} key={i}>
              {r}
            </option>
          ))}
        </select>
        <input
          className={style.input}
          spellCheck='false'
          onChange={(e) =>
            dispatch(getInput('userInput', e.target.value, region))
          }
          type='text'
          placeholder='search summoner...'
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          value={name}
          ref={inputEl}
        />
      </form>
      <AiOutlineSearch
        onClick={handleSubmit}
        className={style.searchIcon}
        style={{ fontSize: navBarStyles.searchIconfontSize }}
      />
    </div>
  )
}

export default FormInput
