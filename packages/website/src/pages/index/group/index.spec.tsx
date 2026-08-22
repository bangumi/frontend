import { act, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React, { Suspense } from 'react';

import topicsFixture from '@bangumi/website/mocks/fixtures/p1/groups/-/topics-GET.json';
import groupsFixture from '@bangumi/website/mocks/fixtures/p1/groups-GET.json';
import { server as mockServer } from '@bangumi/website/mocks/server.ts';
import { renderPage } from '@bangumi/website/utils/test-utils.tsx';

import GroupChannel from './index.tsx';

beforeEach(() => {
  mockServer.use(
    http.get('http://localhost:3000/p1/groups', () => HttpResponse.json(groupsFixture)),
    http.get('http://localhost:3000/p1/groups/-/topics', () => HttpResponse.json(topicsFixture)),
  );
});

describe('GroupChannel', () => {
  it('话题请求不携带登录相关的 mode 区分，由服务端分发', async () => {
    let topicsRequestMode: string | null = null;
    mockServer.use(
      http.get('http://localhost:3000/p1/groups/-/topics', ({ request }) => {
        topicsRequestMode = new URL(request.url).searchParams.get('mode');
        return HttpResponse.json(topicsFixture);
      }),
    );

    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <GroupChannel />
        </Suspense>,
      );
    });

    // 固定传服务端默认模式 Joined，不做登录态判断
    expect(topicsRequestMode).toBe('joined');
  });

  it('渲染热门小组与最新话题', async () => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <GroupChannel />
        </Suspense>,
      );
    });

    // 热门小组
    expect(await screen.findByText('热门小组')).toBeInTheDocument();
    expect(screen.getAllByText('番組WIKI計画').length).toBeGreaterThan(0);
    expect(screen.getAllByText('8099 位成员').length).toBeGreaterThan(0);

    // 小组最新话题
    expect(screen.getByText('小组最新话题')).toBeInTheDocument();
    expect(screen.getByText('[投票结果] 关于连载书籍平台子分类的关联问题')).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: '[投票结果] 关于连载书籍平台子分类的关联问题',
      }),
    ).toHaveAttribute('href', '/group/topic/430381');
  });

  it('侧栏包含小组频道导航', async () => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <GroupChannel />
        </Suspense>,
      );
    });

    expect((await screen.findAllByText('小组频道')).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: '所有小组' })).toHaveAttribute('href', '/group/all');
    expect(screen.getByRole('link', { name: '随便看看' })).toHaveAttribute(
      'href',
      '/group/discover',
    );
    expect(screen.getByRole('link', { name: '我参加的小组' })).toHaveAttribute(
      'href',
      '/group/mine',
    );
  });
});
