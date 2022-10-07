import React from 'react'

import styles from "./Loader.module.scss"

function Loader() {
  return (
    <div className={styles.loader_container}>
        <span className={styles.loader}></span>
    </div>
  )
}

export default Loader