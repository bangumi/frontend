import React from 'react';
import Avatar from '..';
import { render } from '@testing-library/react';

it('Render a Avatar', () => {
  const { container } = render(<Avatar src="urlLink" />);
  const img = container.children[0];
  expect(img).toBeInTheDocument();
  expect(img.children[0]).toHaveAttribute('src', 'urlLink');
});

it('Avatar Size', () => {
  const { container, rerender } = render(<Avatar src="urlLink" />);
  const img = container.children[0];
  expect(img).toHaveClass('bgm-avatar');
  expect(img).toHaveClass('bgm-avatar--small');

  rerender(<Avatar src="urlLink" size="medium" />);

  expect(img).toHaveClass('bgm-avatar--medium');
});
