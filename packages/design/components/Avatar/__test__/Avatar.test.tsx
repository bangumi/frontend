import { render } from '@testing-library/react';
import React from 'react';

import Avatar from '@bangumi/design/components/Avatar/index.tsx';

it('Render a Avatar', () => {
  const { container } = render(<Avatar src='urlLink' />);
  const img = container.children[0];
  expect(img).toBeInTheDocument();
  expect(img?.children[0]).toHaveAttribute('src', 'urlLink');
});

it('Avatar Size', () => {
  const { container, rerender } = render(<Avatar src='urlLink' />);
  const img = container.children[0];
  expect(img).toHaveClass('bgm-avatar');
  expect(img).toHaveClass('bgm-avatar--small');

  rerender(<Avatar src='urlLink' size='medium' />);

  expect(img).toHaveClass('bgm-avatar--medium');
});

it('Avatar Extra Size', () => {
  const { container, rerender } = render(<Avatar src='urlLink' size='xsmall' />);
  const img = container.children[0];
  expect(img).toHaveClass('bgm-avatar--xsmall');

  rerender(<Avatar src='urlLink' size='post' />);

  expect(img).toHaveClass('bgm-avatar--post');
});
