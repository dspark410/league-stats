import React from 'react'
import styleHome from './forminputhome.module.css'
import styleNav from './forminputnav.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getInput } from '../redux/actions/inputActions'
import { AiOutlineSearch } from 'react-icons/ai'
import { regions } from '../utils/constant'

function FormInput({ handleSubmit, inputEl, handleOnBlur }) {
  const dispatch = useDispatch()

  const {
    input: {
      summonerInput: { name, region },
      nav,
    },
    leaderboard: { leaderboardLoading },
  } = useSelector((state) => state)

  const handleOnFocus = () => {
    dispatch(getInput('show'))
    dispatch(getInput('animateShow'))
  }

  return (
    <div className={nav ? styleNav.formContainer : styleHome.formContainer}>
      <form
        onSubmit={handleSubmit}
        className={nav ? styleNav.selectContainer : styleHome.selectContainer}>
        <select
          disabled={leaderboardLoading}
          className={
            nav && leaderboardLoading
              ? styleNav.selectContainerSelectDisabled
              : nav
              ? styleNav.selectContainerSelect
              : styleHome.selectContainerSelect
          }
          value={region}
          onChange={(e) =>
            dispatch(getInput('userInput', name, e.target.value))
          }>
          {regions.map((r, i) => (
            <option
              className={nav ? styleNav.regionOption : styleHome.regionOption}
              value={r}
              key={i}>
              {r.toUpperCase()}
            </option>
          ))}
        </select>
        <input
          className={nav ? styleNav.input : styleHome.input}
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
        className={nav ? styleNav.searchIcon : styleHome.searchIcon}
      />
    </div>
  )
}

export default FormInput
