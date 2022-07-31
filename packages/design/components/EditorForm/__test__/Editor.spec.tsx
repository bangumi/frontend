import React from 'react'
import { render } from '@testing-library/react'
import Editor from '../Editor'

describe('EditorForm > Editor', () => {
  it('render correctly', () => {
    const { asFragment } = render(<Editor />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('ref should forward to textarea tag', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(
      <Editor ref={ref} />
    )
    expect(ref.current?.tagName).toBe('TEXTAREA')
  })

  it('placeholder props', () => {
    const { getByPlaceholderText } = render(
      <Editor placeholder="Hello" />
    )
    expect(getByPlaceholderText('Hello')).toBeInTheDocument()
  })

  it('showToolbox props', () => {
    const { container } = render(
      <Editor showToolbox={false} />
    )
    expect(container.querySelector('.bgm-editor__toolbox')).toHaveStyle('display: none')
  })
})
