import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import Pagination from '..';

it('should render correctly', () => {
  const { getByTestId } = render(<Pagination total={3939} />);
  expect(getByTestId('pagination-wrapper')).toMatchSnapshot();
});

it('should hightlight current page and not highlight other page', async () => {
  const currentPage = 20;
  const { findAllByTestId } = render(<Pagination total={3000} currentPage={currentPage} />);
  const pagers = await findAllByTestId('pagination-pager');
  expect(pagers.length).toBe(10);
  pagers.forEach((pager) => {
    if (pager.title === String(currentPage)) {
      expect(pager.classList.contains('bgm-pagination-pager--active')).toBe(true);
    } else {
      expect(pager.classList.contains('bgm-pagination-pager--active')).toBe(false);
    }
  });
});

it('should response mouse click right', async () => {
  const onChange = vi.fn();
  const { findAllByTestId } = render(
    <Pagination total={30} pageSize={10} currentPage={1} onChange={onChange} />,
  );
  const pagers = await findAllByTestId('pagination-pager');
  expect(pagers.length).toBe(3);

  const page2 = pagers.at(1)!;
  expect(page2.classList.contains('bgm-pagination-pager--2')).toBe(true);

  fireEvent.click(page2);
  expect(page2.classList.contains('bgm-pagination-pager--active')).toBe(true);
  expect(onChange).toHaveBeenLastCalledWith(2);
});

it('should not response the prev-button clicked', () => {
  const onChange = vi.fn();
  const { queryByTestId } = render(<Pagination total={3000} currentPage={1} onChange={onChange} />);
  const prevButton = queryByTestId('pagination-prev')!;
  fireEvent.click(prevButton);
  expect(onChange).toHaveBeenCalledTimes(0);
  const nextButton = queryByTestId('pagination-next')!;
  fireEvent.click(nextButton);
  expect(onChange).toHaveBeenLastCalledWith(2);
});
it('should not response the next-button clicked', () => {
  const onChange = vi.fn();
  const { queryByTestId } = render(
    <Pagination total={3000} currentPage={100} onChange={onChange} />,
  );
  const nextButton = queryByTestId('pagination-next')!;
  fireEvent.click(nextButton);
  expect(onChange).toHaveBeenCalledTimes(0);
  const prevButton = queryByTestId('pagination-prev')!;
  fireEvent.click(prevButton);
  expect(onChange).toHaveBeenLastCalledWith(99);
});

it('should response next page', async () => {
  const onChange = vi.fn();
  const { getByTestId } = render(<Pagination total={300} onChange={onChange} />);
  const nextButton = getByTestId('pagination-next');
  fireEvent.click(nextButton);
  expect(onChange).toHaveBeenLastCalledWith(2);

  await waitFor(() => {
    const prevButton = getByTestId('pagination-prev');
    fireEvent.click(prevButton);
    expect(onChange).toHaveBeenLastCalledWith(1);
  });
});
