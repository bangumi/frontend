import { render } from '@testing-library/react';
import React from 'react';

import Message from '..';

describe('<Message />', () => {
  it('should be self-adaption', () => {
    const message = 'example';
    const { getByTestId } = render(<Message>{message}</Message>);

    expect(getByTestId('message')).toMatchSnapshot();
  });

  it('should be a whole line', () => {
    const message = 'example';
    const { getByTestId } = render(<Message length='full'>{message}</Message>);

    expect(getByTestId('message')).toMatchSnapshot();
    expect(getByTestId('message')).toHaveClass('bgm-message-full');
  });

  it('should be a error message', () => {
    const message = 'example';
    const { getByTestId } = render(<Message type='error'>{message}</Message>);

    expect(getByTestId('message')).toMatchSnapshot();
    expect(getByTestId('message')).toHaveClass('bgm-message-error');
  });
});
