import React from 'react'
import Rate from '..'
import { render } from '@testing-library/react'

it.each([
  [0.1, 0, 0, 5],
  [1.1, 0, 1, 4],
  [2.1, 1, 0, 4],
  [4.0, 2, 0, 3],
  [6.0, 3, 0, 2],
  [7.0, 3, 1, 1],
  [8.0, 4, 0, 1],
  [9.0, 4, 1, 0],
  [10, 5, 0, 0]
])('should render correct stars for rate %d',
  (rate, expectedNumFilledStars, expectedNumHalfStars, expectedNumEmptyStars) => {
    const { queryAllByTestId } = render(<Rate value={rate} />)

    expect(queryAllByTestId('filled')).toHaveLength(expectedNumFilledStars)
    expect(queryAllByTestId('half')).toHaveLength(expectedNumHalfStars)
    expect(queryAllByTestId('empty')).toHaveLength(expectedNumEmptyStars)
  }
)
