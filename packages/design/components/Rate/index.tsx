import React from 'react'
import { ReactComponent as FilledStar } from './assets/filled-star.svg'
import { ReactComponent as EmptyStar } from './assets/empty-star.svg'

export interface RateProps {
  value: number
}

const Rate: React.FC<RateProps> = (props) => {
  const { value } = props

  const numFiledStars = Math.floor(value / 2)
  const numHalfStars = Math.floor(value % 2)
  const numEmptyStars = 5 - numHalfStars - numFiledStars

  return <div>
    { Array.from({ length: numFiledStars }).map((_, i) => <FilledStar key={`filled-${i}`} data-testid="filled"/>) }
    {/* TODO: 待替换素材 */}
    { numHalfStars ? <FilledStar data-testid="half"/> : null}
    { Array.from({ length: numEmptyStars }).map((_, i) => <EmptyStar key={`filled-${i}`} data-testid="empty"/>) }
  </div>
}

export default Rate
