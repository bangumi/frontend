import { render } from '@testing-library/react';
import React from 'react';

import Divider from '@bangumi/design/components/Divider/index.tsx';

describe('<Divider />', () => {
  it('should be horizontal', () => {
    const orientation = 'horizontal';
    const { getByRole } = render(<Divider orientation={orientation} />);

    expect(getByRole('separator')).toBeInTheDocument();
    expect(getByRole('separator')).toHaveAttribute('aria-orientation', orientation);
  });

  it('should be vertical', () => {
    const orientation = 'vertical';
    const { getByRole } = render(<Divider orientation={orientation} />);

    expect(getByRole('separator')).toBeInTheDocument();
    expect(getByRole('separator')).toHaveAttribute('aria-orientation', orientation);
  });

  it('should be list item', () => {
    const orientation = 'horizontal';
    const { getByRole } = render(<Divider orientation={orientation} isListItem />);

    expect(getByRole('separator').tagName).toBe('LI');
  });
});
