import { render } from '@testing-library/react'
import React from 'react'
import Link from '../Link'

it('should render its children', () => {
  const { getByText } = render(<Link href='helloworld'>这是一个链接哦</Link>)

  const elem = getByText('这是一个链接哦')
  expect(elem).toBeInTheDocument()
  expect(elem).toHaveAttribute('href', 'helloworld')
})
