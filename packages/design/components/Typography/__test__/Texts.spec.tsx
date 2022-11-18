import React from 'react';
import { render } from '@testing-library/react';
import Text from '../Text';

it.each`
  type
  ${undefined}
  ${'default'}
  ${'secondary'}
`('should render $type text', ({ type }) => {
  const { container } = render(<Text type={type}>hello world</Text>);
  expect(container.firstChild).toMatchSnapshot();
});
