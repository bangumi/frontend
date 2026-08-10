import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React from 'react';

import { server as mockServer } from '@bangumi/website/mocks/server';
import { renderPage } from '@bangumi/website/utils/test-utils';

import homeFixture from '../../../mocks/fixtures/p1/home-GET.json';
import HomePage from './components/HomePage';

describe('HomePage', () => {
  const setupHome = () => {
    mockServer.use(
      http.get('http://localhost:3000/p1/home', () => {
        return HttpResponse.json(homeFixture, { status: 200 });
      }),
    );
  };

  const renderHome = async () => {
    await act(async () => {
      renderPage(<HomePage />);
    });
  };

  it('should render all home blocks', async () => {
    setupHome();
    await renderHome();

    // 顶部问候（昵称在问候语与多个区块中重复出现）
    expect((await screen.findAllByText('树洞酱')).length).toBeGreaterThan(0);
    // 进度管理器（条目名与热门讨论中的同名条目重复出现）
    expect((await screen.findAllByText('测试动画')).length).toBeGreaterThan(0);
    expect(await screen.findByText('ep.6 看过')).toBeInTheDocument();
    // 时间线（抓抓）
    expect(await screen.findByText('今天天气真好')).toBeInTheDocument();
    // 小组话题
    expect(await screen.findByText('小组话题标题')).toBeInTheDocument();
    // 热门条目讨论
    expect(await screen.findByText('热门讨论标题')).toBeInTheDocument();
    // 每日放送（今日上映统计）
    expect(await screen.findByText(/今日上映/)).toBeInTheDocument();
    // 公告
    expect(await screen.findByText('公告')).toBeInTheDocument();
  });

  it('should use internal links for subjects', async () => {
    setupHome();
    await renderHome();

    const subjectLinks = document.querySelectorAll<HTMLAnchorElement>('a[href="/subject/12"]');
    expect(subjectLinks.length).toBeGreaterThan(0);
    for (const link of subjectLinks) {
      expect(link).not.toHaveAttribute('target');
    }
    expect(document.querySelector('a[href="https://bgm.tv/subject/12"]')).not.toBeInTheDocument();
  });

  it('should mark the last unwatched episode as watched', async () => {
    setupHome();
    let patchedBody: unknown = null;
    mockServer.use(
      http.patch('http://localhost:3000/p1/collections/episodes/100', async ({ request }) => {
        patchedBody = await request.json();
        return HttpResponse.json({}, { status: 200 });
      }),
    );

    await renderHome();

    fireEvent.click(await screen.findByText('ep.6 看过'));

    await waitFor(() => {
      expect(patchedBody).toEqual({ type: 2 });
    });
  });

  it('should update subject progress in batch', async () => {
    setupHome();
    let patchedBody: unknown = null;
    mockServer.use(
      http.patch('http://localhost:3000/p1/collections/subjects/12', async ({ request }) => {
        patchedBody = await request.json();
        return HttpResponse.json({}, { status: 200 });
      }),
    );

    await renderHome();

    const input = await screen.findByDisplayValue('5');
    fireEvent.change(input, { target: { value: '8' } });
    fireEvent.click(screen.getByRole('button', { name: '更新' }));

    await waitFor(() => {
      expect(patchedBody).toEqual({ epStatus: 8 });
    });
  });
});
