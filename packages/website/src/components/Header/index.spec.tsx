import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import { UserProvider } from '@bangumi/website/hooks/use-user.tsx';

import Header from './index.tsx';

const renderHeader = () =>
  render(
    <MemoryRouter>
      <UserProvider>
        <Header />
      </UserProvider>
    </MemoryRouter>,
  );

function LocationDisplay() {
  const location = useLocation();
  return <span data-testid='location'>{location.pathname + location.search}</span>;
}

const renderHeaderWithLocation = () =>
  render(
    <MemoryRouter>
      <UserProvider>
        <Routes>
          <Route path='*' element={<Header />} />
        </Routes>
        <LocationDisplay />
      </UserProvider>
    </MemoryRouter>,
  );

describe('Header', () => {
  it.each([
    ['动画', '/anime'],
    ['书籍', '/book'],
    ['音乐', '/music'],
    ['游戏', '/game'],
    ['三次元', '/real'],
  ])('频道入口 %s 应链接到 %s', (label, href) => {
    renderHeader();

    expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
  });

  it('头像应链接到当前用户的个人主页', async () => {
    const { container } = renderHeader();

    // fixture: packages/website/src/mocks/fixtures/p1/me-GET.json，username 为 "382951"
    await waitFor(() => {
      expect(container.querySelector('a[href="/user/382951"]')).toBeInTheDocument();
    });
  });

  it('点击菜单按钮会切换移动端导航', () => {
    const { container } = renderHeader();

    const toggle = screen.getByRole('button', { name: '菜单' });
    const navigation = container.querySelector('#mobile-navigation');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(navigation).toHaveAttribute('hidden');

    fireEvent.click(toggle);

    expect(screen.getByRole('button', { name: '关闭菜单' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(navigation).not.toHaveAttribute('hidden');
    expect(screen.getByRole('textbox', { name: '搜索' })).toBeInTheDocument();
  });

  it('点击搜索按钮会展开并聚焦移动端搜索框', async () => {
    const { container } = renderHeader();

    const button = screen.getByRole('button', { name: '搜索' });
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('#mobile-navigation')).toHaveAttribute('hidden');
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: '搜索' })).toHaveFocus();
    });
  });

  it('桌面端搜索表单提交后跳转到搜索结果页', () => {
    renderHeaderWithLocation();

    fireEvent.change(screen.getByRole('textbox', { name: '条目搜索' }), {
      target: { value: '夏目友人帐' },
    });
    fireEvent.submit(screen.getByRole('textbox', { name: '条目搜索' }).closest('form')!);

    expect(screen.getByTestId('location')).toHaveTextContent(
      '/subject_search/%E5%A4%8F%E7%9B%AE%E5%8F%8B%E4%BA%BA%E5%B8%90?cat=all',
    );
  });

  it('桌面端搜索可选择分类并按分类跳转', () => {
    renderHeaderWithLocation();

    fireEvent.change(screen.getByRole('combobox', { name: '搜索分类' }), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: '条目搜索' }), {
      target: { value: '测试' },
    });
    fireEvent.submit(screen.getByRole('textbox', { name: '条目搜索' }).closest('form')!);

    expect(screen.getByTestId('location')).toHaveTextContent(
      '/subject_search/%E6%B5%8B%E8%AF%95?cat=1',
    );
  });

  it('点击桌面端搜索图标按钮提交搜索', () => {
    renderHeaderWithLocation();

    fireEvent.change(screen.getByRole('textbox', { name: '条目搜索' }), {
      target: { value: '巨人' },
    });
    fireEvent.click(screen.getByRole('button', { name: '提交搜索' }));

    expect(screen.getByTestId('location')).toHaveTextContent(
      '/subject_search/%E5%B7%A8%E4%BA%BA?cat=all',
    );
  });

  it('空白关键词提交不会跳转', () => {
    renderHeaderWithLocation();

    fireEvent.submit(screen.getByRole('textbox', { name: '条目搜索' }).closest('form')!);

    expect(screen.getByTestId('location')).toHaveTextContent('/');
  });
});
