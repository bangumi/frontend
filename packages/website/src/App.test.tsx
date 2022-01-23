import React from 'react'
import App from './App'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('App', () => {
  it('should increase counter by 1 after clicking count button', () => {
    const { getByText } = render(<App />)
    expect(getByText('0'))

    const countButton = getByText('Increase')
    countButton.click()

    expect(getByText('1'))
  })
  it('should load character and subject', async () => {
    const { getByText } = render(<App />)
    const characterName = 'うずまきボルト'
    await waitFor(() => getByText(characterName), { timeout: 6000 })

    expect(getByText(characterName))

    const subjectName = 'BLACK WOLVES SAGA -Bloody Nightmare-'
    await waitFor(() => getByText(subjectName), { timeout: 6000 })
    expect(getByText(subjectName)).toBeInTheDocument()
  })
})
