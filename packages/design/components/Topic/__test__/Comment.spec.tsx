import { render } from '@testing-library/react';
import React from 'react';

import Comment from '../Comment';

describe('Comment', () => {
  it('should render', () => {
    const { container } = render(<Comment />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
