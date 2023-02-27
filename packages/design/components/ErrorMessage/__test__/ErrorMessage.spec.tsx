import { render } from '@testing-library/react';
import React from 'react';

import ErrorMessage from '..';

describe('<ErrorMessage />', () => {
  it('should be self-adaption', () => {
    const message = 'example';
    const { getByRole } = render(<ErrorMessage message={message} />);

    expect(getByRole('separator')).toBeInTheDocument();
  });

  it('should be a whole line', () => {
    const message = 'example';
    const length = 'full';
    const { getByRole } = render(<ErrorMessage message={message} length={length} />);

    expect(getByRole('separator')).toBeInTheDocument();
    expect(getByRole('separator')).toHaveClass('bgm-error-message-full');
  });
});
