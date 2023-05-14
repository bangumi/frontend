import { render } from '@testing-library/react';
import React from 'react';

import CommentInfo from '../CommentInfo';

it('special comment should not render floor', () => {
  const createdAt = Math.trunc(new Date('2022-09-22T06:03:21Z').getTime() / 1000);
  const { container } = render(<CommentInfo floor={1} createdAt={createdAt} isSpecial />);
  const el = container.getElementsByClassName('bgm-topic__commentInfo')[0];
  expect(el!.textContent).toBe('2022-9-22 06:03');
});

it('normal comment should render floor', () => {
  const createdAt = Math.trunc(new Date('2022-09-22T06:03:21Z').getTime() / 1000);
  const { container } = render(<CommentInfo floor={1} createdAt={createdAt} />);
  const el = container.getElementsByClassName('bgm-topic__commentInfo')[0];
  expect(el!.textContent).toBe('#1  |  2022-9-22 06:03');
});
