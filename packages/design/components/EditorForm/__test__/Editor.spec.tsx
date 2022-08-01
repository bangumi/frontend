import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Editor, { EditorProps } from '../Editor'

const initTextareaTest =
  (props: EditorProps): { textarea: HTMLTextAreaElement } => {
    props.placeholder = props.placeholder ?? 'placeholder'
    const { getByPlaceholderText } = render(<Editor {...props} />)
    const textarea = getByPlaceholderText(props.placeholder) as HTMLTextAreaElement
    return { textarea }
  }

const keyToEvent = {
  b: 'bold',
  i: 'italic',
  u: 'underscore',
  l: 'link',
  s: 'size',
  p: 'image'
}

function doSelectionTest (textarea: HTMLTextAreaElement, type: string, mockValue: string, selected = false): void {
  if (selected) {
    switch (type) {
      case 'bold': {
        expect(textarea.value).toBe('Hello [b]World[/b]')
        expect(textarea.selectionStart).toBe(18)
        expect(textarea.selectionEnd).toBe(18)
        break
      }
      case 'italic': {
        expect(textarea.value).toBe('Hello [i]World[/i]')
        expect(textarea.selectionStart).toBe(18)
        expect(textarea.selectionEnd).toBe(18)
        break
      }
      case 'underscore': {
        expect(textarea.value).toBe('Hello [u]World[/u]')
        expect(textarea.selectionStart).toBe(18)
        expect(textarea.selectionEnd).toBe(18)
        break
      }
      case 'image': {
        expect(textarea.value).toBe(`Hello [img]${mockValue}[/img]`)
        expect(textarea.selectionStart).toBe(71)
        expect(textarea.selectionEnd).toBe(71)
        break
      }
      case 'link': {
        expect(textarea.value).toBe(`Hello [url=${mockValue}]World[/url]`)
        expect(textarea.selectionStart).toBe(77)
        expect(textarea.selectionEnd).toBe(77)
        break
      }
      case 'size': {
        expect(textarea.value).toBe(`Hello [size=${mockValue}]World[/size]`)
        expect(textarea.selectionStart).toBe(79)
        expect(textarea.selectionEnd).toBe(79)
      }
    }
  } else {
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
        expect(textarea.selectionStart).toBe(60)
        expect(textarea.selectionEnd).toBe(64)
        break
      }
      case 'size': {
        expect(textarea.value).toBe(`[size=${mockValue}][/size]`)
        expect(textarea.selectionStart).toBe(61)
        expect(textarea.selectionEnd).toBe(61)
      }
    }
  }
}

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
    const { textarea } = initTextareaTest({ placeholder: 'Hello' })

    const mockValue = 'https://lain.bgm.tv/pic/cover/l/65/19/364450_9lB1T.jpg'
    jest.spyOn(window, 'prompt').mockImplementation(() => mockValue)

    ;['bold', 'italic', 'underscore', 'image', 'link', 'size'].forEach(type => {
      // init
      textarea.value = ''
      const el = screen.getByTestId(type)
      el.click()
      doSelectionTest(textarea, type, mockValue)
    })
  })

  it('click toolbox with selection', () => {
    const { textarea } = initTextareaTest({ placeholder: 'Hello' })

    const mockValue = 'https://lain.bgm.tv/pic/cover/l/65/19/364450_9lB1T.jpg'
    jest.spyOn(window, 'prompt').mockImplementation(() => mockValue)

    ;['bold', 'italic', 'underscore', 'image', 'link', 'size'].forEach(type => {
      // init
      textarea.value = 'Hello World'
      textarea.selectionStart = 6
      textarea.selectionEnd = 11

      const el = screen.getByTestId(type)
      el.click()
      doSelectionTest(textarea, type, mockValue, true)
    })
  })

  it('onConfirm keyboard event', () => {
    const onConfirm = jest.fn()
    const { textarea } = initTextareaTest({ placeholder: 'Hello', onConfirm })

    textarea.value = 'test111'
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true })
    expect(onConfirm).lastCalledWith('test111')

    textarea.value = 'test2'
    fireEvent.keyDown(textarea, { key: 's', altKey: true })
    expect(onConfirm).lastCalledWith('test2')
  })

  it('BBCode editor keyboard event', () => {
    const { textarea } = initTextareaTest({ placeholder: 'Hello' })

    const mockValue = 'https://lain.bgm.tv/pic/cover/l/65/19/364450_9lB1T.jpg'
    jest.spyOn(window, 'prompt').mockImplementation(() => mockValue)

    ;['b', 'i', 'u', 'l', 'p', 's'].forEach((key) => {
      // init
      textarea.value = ''

      fireEvent.keyDown(textarea, { key, ctrlKey: true })
      doSelectionTest(textarea, keyToEvent[key as keyof typeof keyToEvent], mockValue)
    })
  })

  it('BBCode editor keyboard event with selection', () => {
    const { textarea } = initTextareaTest({ placeholder: 'Hello' })

    const mockValue = 'https://lain.bgm.tv/pic/cover/l/65/19/364450_9lB1T.jpg'
    jest.spyOn(window, 'prompt').mockImplementation(() => mockValue)

    ;['b', 'i', 'u', 'l', 'p', 's'].forEach((key) => {
      // init
      textarea.value = 'Hello World'
      textarea.selectionStart = 6
      textarea.selectionEnd = 11

      fireEvent.keyDown(textarea, { key, ctrlKey: true })
      doSelectionTest(textarea, keyToEvent[key as keyof typeof keyToEvent], mockValue, true)
    })
  })
})
