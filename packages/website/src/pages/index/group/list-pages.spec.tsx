import { act, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React, { Suspense } from 'react';

import topicsFixture from '@bangumi/website/mocks/fixtures/p1/groups/-/topics-GET.json';
import groupsFixture from '@bangumi/website/mocks/fixtures/p1/groups-GET.json';
import { server as mockServer } from '@bangumi/website/mocks/server';
import { renderPage } from '@bangumi/website/utils/test-utils';

import GroupAll from './all';
import GroupDiscover from './discover';
import GroupMine from './mine';
import GroupMyReply from './my-reply';
import GroupMyTopic from './my-topic';

function mockGroupAPI() {
  mockServer.use(
    http.get('http://localhost:3000/p1/groups', () => HttpResponse.json(groupsFixture)),
    http.get('http://localhost:3000/p1/groups/-/topics', () => HttpResponse.json(topicsFixture)),
  );
}

beforeEach(() => {
  mockGroupAPI();
});

describe('GroupAll', () => {
  it('渲染小组列表与排序 tab', async () => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <GroupAll />
        </Suspense>,
      );
    });

    expect((await screen.findAllByText('所有小组')).length).toBeGreaterThan(0);
    expect(screen.getAllByText('番組WIKI計画').length).toBeGreaterThan(0);
    expect(screen.getByText('MAGI 小组')).toBeInTheDocument();
    expect(screen.getByText('8099 位成员')).toBeInTheDocument();
    // 排序 tab
    expect(screen.getByText('成员数')).toBeInTheDocument();
    expect(screen.getByText('最近活跃')).toBeInTheDocument();
    // 小组链接
    expect(screen.getByRole('link', { name: /番組WIKI計画/ })).toHaveAttribute(
      'href',
      '/group/wiki',
    );
  });
});

describe('GroupMine', () => {
  it('渲染我参加的小组列表', async () => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <GroupMine />
        </Suspense>,
      );
    });

    expect(await screen.findAllByText('我参加的小组')).not.toHaveLength(0);
    expect(screen.getByText('番組WIKI計画')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /番組WIKI計画/ })).toHaveAttribute(
      'href',
      '/group/wiki',
    );
  });
});

describe('GroupTopicListPages', () => {
  it.each([
    [GroupMyTopic, '我发表的话题'],
    [GroupMyReply, '我回复的话题'],
    [GroupDiscover, '随便看看'],
  ])('渲染 %s 标题与话题', async (Page, title) => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <Page />
        </Suspense>,
      );
    });

    expect(await screen.findAllByText(title)).not.toHaveLength(0);
    expect(screen.getByText('[投票结果] 关于连载书籍平台子分类的关联问题')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '新番组' })).toHaveAttribute('href', '/group/sandbox');
  });
});
