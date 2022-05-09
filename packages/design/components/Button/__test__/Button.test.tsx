import React from 'react'
import Button from '../index'
import { render } from '@testing-library/react'

it.each`
  type
  ${'primary'}
  ${'secondary'}
`('should render button of type $type', ({ type }) => {
  const { container } = render(<Button type={type}>hello world</Button>)
  expect(container.firstChild).toMatchSnapshot()
})
