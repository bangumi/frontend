import { render as _render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import type { CommentActionsProps } from '../CommentActions';
import CommentActions from '../CommentActions';

const render = (props: CommentActionsProps) =>
  _render(
    <BrowserRouter>
      <CommentActions {...props} />
    </BrowserRouter>,
  );

describe('Basic Usage', () => {
  it('should render', () => {
    expect(render({ id: 233 }).container).toMatchSnapshot();
  });
});

describe('With Text', () => {
  it('should render', () => {
    expect(render({ id: 233, showText: true }).container).toMatchSnapshot();
  });
});

describe('Is Author', () => {
  it('should render', () => {
    expect(render({ id: 233, isAuthor: true }).container).toMatchSnapshot();
  });
});

describe('Non-editable', () => {
  it('should render', () => {
    expect(render({ id: 233, isAuthor: true, editable: false }).container).toMatchSnapshot();
  });
});
