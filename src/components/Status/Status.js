import { memo } from 'react'
import styles from './Status.module.scss'

const Status = memo(({ label, handleStatus, ariaLabelledby }) => (
  <div className={styles.status}>
    <input
      id={label}
      className={styles.statusInput}
      type="checkbox"
      onChange={handleStatus}
      aria-labelledby={ariaLabelledby}
    />
    <label htmlFor={label} className={styles.statusLabel}>
      {label}
    </label>
  </div>
))

export default Status
