import { memo } from 'react'
import styles from './Buttons.module.scss'

const ButtonCategory = memo(({ id, name, handleFiterProducts, pressed }) => {
  const buttonClass = pressed ? `${styles.button} ${styles.buttonPress}` : styles.button

  return (
    <button
      className={buttonClass}
      onClick={() => {
        handleFiterProducts(id, pressed)
      }}
    >
      {name}
    </button>
  )
})

export default ButtonCategory
