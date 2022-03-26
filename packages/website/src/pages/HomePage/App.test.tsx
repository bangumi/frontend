import React from 'react'
import HomePage from '.'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('HomePage', () => {
  it('should load character and subject', async () => {
    const { getByText } = render(<HomePage />)
    const characterName = 'うずまきボルト'
    await waitFor(() => getByText(characterName))

    expect(getByText(characterName))

    const subjectName = 'BLACK WOLVES SAGA -Bloody Nightmare-'
    const platform = 'PC'

    await waitFor(() => getByText(subjectName))
    await waitFor(() => getByText(platform))

    expect(getByText(subjectName)).toBeInTheDocument()
    expect(getByText(platform)).not.toHaveTextContent('undefined')
  })
})
