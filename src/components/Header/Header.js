import styles from './Header.module.scss'
import Search from '../Search/Search'

const Header = ({ handleSearch }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <h1 className={styles.mainTitle}>Products</h1>
        <Search handleSearch={handleSearch} />
      </div>
    </header>
  )
}

export default Header
