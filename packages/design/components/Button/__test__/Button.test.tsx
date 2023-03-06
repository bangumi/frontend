import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Button from '../index';

describe('Primary Button', () => {
  it.each(['large', 'medium', 'small'] as const)('should render button of size %s', (size) => {
    const { container } = render(
      <Button type='primary' size={size}>
        hello world
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it.each(['blue', 'gray'] as const)('should render button of color %s', (color) => {
    const { container } = render(
      <Button type='primary' color={color}>
        hello world
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Secondary Button', () => {
  it.each(['large', 'medium', 'small'] as const)('should render button of size %s', (size) => {
    const { container } = render(
      <Button type='secondary' size={size}>
        hello world
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it.each(['blue'] as const)('should render button of color %s', (color) => {
    const { container } = render(
      <Button type='secondary' color={color}>
        hello world
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Text Button', () => {
  it.each(['large', 'medium', 'small'] as const)('should render button of size %s', (size) => {
    const { container } = render(
      <Button type='text' size={size}>
        hello world
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

it('should render button link', () => {
  const { container } = render(
    <Button.Link to='https://bgm.tv' isExternal>
      Bangumi
    </Button.Link>,
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('should render plain button', () => {
  const { container } = render(
    <Button.Link to='https://bgm.tv' type='plain' isExternal>
      Bangumi
    </Button.Link>,
  );
  expect(container.firstChild).toMatchSnapshot();
});

it.each(['square', 'rounded'] as const)('should render button of shape %s', (shape) => {
  const { container } = render(
    <Button type='primary' shape={shape}>
      hello world
    </Button>,
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('should trigger onClick callback', () => {
  const onClick = vi.fn();
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
