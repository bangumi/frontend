import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { UserProvider } from '@bangumi/website/hooks/use-user';

import Header from '.';

const renderHeader = () =>
  render(
    <MemoryRouter>
      <UserProvider>
        <Header />
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
});
