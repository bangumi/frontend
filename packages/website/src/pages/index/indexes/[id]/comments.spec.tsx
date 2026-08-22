import { act, render, screen } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { UserProvider } from '@bangumi/website/hooks/use-user.tsx';

import IndexCommentsPage from './comments.tsx';

describe('IndexCommentsPage', () => {
  const renderPage = async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <Suspense fallback={null}>
          <MemoryRouter initialEntries={['/index/123/comments']}>
            <HelmetProvider>
              <UserProvider>
                <Routes>
                  <Route path='index/:id/comments' element={children} />
                </Routes>
              </UserProvider>
            </HelmetProvider>
          </MemoryRouter>
        </Suspense>
      </SWRConfig>
    );
    await act(async () => {
      render(<IndexCommentsPage />, { wrapper });
    });
  };

  it('渲染目录评论（含楼中楼）', async () => {
    await renderPage();

    expect(await screen.findByText('第一条评论')).toBeInTheDocument();
    expect(screen.getByText('楼中楼回复')).toBeInTheDocument();

    // 评论作者与目录创建者都指向用户主页
    const saiLinks = screen.getAllByRole('link', { name: 'Sai' });
    expect(saiLinks.length).toBeGreaterThan(0);
    expect(saiLinks.every((link) => link.getAttribute('href') === '/user/sai')).toBe(true);
  });

  it('登录用户可见评论表单', async () => {
    await renderPage();

    expect(await screen.findByPlaceholderText('添加评论…')).toBeInTheDocument();
  });
});
