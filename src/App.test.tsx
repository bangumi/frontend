import React from 'react'
import App from './App'
import { render } from '@testing-library/react'

describe('App', () => {
  it('should increase counter by 1 after clicking count button', () => {
    const { getByText } = render(<App />)

    const countButton = getByText('count is: 0')
    countButton.click()

    expect(getByText('count is: 1'))
  })
})
