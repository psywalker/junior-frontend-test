import { useState, memo } from 'react'
import styles from './Filters.module.scss'
import ButtonCategory from '../Buttons/ButtonCategory'
import ButtonCategoryAll from '../Buttons/ButtonCategoryAll'
import Status from '../Status/Status'

const Filters = memo(({ allCategory, filterProducts, clearCategoryFilter, handleStatusLimited, handleStatusNew }) => {
  const [categoryIds, setCategoryIds] = useState([])

  const handleFiterProducts = (id, flag) => {
    const newCategoryIds = !flag ? [...categoryIds, id] : categoryIds.filter(categoryId => id !== categoryId)
    setCategoryIds(newCategoryIds)
    filterProducts(newCategoryIds)
  }
  const handleClearCategoryFilter = () => {
    setCategoryIds([])
    clearCategoryFilter()
  }
  const categoryButtons = allCategory.map(item => (
    <ButtonCategory
      key={item.id}
      {...item}
      handleFiterProducts={handleFiterProducts}
      categoryIds={categoryIds}
      pressed={categoryIds.includes(item.id)}
    />
  ))
  return (
    <article className={styles.filters}>
      <h2 className={styles.filtersTitle}>Filters</h2>
      <div className={styles.filtersSectionContainer} aria-labelledby="Filter by products">
        <section className={styles.filtersSection}>
          <h3 className={styles.filtersSectionTitle}>Category</h3>
          <div className={styles.filtersSectionContent}>
            <ButtonCategoryAll
              name="All"
              pressed={!categoryIds.length}
              handleClearCategoryFilter={handleClearCategoryFilter}
            />
            {categoryButtons}
          </div>
        </section>
        <section className={`${styles.filtersSection} ${styles.filtersSectionStatus}`}>
          <h3 className={styles.filtersSectionTitle}>Status</h3>
          <div className={styles.filtersSectionContent}>
            <Status label="Limited" handleStatus={handleStatusLimited} ariaLabelledby="label-status-limited" />
            <Status label="New" handleStatus={handleStatusNew} ariaLabelledby="label-status-new" />
          </div>
        </section>
      </div>
    </article>
  )
})

export default Filters
