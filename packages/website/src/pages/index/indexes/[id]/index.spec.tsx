import { act, fireEvent, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { UserProvider } from '@bangumi/website/hooks/use-user';
import { server as mockServer } from '@bangumi/website/mocks/server';

import IndexDetailPage from '.';

describe('IndexDetailPage', () => {
  const renderPage = async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <Suspense fallback={null}>
          <MemoryRouter initialEntries={['/index/123']}>
            <HelmetProvider>
              <UserProvider>
                <Routes>
                  <Route path='index/:id' element={children} />
                </Routes>
              </UserProvider>
            </HelmetProvider>
          </MemoryRouter>
        </Suspense>
      </SWRConfig>
    );
    await act(async () => {
      render(<IndexDetailPage />, { wrapper });
    });
    await screen.findByRole('heading', { name: '我的测试目录' });
  };

  it('渲染标题、描述、统计与关联内容', async () => {
    await renderPage();

    // BBCode 描述渲染为链接
    expect(screen.getByRole('link', { name: '测试目录' })).toHaveAttribute(
      'href',
      'https://bgm.tv',
    );

    // 创建者与统计
    expect(screen.getAllByText('Sai').length).toBeGreaterThan(0);
    expect(screen.getByText((_, el) => el?.textContent === '10收藏')).toBeInTheDocument();
    expect(screen.getByText((_, el) => el?.textContent === '3评论')).toBeInTheDocument();
    expect(screen.getByText((_, el) => el?.textContent === '2关联')).toBeInTheDocument();

    // 关联内容：条目 + 角色
    expect(screen.getByText('测试动画')).toBeInTheDocument();
    expect(screen.getByText('测试角色')).toBeInTheDocument();
  });

  it('点击 Tab 切换关联分类（cat 参数）', async () => {
    let relatedQuery: string | null = null;
    mockServer.use(
      http.get('http://localhost:3000/p1/indexes/123/related', ({ request }) => {
        relatedQuery = new URL(request.url).search;
        return HttpResponse.json({ data: [], total: 0 }, { status: 200 });
      }),
    );

    await renderPage();
    await act(async () => {
      fireEvent.click(screen.getByText('角色'));
    });

    expect(relatedQuery).toContain('cat=1');
    expect(await screen.findByText('暂无关联内容')).toBeInTheDocument();
  });

  it('登录用户可收藏目录', async () => {
    let collectRequested = false;
    mockServer.use(
      http.put('http://localhost:3000/p1/collections/indexes/123', () => {
        collectRequested = true;
        return HttpResponse.json({}, { status: 200 });
      }),
    );

    await renderPage();

    const collectButton = await screen.findByRole('button', { name: '收藏目录' });
    await act(async () => {
      fireEvent.click(collectButton);
    });

    expect(collectRequested).toBe(true);
  });
});
