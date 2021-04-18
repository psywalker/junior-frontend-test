import { memo } from 'react'
import styles from './ProductList.module.scss'
import LoadingOverlay from 'react-loading-overlay'
import Wheat1x from '../../images/Wheat@1x.png'
import Wheat2x from '../../images/Wheat@2x.png'
import Soybeans1x from '../../images/Soybeans@1x.png'
import Soybeans2x from '../../images/Soybeans@2x.png'
import Oats1x from '../../images/Oats@1x.png'
import Oats2x from '../../images/Oats@2x.png'
import Corn1x from '../../images/Corn@1x.png'
import Corn2x from '../../images/Corn@2x.png'
import Canola1x from '../../images/Canola@1x.png'
import Canola2x from '../../images/Canola@2x.png'
import Barley1x from '../../images/Barley@1x.png'
import Barley2x from '../../images/Barley@2x.png'

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
      return { src: `${Wheat1x}`, srcSet: `${Wheat1x}, ${Wheat2x}` }
    case 'Soybeans':
      return { src: `${Soybeans1x}`, srcSet: `${Soybeans1x}, ${Soybeans2x}` }
    case 'Oats':
      return { src: `${Oats1x}`, srcSet: `${Oats1x}, ${Oats2x}` }
    case 'Corn':
      return { src: `${Corn1x}`, srcSet: `${Corn1x}, ${Corn2x}` }
    case 'Canola':
      return { src: `${Canola1x}`, srcSet: `${Canola1x}, ${Canola2x}` }
    default:
      return { src: `${Barley1x}`, srcSet: `${Barley1x}, ${Barley2x}` }
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
