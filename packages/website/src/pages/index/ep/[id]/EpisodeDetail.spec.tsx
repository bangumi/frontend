import { act, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import {
  episodeCommentsFixture,
  episodeFixture,
  subjectEpisodesFixture,
} from '@bangumi/website/mocks/fixtures/p1/episodes/1704816';
import { server as mockServer } from '@bangumi/website/mocks/server';
import { renderPage } from '@bangumi/website/utils/test-utils';

import EpisodePage from '.';

vi.mock('react-router-dom', async () => {
  return {
    __esModule: true,
    ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
    useParams: vi.fn(),
  } as unknown;
});

const mockedUseParams = vi.mocked(useParams);

function mockEpisodeAPI() {
  mockServer.use(
    http.get('http://localhost:3000/p1/episodes/1704816', () => HttpResponse.json(episodeFixture)),
    http.get('http://localhost:3000/p1/episodes/1704816/comments', () =>
      HttpResponse.json(episodeCommentsFixture),
    ),
    http.get('http://localhost:3000/p1/subjects/501963/episodes', () =>
      HttpResponse.json(subjectEpisodesFixture),
    ),
  );
}

beforeEach(() => {
  mockedUseParams.mockReturnValue({ id: '1704816' });
  mockEpisodeAPI();
});

describe('EpisodeDetail', () => {
  it('should render episode info, comments and episode sidebar', async () => {
    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <EpisodePage />
        </Suspense>,
      );
    });

    // header：条目标题与章节 tab
    expect(await screen.findByRole('link', { name: /無職転生Ⅲ/ })).toHaveAttribute(
      'href',
      '/subject/501963',
    );
    const activeTab = screen.getByRole('link', { name: '章节' });
    expect(activeTab.className).toContain('p_10px_10px_9px');
    expect(activeTab.className).toContain('c_#f09199');

    // 主栏：章节 label、名称与简介
    expect(screen.getByRole('heading', { name: /EP\.1 燃えよ狂犬/ })).toBeInTheDocument();
    expect(screen.getAllByText('燃烧吧，狂犬').length).toBeGreaterThan(0);
    expect(screen.getByText(/ルーデウスと結ばれたものの/)).toBeInTheDocument();

    // 吐槽箱：评论作者与内容
    expect(screen.getByRole('heading', { name: '吐槽箱' })).toBeInTheDocument();
    expect(screen.getByText('四葉氷鋒')).toBeInTheDocument();
    expect(screen.getByText('Anime Expo上看了ep1&2，王朝了')).toBeInTheDocument();

    // 侧栏：章节列表与当前章节链接
    expect(screen.getByRole('heading', { name: '章节' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'EP.1燃烧吧，狂犬' })).toHaveAttribute(
      'href',
      '/ep/1704816',
    );
    expect(screen.getByRole('link', { name: 'EP.2咆哮吧，狂犬' })).toHaveAttribute(
      'href',
      '/ep/1704817',
    );
  });

  it('should show not found page when episode does not exist', async () => {
    // 使用不同的 episodeID，避免 SWR 缓存复用上一个测试的 key
    mockedUseParams.mockReturnValue({ id: '9999' });
    mockServer.use(
      http.get('http://localhost:3000/p1/episodes/9999', () =>
        HttpResponse.json({ message: 'episode not found' }, { status: 404 }),
      ),
      http.get('http://localhost:3000/p1/episodes/9999/comments', () => HttpResponse.json([])),
      http.get('http://localhost:3000/p1/subjects/501963/episodes', () =>
        HttpResponse.json({ data: [], total: 0 }),
      ),
    );

    await act(async () => {
      renderPage(
        <Suspense fallback={null}>
          <EpisodePage />
        </Suspense>,
      );
    });

    expect(await screen.findByText('没有找到章节')).toBeInTheDocument();
  });
});
