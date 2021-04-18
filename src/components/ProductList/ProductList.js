import { memo } from 'react'
import styles from './ProductList.module.scss'
import LoadingOverlay from 'react-loading-overlay'

export const overlayStyles = () => ({
  wrapper: {
    position: 'absolute',
    width: 'calc(100% - 44px)',
    height: 'calc(100vh - 350px)',
    padding: '0',
    transition: 'all .3s',
    fontFamily: 'Montserrat, sansSerif',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    fontSize: '2.2em',
    fontFamily: 'Montserrat, sansSerif',
    color: '#000',
    fontWeight: 'bold',
    borderRadius: '10px',
    zIndex: 800,
    transition: 'opacity .3s ease-in',
    opacity: 0.7,
  },
  spinner: {
    '& svg': {
      width: '100px',
    },
    '& svg circle': {
      animation: 'animation-1v1uyfb 1.5s ease-in-out infinite',
      strokeDasharray: '1,200',
      strokeDashoffset: 0,
      strokeLinecap: 'round',
      stroke: '#000',
    },
  },
})

const productCardImg = categoryName => {
  switch (categoryName) {
    case 'Wheat':
      return { src: 'images/Wheat@1x.png', srcSet: '/images/Wheat@1x.png 1x, images/Wheat@1x.png 2x' }
    case 'Soybeans':
      return { src: 'images/Soybeans@1x.png', srcSet: '/images/Soybeans@1x.png 1x, images/Soybeans@1x.png 2x' }
    case 'Oats':
      return { src: 'images/Oats@1x.png', srcSet: 'images/Oats@1x.png 1x, images/Oats@1x.png 2x' }
    case 'Corn':
      return { src: 'images/Corn@1x.png', srcSet: 'images/Corn@1x.png 1x, images/Corn@1x.png 2x' }
    case 'Canola':
      return { src: 'images/Canola@1x.png', srcSet: 'images/Canola@1x.png 1x, images/Canola@1x.png 2x' }
    case 'Barley':
      return { src: 'images/Barley@1x.png', srcSet: 'images/Barley@1x.png 1x, images/Barley@1x.png 2x' }
    default:
  }
}
const ProductList = memo(({ productItems, isFetch, isFetchError }) => {
  const productCards = productItems.map(
    ({ id, isLimited, isNew, price, name, categoryName, description, discount }) => (
      <li className={styles.productCardItem} key={id}>
        <div className={styles.statusBadges}>
          {isLimited && <span className={`${styles.statusBadge} ${styles.statusBadgeLimited}`}>Limited</span>}
          {isNew && <span className={`${styles.statusBadge} ${styles.statusBadgeNew}`}>New</span>}
        </div>
        <div className={styles.productCardContent}>
          <div className={styles.productCardImg}>
            <img {...productCardImg(categoryName)} alt={categoryName} />
          </div>
          <div className={styles.productCardDescContainer}>
            <span className={styles.productCardCategoryName}>{categoryName}</span>
            <h3 className={styles.productCardName}>{name}</h3>
            <p className={styles.productCardDescription}>{description}</p>
            <p className={styles.productCardPriceContainer}>
              <span className={styles.productCardPrice}>${price}</span>
              <span className={styles.productCardDiscount}>{discount}</span>
            </p>
          </div>
        </div>
      </li>
    )
  )
  const fetchErrorMessage = 'Ошибка сервера. Попробуйте обновить страницу.'
  return (
    <main className={styles.productList} role="main">
      {isFetch && <LoadingOverlay active={isFetch} spinner text="Загрузка продуктов..." styles={overlayStyles()} />}
      {!isFetchError && (
        <ul className={styles.productCard} aria-labelledby="Product list">
          {productCards}
        </ul>
      )}
      {isFetchError && <p className={styles.fetchErrorMessage}>{fetchErrorMessage}</p>}
    </main>
  )
})

export default ProductList
