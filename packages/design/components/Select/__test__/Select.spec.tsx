import { render } from '@testing-library/react';
import React from 'react';

import Select from '..';

describe('Select Component', () => {
  it('render properly', () => {
    const { container } = render(
      <Select
        defaultValue='name'
        options={[
          { label: 'name', value: 'name' },
          { label: 'age', value: 'age' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
