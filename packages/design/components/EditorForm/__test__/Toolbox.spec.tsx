import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { describe, expect, it, vi } from 'vitest';

import Toolbox from '../Toolbox';

describe('EditorForm > Toolbox', () => {
  it('render with default classNames', () => {
    const { asFragment } = render(<Toolbox handleClickEvent={null!} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Toolbox style props', () => {
    const { container } = render(<Toolbox handleClickEvent={null!} style={{ display: 'none' }} />);
    expect(container.firstChild).toHaveStyle('display: none');
  });

  it('Toolbox handleClickEvent props', async () => {
    const handleClickEvent = vi.fn();
    render(<Toolbox handleClickEvent={handleClickEvent} />);
    for (const type of ['bold', 'italic', 'underscore', 'image', 'link', 'size']) {
      await act(() => {
        return fireEvent.click(screen.getByTestId(type));
      });
      expect(handleClickEvent).toHaveBeenCalledWith(type);
    }
  });
});
