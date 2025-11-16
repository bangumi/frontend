import { fireEvent, render } from '@testing-library/react';
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

  it('Open dropdown & Select option', () => {
    const onChange = vi.fn();
    const element = render(
      <Select
        defaultValue='name'
        options={[
          { label: 'name', value: 'name' },
          { label: 'age', value: 'age' },
        ]}
        onChange={onChange}
      />,
    );

    fireEvent.click(element.getByText('name'));
    fireEvent.click(element.getByText('age'));
    expect(onChange).toBeCalledTimes(1);
  });
});
