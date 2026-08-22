import { act, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { UserProvider } from '@bangumi/website/hooks/use-user.tsx';
import subjectTopicFixture from '@bangumi/website/mocks/fixtures/p1/subjects/-/topics/202-GET.json';
import { server as mockServer } from '@bangumi/website/mocks/server.ts';

import SubjectTopicPage from './index.tsx';

describe('SubjectTopicPage', () => {
  const renderPage = async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MemoryRouter initialEntries={['/subject/topic/202']}>
        <HelmetProvider>
          <UserProvider>
            <Routes>
              <Route path='subject/topic/:id' element={children} />
            </Routes>
          </UserProvider>
        </HelmetProvider>
      </MemoryRouter>
    );
    mockServer.use(
      http.get('http://localhost:3000/p1/subjects/-/topics/202', () =>
        HttpResponse.json(subjectTopicFixture),
      ),
    );
    await act(async () => {
      render(
        <Suspense fallback={null}>
          <SubjectTopicPage />
        </Suspense>,
        { wrapper },
      );
    });
  };

  it('渲染话题标题、楼主内容与回复', async () => {
    await renderPage();

    expect(await screen.findByRole('heading', { name: '热门讨论标题' })).toBeInTheDocument();
    expect(screen.getByText('树洞酱')).toBeInTheDocument();
    expect(screen.getByText(/楼主内容/)).toBeInTheDocument();
    expect(screen.getByText('加粗')).toBeInTheDocument();
    expect(screen.getByText('回复内容')).toBeInTheDocument();
  });

  it('顶部导航指向条目与讨论区，右侧展示条目卡片', async () => {
    await renderPage();

    expect(await screen.findByRole('link', { name: '测试动画' })).toHaveAttribute(
      'href',
      '/subject/12',
    );
    expect(screen.getByRole('link', { name: '讨论区' })).toHaveAttribute(
      'href',
      '/subject/12/board',
    );
    // 右侧条目卡片
    expect(screen.getByRole('link', { name: '返回条目' })).toHaveAttribute('href', '/subject/12');
  });

  it('登录用户可看到回复表单', async () => {
    await renderPage();

    expect(await screen.findByText('热门讨论标题')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('添加新回复...')).toBeInTheDocument();
  });
});
