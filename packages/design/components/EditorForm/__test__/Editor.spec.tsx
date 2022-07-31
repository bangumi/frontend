import React from 'react'
import { render, screen } from '@testing-library/react'
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

  it('click toolbox should have correct behavior', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    const { getByPlaceholderText } = render(
      <Editor placeholder="Hello" ref={ref} />
    )
    const textarea = getByPlaceholderText('Hello') as HTMLTextAreaElement
    const mockValue = 'https://lain.bgm.tv/pic/cover/l/65/19/364450_9lB1T.jpg'
    jest.spyOn(window, 'prompt').mockImplementation(() => mockValue)
    ;['bold', 'italic', 'underscore', 'image', 'link', 'size'].forEach(type => {
      ref.current!.value = ''
      const el = screen.getByTestId(type)
      el.click()
      switch (type) {
        case 'bold': {
          expect(textarea.value).toBe('[b][/b]')
          expect(textarea.selectionStart).toBe(3)
          expect(textarea.selectionEnd).toBe(3)
          break
        }
        case 'italic': {
          expect(textarea.value).toBe('[i][/i]')
          expect(textarea.selectionStart).toBe(3)
          expect(textarea.selectionEnd).toBe(3)
          break
        }
        case 'underscore': {
          expect(textarea.value).toBe('[u][/u]')
          expect(textarea.selectionStart).toBe(3)
          expect(textarea.selectionEnd).toBe(3)
          break
        }
        case 'image': {
          expect(textarea.value).toBe(`[img]${mockValue}[/img]`)
          expect(textarea.selectionStart).toBe(65)
          expect(textarea.selectionEnd).toBe(65)
          break
        }
        case 'link': {
          expect(textarea.value).toBe(`[url=${mockValue}]链接描述[/url]`)
          expect(textarea.selectionStart).toBe(64)
          expect(textarea.selectionEnd).toBe(64)
          break
        }
      }
    })
  })
})
