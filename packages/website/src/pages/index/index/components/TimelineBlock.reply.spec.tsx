import { act, fireEvent, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import type { Timeline } from '@bangumi/client/client.ts';
import homeFixture from '@bangumi/website/mocks/fixtures/p1/home-GET.json';
import repliesFixture from '@bangumi/website/mocks/fixtures/p1/timeline/9001/replies-GET.json';
import { server as mockServer } from '@bangumi/website/mocks/server.ts';

import TimelineBlock from './TimelineBlock.tsx';

const timelineData = (homeFixture as { timeline: Timeline[] }).timeline;

// 登录用户 sai（id=1）
vi.mock('@bangumi/website/hooks/use-user', async () => ({
  ...(await vi.importActual<typeof import('@bangumi/website/hooks/use-user.tsx')>(
    '@bangumi/website/hooks/use-user',
  )),
  useUser: () => ({
    user: {
      id: 1,
      username: 'sai',
      nickname: 'Sai',
      avatar: { small: '', medium: '', large: '' },
    },
  }),
}));

function mockHomeAPI() {
  mockServer.use(http.get('http://localhost:3000/p1/home', () => HttpResponse.json(homeFixture)));
}

describe('TimelineBlock 回复', () => {
  const renderBlock = async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <MemoryRouter>
          <HelmetProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </HelmetProvider>
        </MemoryRouter>
      </SWRConfig>
    );
    await act(async () => {
      render(<TimelineBlock timeline={timelineData} />, { wrapper });
    });
  };

  it('每条时间线显示回复入口', async () => {
    mockHomeAPI();
    await renderBlock();

    expect(await screen.findByRole('button', { name: '回复' })).toBeInTheDocument();
  });

  it('展开加载回复列表并显示回复表单', async () => {
    mockHomeAPI();
    mockServer.use(
      http.get('http://localhost:3000/p1/timeline/9001/replies', () =>
        HttpResponse.json(repliesFixture),
      ),
    );
    await renderBlock();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '回复' }));
    });

    expect(await screen.findByText('第一条回复')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('回复这条动态...')).toBeInTheDocument();
  });

  it('发表回复调用 createTimelineReply', async () => {
    let postBody: unknown = null;
    mockHomeAPI();
    mockServer.use(
      http.get('http://localhost:3000/p1/timeline/9001/replies', () =>
        HttpResponse.json(repliesFixture),
      ),
      http.post('http://localhost:3000/p1/timeline/9001/replies', async ({ request }) => {
        postBody = await request.json();
        return HttpResponse.json({ id: 3 }, { status: 200 });
      }),
    );
    await renderBlock();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '回复' }));
    });
    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText('回复这条动态...'), {
        target: { value: '我的回复' },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '回复' }));
    });

    // 乐观追加后表单内容清空
    expect(postBody).toMatchObject({ content: '我的回复' });
  });
});
