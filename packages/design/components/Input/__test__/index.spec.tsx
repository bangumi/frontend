import React from 'react'
import { render } from '@testing-library/react'
import Input from '../index'

describe('Input', () => {
  it('placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Hello" />
    )
    expect(getByPlaceholderText('Hello')).toBeInTheDocument()
  })

  it('ref should forward to input tag', () => {
    const ref = React.useRef<HTMLInputElement>(null)
    render(
      <Input ref={ref} />
    )
    expect(ref.current?.tagName).toBe('INPUT')
  })
})
