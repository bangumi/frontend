import { render } from '@testing-library/react';
import React from 'react';

import Menu from '..';

const items = [
  {
    key: '1',
    label: '1',
    className: 'class-1',
  },
  {
    key: '2',
    label: '2',
    className: 'class-2',
  },
];

it('should render all menu', () => {
  const { getByText, container } = render(<Menu items={items} />);
  expect(container.firstChild).toHaveClass('bgm-menu', 'bgm-menu--horizontal');
  expect(getByText('1')).toBeInTheDocument();
  expect(getByText('2')).toBeInTheDocument();
  expect(getByText('1')).toHaveClass('bgm-menu-item');
  expect(getByText('2')).toHaveClass('class-2');
});

it('should trigger onChange when click menus', () => {
  const handleChange = vi.fn();
  const { getByText } = render(<Menu onClick={handleChange} items={items} />);
  getByText('2').click();
  expect(handleChange.mock.calls[0].length).toBe(2);
  expect(handleChange.mock.calls[0][0]).toBe('2');
});

it('render props', () => {
  const Comp: React.FC<{ label: string }> = ({ label }) => <div>{`Custom:${label}`}</div>;
  const { getByText } = render(
    <Menu items={items}>{(item) => <Comp label={item.label} key={item.key} />}</Menu>,
  );
  expect(getByText('Custom:1')).toBeInTheDocument();
});

it('should render subMenu', () => {
  const subMenu = <Menu items={items} mode='vertical' />;
  const menuItems = [
    {
      key: 'outer1',
      label: 'outer1',
      subMenu,
    },
  ];
  const { getByText, getByTestId } = render(<Menu items={menuItems} />);
  expect(getByText('outer1')).toHaveClass('bgm-menu-item');
  expect(getByText('1')).toHaveClass('class-1');
  expect(getByTestId('submenu')).toBeInTheDocument();
});
