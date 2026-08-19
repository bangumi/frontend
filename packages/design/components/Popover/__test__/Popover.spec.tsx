import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Button from '../../Button';
import Popover from '..';

const renderClick = () =>
  render(
    <Popover trigger='click' label='示例面板' content={<span>面板内容</span>}>
      <Button>触发</Button>
    </Popover>,
  );

describe('Popover', () => {
  it('保持 hover 模式的既有 DOM 结构', () => {
    const { container } = render(<Popover content='菜单内容'>触发</Popover>);
    expect(screen.getByText('菜单内容')).toBeInTheDocument();
    expect(container.querySelector('.bgm-popover__container')).not.toBeNull();
    expect(container.querySelector('.bgm-popover__content')).not.toBeNull();
  });

  it('点击触发时按需挂载并关联面板', () => {
    renderClick();
    const trigger = screen.getByRole('button', { name: '触发' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('面板内容')).not.toBeInTheDocument();

    fireEvent.click(trigger);
    const panel = screen.getByRole('dialog', { name: '示例面板' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger.getAttribute('aria-controls')).toBe(panel.id);
  });

  it('支持 Escape 和点击外部关闭', () => {
    renderClick();
    const trigger = screen.getByRole('button', { name: '触发' });
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('面板内容')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    fireEvent.click(trigger);
    fireEvent.pointerDown(document.body);
    expect(screen.queryByText('面板内容')).not.toBeInTheDocument();
  });
});
