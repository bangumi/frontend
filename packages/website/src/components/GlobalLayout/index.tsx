import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import styles from './style.module.less'

const GlobalLayout: React.FC = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default GlobalLayout
