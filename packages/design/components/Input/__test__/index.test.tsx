import { render } from '@testing-library/react';
import React from 'react';

import Input from '../index';

describe('Input', () => {
  test('placeholder', () => {
    const { getByPlaceholderText } = render(<Input placeholder='Hello' />);
    expect(getByPlaceholderText('Hello')).toBeInTheDocument();
  });

  test('ref should forward to input tag', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current?.tagName).toBe('INPUT');
  });

  test('prefix should be rendered', () => {
    const { getByText } = render(<Input prefix='$' />);
    expect(getByText('$')).toBeInTheDocument();
  });

  test('suffix should be rendered', () => {
    const { getByText } = render(<Input suffix='$' />);
    expect(getByText('$')).toBeInTheDocument();
  });

  test('disabled className', () => {
    const { container } = render(<Input disabled />);
    expect(container).toMatchSnapshot();
  });

  test('alignment', () => {
    const { container } = render(<Input align='right' />);
    expect(container).toMatchSnapshot();
  });

  test('rounded variant', () => {
    const { container } = render(<Input rounded />);
    expect(container).toMatchSnapshot();
  });
});
