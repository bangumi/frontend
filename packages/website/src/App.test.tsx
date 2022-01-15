import React from 'react'
import App from './App'
import { screen, render, waitFor } from '@testing-library/react'

describe('App', () => {
  it('should increase counter by 1 after clicking count button', () => {
    const { getByText } = render(<App />)
    expect(getByText('0'))

    const countButton = getByText('Increase')
    countButton.click()

    expect(getByText('1'))
  })

  it('should display fetched chracter detail properly', async () => {
    render(<App />)

    await waitFor(() => screen.getByTestId('fetched-character-detail'), { timeout: 6000 })

    expect(screen.getByTestId('fetched-character-detail')).toBeTruthy()
  })
})
