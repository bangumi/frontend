import { render } from '@testing-library/react'
import React from 'react'
import Tab from '..'

it('should render all tab', () => {
  const items = [{
    key: '1',
    label: '1'
  }, {
    key: '2',
    label: '2'
  }]
  const { getByText } = render(<Tab items={items} activeKey='1'></Tab>)
  expect(getByText('1')).toBeInTheDocument()
  expect(getByText('2')).toBeInTheDocument()
  expect(getByText('1')).toHaveClass('active')
})

it('should trigger onChange when click tabs', () => {
  const items = [{
    key: '1',
    label: '1'
  }, {
    key: '2',
    label: '2'
  }]
  const handleChange = jest.fn()
  const { getByText } = render(<Tab items={items} activeKey='1' onChange={handleChange}></Tab>)
  getByText('2').click()

  expect(handleChange).toBeCalledWith('2')
})
