import { useState, useEffect } from 'react'
import ProductList from './components/ProductList/ProductList'
import Header from './components/Header/Header'
import Filters from './components/Filters/Filters'
import { handleFetch } from './fetch'
import styles from './App.module.scss'

const initialFilter = {
  isNew: false,
  isLimited: false,
  search: '',
  category: [],
}

function App() {
  const [state, setState] = useState(initialFilter)
  const [productItems, setProductItems] = useState(null)
  const [allCategory, setAllCategory] = useState([])
  const [isFetchError, setIsFetchError] = useState(false)
  const [isFetch, setIsFetch] = useState(false)

  const filterProducts = categoryIds => setState({ ...state, category: categoryIds })
  const clearCategoryFilter = () => setState({ ...state, category: [] })
  const handleStatusLimited = () => setState({ ...state, isLimited: !state.isLimited })
  const handleStatusNew = () => setState({ ...state, isNew: !state.isNew })
  const handleSearch = value => setState({ ...state, search: value })

  useEffect(() => {
    handleFetch('category', setAllCategory)
  }, [])

  useEffect(() => {
    setIsFetch(true)
    setProductItems([])
    handleFetch('product?', setProductItems, setIsFetchError, setIsFetch, state)
  }, [state])

  return (
    <div className={styles.products}>
      <Header handleSearch={handleSearch} />
      <div className={styles.productsInner}>
        <Filters
          allCategory={allCategory}
          filterProducts={filterProducts}
          clearCategoryFilter={clearCategoryFilter}
          handleStatusLimited={handleStatusLimited}
          handleStatusNew={handleStatusNew}
        />
        <ProductList productItems={productItems?.results || []} isFetchError={isFetchError} isFetch={isFetch} />
      </div>
    </div>
  )
}

export default App
