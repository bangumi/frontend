import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { UserProvider } from '@bangumi/website/hooks/use-user';
import { server as mockServer } from '@bangumi/website/mocks/server';

import BlogEntryPage from '.';

describe('BlogEntryPage', () => {
  const renderPage = async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <Suspense fallback={null}>
          <MemoryRouter initialEntries={['/blog/123']}>
            <HelmetProvider>
              <UserProvider>
                <Routes>
                  <Route path='blog/:id' element={children} />
                </Routes>
              </UserProvider>
            </HelmetProvider>
          </MemoryRouter>
        </Suspense>
      </SWRConfig>
    );
    await act(async () => {
      render(<BlogEntryPage />, { wrapper });
    });
    await screen.findByText('测试日志标题');
  };

  it('should render entry, comments and related subjects', async () => {
    await renderPage();

    // 作者信息（作者行与评论作者均指向用户主页）
    const saiLinks = screen.getAllByRole('link', { name: 'Sai' });
    expect(saiLinks.length).toBeGreaterThan(0);
    expect(saiLinks.every((link) => link.getAttribute('href') === '/user/sai')).toBe(true);
    expect(screen.getByRole('link', { name: '日志' })).toHaveAttribute('href', '/user/sai/blog');

    // 标题
    expect(screen.getByRole('heading', { name: '测试日志标题' })).toBeInTheDocument();

    // 正文（BBCode 渲染）
    expect(screen.getByText(/这是日志正文/)).toBeInTheDocument();
    expect(screen.getByText('粗体')).toBeInTheDocument();

    // 标签
    expect(screen.getByText('#吐槽')).toBeInTheDocument();

    // 评论列表：主评论 + 子回复
    expect(screen.getByText('第一条主评论')).toBeInTheDocument();
    expect(screen.getByText('回复第一条评论')).toBeInTheDocument();
    expect(screen.getByText('第二条主评论')).toBeInTheDocument();

    // 关联条目（普通 SWR 异步加载，需等待）
    const relatedSubjectLink = await screen.findByRole('link', { name: 'Bangumi 测试条目' });
    expect(relatedSubjectLink).toHaveAttribute('href', '/subject/501963');
  });

  it('should post a new comment', async () => {
    let postedBody: unknown;
    mockServer.use(
      http.post('http://localhost:3000/p1/blogs/123/comments', async ({ request }) => {
        postedBody = await request.json();
        return HttpResponse.json({ id: 999 });
      }),
    );

    await renderPage();

    const textarea = await screen.findByPlaceholderText('添加新吐槽...');
    fireEvent.change(textarea, { target: { value: '新的吐槽内容' } });
    fireEvent.click(screen.getByRole('button', { name: '写好了' }));

    await waitFor(() => expect(postedBody).not.toBeUndefined());
    expect(postedBody).toMatchObject({
      content: '新的吐槽内容',
      replyTo: 0,
      turnstileToken: '',
    });
  });
});
