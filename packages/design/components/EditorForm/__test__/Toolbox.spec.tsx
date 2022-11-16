import React from 'react'
import { render, screen } from '@testing-library/react'
import Toolbox from '../Toolbox'

describe('EditorForm > Toolbox', () => {
  it('render with default classNames', () => {
    const { asFragment } = render(<Toolbox handleClickEvent={null!} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Toolbox style props', () => {
    const { container } = render(<Toolbox handleClickEvent={null!} style={{ display: 'none' }} />)
    expect(container.firstChild).toHaveStyle('display: none')
  })

  it('Toolbox handleClickEvent props', () => {
    const handleClickEvent = jest.fn()
    render(<Toolbox handleClickEvent={handleClickEvent} />)
    ;['bold', 'italic', 'underscore', 'image', 'link', 'size'].forEach((type) => {
      screen.getByTestId(type).click()
      expect(handleClickEvent).toHaveBeenCalledWith(type)
    })
  })
})
