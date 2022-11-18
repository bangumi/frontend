import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Button from '../index';

it.each`
  type
  ${'primary'}
  ${'secondary'}
  ${'text'}
`('should render button of type $type', ({ type }) => {
  const { container } = render(<Button type={type}>hello world</Button>);
  expect(container.firstChild).toMatchSnapshot();
});

it.each`
  shape
  ${'square'}
  ${'rounded'}
`('should render button of shape $shape', ({ shape }) => {
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
