import React from 'react'
import Button from '../index'
import { render } from '@testing-library/react'

it('Button', () => {
  render(<Button />)
  expect(true).toBe(true)
})
