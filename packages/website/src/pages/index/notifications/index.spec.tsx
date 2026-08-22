import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { UserProvider } from '@bangumi/website/hooks/use-user.tsx';
import notifyFixture from '@bangumi/website/mocks/fixtures/p1/notify-GET.json';
import { server as mockServer } from '@bangumi/website/mocks/server.ts';

import NotificationPage from './index.tsx';

describe('NotificationPage', () => {
  const renderNotifications = async () => {
    // 独立的 SWR 缓存 + Suspense：参照 SubjectDetail.spec.tsx 的模式
    const wrapper = ({ children }: PropsWithChildren) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <Suspense fallback={null}>
          <MemoryRouter>
            <HelmetProvider>
              <UserProvider>{children}</UserProvider>
            </HelmetProvider>
          </MemoryRouter>
        </Suspense>
      </SWRConfig>
    );
    await act(async () => {
      render(<NotificationPage />, { wrapper });
    });
    // 等待用户信息与通知列表加载完成（prefix/suffix 与链接文字同属一个 span，
    // 文本被拆分，用正则部分匹配）
    await screen.findByText(/在你的小组话题/);
  };

  it('should render notifications of supported types', async () => {
    await renderNotifications();

    // type 1：小组话题新回复，链接到内部路由
    expect(screen.getByRole('link', { name: '测试小组话题' })).toHaveAttribute(
      'href',
      '/group/topic/100#post_200',
    );
    expect(screen.getByText(/中发表了新回复/)).toBeInTheDocument();

    // type 22：吐槽回复，链接文字固定为「吐槽」
    expect(screen.getByText(/回复了你的/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '吐槽' })).toHaveAttribute(
      'href',
      '/user/chobits_user/timeline/status/300#post_400',
    );

    // type 35：条目 patch 已被接受，链接到外部 patch 站点
    expect(screen.getByText(/你的条目 patch/)).toBeInTheDocument();
    expect(screen.getByText(/已经被接受/)).toBeInTheDocument();
    const patchAccepted = screen.getByRole('link', { name: '修改条目简介的 patch' });
    expect(patchAccepted).toHaveAttribute('href', 'https://patch.bgm38.tv/s/500#600');

    // type 47：条目 patch 新回复
    expect(screen.getByText(/你参与的条目 patch/)).toBeInTheDocument();
    expect(screen.getByText(/有新回复/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '修改条目标题' })).toHaveAttribute(
      'href',
      'https://patch.bgm38.tv/s/700#800',
    );

    // 通知发送者链接到其主页
    expect(screen.getByRole('link', { name: 'Sai' })).toHaveAttribute('href', '/user/sai');
  });

  it('should mark all notices as read', async () => {
    let cleared: unknown;
    let notifyCalls = 0;
    mockServer.use(
      http.get('http://localhost:3000/p1/notify', () => {
        notifyCalls += 1;
        return HttpResponse.json(notifyFixture);
      }),
      http.post('http://localhost:3000/p1/clear-notify', async ({ request }) => {
        cleared = await request.json();
        return HttpResponse.json({});
      }),
    );
    await renderNotifications();

    fireEvent.click(screen.getByRole('button', { name: '一键全部已读' }));

    // 等待 clear-notify 请求发出且 mutate 完成重新拉取列表
    await waitFor(() => {
      expect(cleared).toEqual({ id: [1, 2, 3, 4] });
    });
    await waitFor(() => {
      expect(notifyCalls).toBeGreaterThanOrEqual(2);
    });
  });

  it('should render the sender nickname inside the notice', async () => {
    await renderNotifications();

    const notice = screen.getByText(/在你的小组话题/).closest('div[id^="notice_"]') as HTMLElement;
    expect(notice).not.toBeNull();
    expect(within(notice).getByRole('link', { name: 'Sai' })).toBeInTheDocument();
  });
});
