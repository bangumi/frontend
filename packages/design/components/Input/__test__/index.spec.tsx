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
    const ref = React.createRef<HTMLInputElement>()
    render(
      <Input ref={ref} />
    )
    expect(ref.current?.tagName).toBe('INPUT')
  })

  it('prefix should be rendered', () => {
    const { getByText } = render(
      <Input prefix="$" />
    )
    expect(getByText('$')).toBeInTheDocument()
  })

  it('suffix should be rendered', () => {
    const { getByText } = render(
      <Input suffix="$" />
    )
    expect(getByText('$')).toBeInTheDocument()
  })
})
