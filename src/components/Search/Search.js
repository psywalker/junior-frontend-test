import { useState, memo } from 'react'
import styles from './Search.module.scss'
import debounce from 'lodash/debounce'

const Search = memo(({ handleSearch }) => {
  const [value, setValue] = useState('')

  const handleSubmit = event => {
    const { value } = event.target
    event.nativeEvent.stopImmediatePropagation()
    setValue(value)
    handleSearch(value)
  }

  return (
    <form className={styles.search} role="search" aria-label="Products search form">
      <button
        className={styles.searchButton}
        type="button"
        onClick={debounce(() => {
          if (value) handleSearch(value)
        }, 600)}
      >
        <img
          className={styles.searchButtonIcon}
          src="images/searchIcon.svg"
          width="17"
          height="17"
          alt="Search button"
        />
      </button>
      <input
        className={styles.searchInput}
        type="search"
        onChange={debounce(handleSubmit, 600)}
        placeholder="Search among products"
      />
    </form>
  )
})

export default Search
