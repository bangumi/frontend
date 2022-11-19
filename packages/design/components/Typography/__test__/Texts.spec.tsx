import { render } from '@testing-library/react';
import React from 'react';

import Text from '../Text';

it.each([undefined, 'default', 'secondary'])('should render %s text', (type) => {
  const { container } = render(<Text type={type}>hello world</Text>);
  expect(container.firstChild).toMatchSnapshot();
});
