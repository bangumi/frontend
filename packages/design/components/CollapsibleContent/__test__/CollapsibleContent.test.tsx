import { fireEvent, render } from '@testing-library/react';
import React, { useState } from 'react';

import type { CollapsibleContentProps } from '../index';
import CollapsibleContent from '../index';

const Template = (args: CollapsibleContentProps) => {
  const [collapsed, setCollapsed] = useState(args.collapsed);
  return <CollapsibleContent collapsed={collapsed} onChange={setCollapsed} {...args} />;
};

const mockScrollHeight = (height: number) => {
  vi.spyOn(HTMLDivElement.prototype, 'scrollHeight', 'get').mockImplementation(() => height);
};

it('should render', () => {
  const { container } = render(<Template content='bgm' />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should uncollapse', () => {
  mockScrollHeight(10);
  const onChange = vi.fn();
  const { getByText, container } = render(
    <CollapsibleContent content='bgm' threshold={1} collapsed onChange={onChange} />,
  );
  const contentElement = container.firstChild?.firstChild;
  const button = getByText('展开');
  expect(button).toBeInTheDocument();
  expect(contentElement).toHaveStyle({ 'max-height': '1px' });
  fireEvent.click(button);
  expect(onChange).toBeCalledWith(false);
});

it('should collapse', () => {
  mockScrollHeight(10);
  const onChange = vi.fn();
  const { getByText, container } = render(
    <CollapsibleContent content='bgm' threshold={1} collapsed={false} onChange={onChange} />,
  );
  const contentElement = container.firstChild?.firstChild;
  const button = getByText('收起');
  expect(button).toBeInTheDocument();
  expect(contentElement).not.toHaveStyle({
    'max-height': '1px',
  });
  fireEvent.click(button);
  expect(onChange).toBeCalledWith(true);
});
