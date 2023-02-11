import { render } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Link from '../Link';

const LinkTestWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

it('should render internal link', () => {
  const { asFragment } = render(<Link to='/a' />, { wrapper: LinkTestWrapper });

  expect(asFragment()).toMatchSnapshot();
});

it('should render external link', () => {
  const { asFragment } = render(<Link to='https://test.com' isExternal />, {
    wrapper: LinkTestWrapper,
  });

  expect(asFragment()).toMatchSnapshot();
});

it('should render no-style link', () => {
  const { asFragment } = render(<Link to='/a' noStyle />, { wrapper: LinkTestWrapper });

  expect(asFragment()).toMatchSnapshot();
});
