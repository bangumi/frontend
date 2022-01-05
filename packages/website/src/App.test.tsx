import React from 'react'
import App from './App'
import { render } from '@testing-library/react'

describe('App', () => {
  it('should increase counter by 1 after clicking count button', () => {
    const { getByText } = render(<App />)
    expect(getByText('0'))
    
    const countButton = getByText('Increase')
    countButton.click()

    expect(getByText('1'))
  })
})