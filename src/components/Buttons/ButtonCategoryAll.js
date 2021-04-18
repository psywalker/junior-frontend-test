import { memo } from 'react'
import styles from './Buttons.module.scss'

const ButtonCategoryAll = memo(({ name, handleClearCategoryFilter, pressed }) => {
  const buttonClass = pressed ? `${styles.button} ${styles.buttonPress}` : styles.button

  return (
    <button
      className={buttonClass}
      onClick={() => {
        if (!pressed) handleClearCategoryFilter()
      }}
    >
      {name}
    </button>
  )
})

export default ButtonCategoryAll
