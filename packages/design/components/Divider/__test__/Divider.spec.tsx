import { render } from '@testing-library/react';
import React from 'react';

import Divider from '..';

describe('<Divider />', () => {
  it('should be horizontal', () => {
    const orientation = 'horizontal';
    const { getByRole } = render(<Divider orientation={orientation} />);

    expect(getByRole('separator')).toBeInTheDocument();
  });

  it('should be vertical', () => {
    const orientation = 'vertical';
    const { getByRole } = render(<Divider orientation={orientation} />);

    expect(getByRole('separator')).toBeInTheDocument();
    expect(getByRole('separator')).toHaveClass('bgm-divider--vertical');
  });

  it('should be list item', () => {
    const orientation = 'horizontal';
    const { getByRole } = render(<Divider orientation={orientation} isListItem />);

    expect(getByRole('separator')).toContainHTML('<li class="bgm-divider" role="separator" />');
  });
});
