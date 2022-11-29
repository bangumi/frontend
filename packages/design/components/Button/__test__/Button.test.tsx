import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Button from '../index';

it.each(['primary', 'secondary', 'text'])('should render button of type %s', (type) => {
  const { container } = render(<Button type={type}>hello world</Button>);
  expect(container.firstChild).toMatchSnapshot();
});

it.each(['square', 'rounded'])('should render button of shape %s', (shape) => {
  const { container } = render(
    <Button type='primary' shape={shape}>
      hello world
    </Button>,
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('should trigger onClick callback', () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <Button type='primary' onClick={onClick}>
      hello world
    </Button>,
  );
  fireEvent.click(getByText('hello world'));

  expect(onClick).toBeCalledTimes(1);
});

it('should disable the button if disabled is true', () => {
  const { getByText } = render(
    <Button type='primary' disabled>
      hello world
    </Button>,
  );
  expect(getByText('hello world')).toBeDisabled();
});
