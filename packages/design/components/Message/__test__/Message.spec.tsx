import { render } from '@testing-library/react';
import React from 'react';

import Message from '..';

describe('<Message />', () => {
  it('should be render a Message', () => {
    const { container } = render(<Message>example-message</Message>);
    expect(container).toMatchSnapshot();
  });

  it('should be a whole line', () => {
    const { container } = render(<Message blockWidth>example-message-block</Message>);
    expect(container).toMatchSnapshot();
  });

  it('should be a error message', () => {
    const { container } = render(<Message type='error'>example-message-error</Message>);
    expect(container).toMatchSnapshot();
  });
});
