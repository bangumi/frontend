import React from 'react'
import { ReactComponent as FilledStar } from './assets/filled-star.svg'
import { ReactComponent as HalfStar } from './assets/half-star.svg'
import { ReactComponent as EmptyStar } from './assets/empty-star.svg'

import styles from './style/index.module.less'

export interface RateProps {
  value: number
}

const Rate: React.FC<RateProps> = (props) => {
  const { value } = props

  const numFiledStars = Math.floor(value / 2)
  const numHalfStars = Math.floor(value % 2)
  const numEmptyStars = 5 - numHalfStars - numFiledStars

  return <div className={styles.rate} >
    { Array.from({ length: numFiledStars }).map((_, i) => <FilledStar className={styles.star} key={`filled-${i}`} data-testid="filled"/>) }
    { numHalfStars ? <HalfStar className={styles.star} data-testid="half"/> : null}
    { Array.from({ length: numEmptyStars }).map((_, i) => <EmptyStar className={styles.star} key={`empty-${i}`} data-testid="empty"/>) }
  </div>
}

export default Rate
