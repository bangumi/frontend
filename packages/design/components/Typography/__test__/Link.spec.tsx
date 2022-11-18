import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import Link from '../Link';
import { MemoryRouter } from 'react-router-dom';

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
