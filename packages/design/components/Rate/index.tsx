import React from 'react'
import { ReactComponent as FilledStar } from './assets/filled-star.svg'
import { ReactComponent as HalfStar } from './assets/half-star.svg'
import { ReactComponent as EmptyStar } from './assets/empty-star.svg'

export interface RateProps {
  value: number
}

const Rate: React.FC<RateProps> = (props) => {
  const { value } = props

  const numFiledStars = Math.floor(value / 2)
  const numHalfStars = Math.floor(value % 2)
  const numEmptyStars = 5 - numHalfStars - numFiledStars

  return <div className="bgm-rate">
    { Array.from({ length: numFiledStars }).map(
      (_, i) => <FilledStar className="bgm-rate__star" key={`filled-${i}`} data-testid="filled"/>
    ) }
    { numHalfStars ? <HalfStar className="bgm-rate__star" data-testid="half"/> : null}
    { Array.from({ length: numEmptyStars }).map(
      (_, i) => <EmptyStar className="bgm-rate__star" key={`empty-${i}`} data-testid="empty"/>
    ) }
  </div>
}

export default Rate
