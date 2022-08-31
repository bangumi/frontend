import React from 'react'
import Pagination from '..'
import { fireEvent, render } from '@testing-library/react'

it('should render correctly', () => {
  const { getByTestId } = render(<Pagination total={3939} />)
  expect(getByTestId('pagination-wrapper')).toMatchSnapshot()
})

it('should hightlight current page and not highlight other page', async () => {
  const current = 20
  const { findAllByTestId } = render(
    <Pagination total={3000} current={current} />
  )
  const pagers = await findAllByTestId('pagination-pager')
  expect(pagers.length).toBe(10)
  pagers.forEach((pager) => {
    if (pager.title === String(current)) {
      expect(pager.classList.contains('bgm-pagination-pager--active')).toBe(
        true
      )
    } else {
      expect(pager.classList.contains('bgm-pagination-pager--active')).toBe(
        false
      )
    }
  })
})

it('should response mouse click right', async () => {
  const onChange = jest.fn()
  const { findAllByTestId } = render(
    <Pagination total={30} pageSize={10} current={1} onChange={onChange} />
  )
  const pagers = await findAllByTestId('pagination-pager')
  expect(pagers.length).toBe(3)

  const page2 = pagers.at(1)!
  expect(page2.classList.contains('bgm-pagination-pager--2')).toBe(true)

  fireEvent.click(page2)
  expect(page2.classList.contains('bgm-pagination-pager--active')).toBe(true)
  expect(onChange).toHaveBeenLastCalledWith(2)
})

it('prev-button should be hide, next-button should not be hide', () => {
  const { queryByTestId } = render(<Pagination total={3000} current={1} />)
  const prevButton = queryByTestId('pagination-prev')
  const nextButton = queryByTestId('pagination-next')
  expect(prevButton).not.toBeInTheDocument()
  expect(nextButton).toBeInTheDocument()
})
it('prev-button should not be hide, next-button should be hide', () => {
  const { queryByTestId } = render(<Pagination total={3000} current={100} />)
  const prevButton = queryByTestId('pagination-prev')
  const nextButton = queryByTestId('pagination-next')
  expect(prevButton).toBeInTheDocument()
  expect(nextButton).not.toBeInTheDocument()
})

it('should response next page', () => {
  const onChange = jest.fn()
  const { getByTestId } = render(
    <Pagination total={300} onChange={onChange} />
  )
  const nextButton = getByTestId('pagination-next')
  fireEvent.click(nextButton)
  expect(onChange).toHaveBeenLastCalledWith(2)
})
