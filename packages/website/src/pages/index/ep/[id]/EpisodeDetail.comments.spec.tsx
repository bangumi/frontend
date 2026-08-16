import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, useParams } from 'react-router-dom';
import { SWRConfig } from 'swr';

import type { CommentBase, SlimUser } from '@bangumi/client/client';
import {
  episodeFixture,
  subjectEpisodesFixture,
} from '@bangumi/website/mocks/fixtures/p1/episodes/1704816';
import { server as mockServer } from '@bangumi/website/mocks/server';

import EpisodePage from '.';

vi.mock('react-router-dom', async () => {
  return {
    __esModule: true,
    ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
    useParams: vi.fn(),
  } as unknown;
});

// 登录用户 sai（id=1），ownComment 的 creatorID 与之匹配
vi.mock('@bangumi/website/hooks/use-user', async () => ({
  ...(await vi.importActual<typeof import('@bangumi/website/hooks/use-user')>(
    '@bangumi/website/hooks/use-user',
  )),
  useUser: () => ({
    user: { id: 1, username: 'sai', nickname: 'Sai', permissions: { subjectWikiEdit: true } },
  }),
}));

const mockedUseParams = vi.mocked(useParams);

type CommentWithReplies = CommentBase & { replies: CommentBase[] };

function makeUser(id: number, nickname: string): SlimUser {
  return {
    id,
    username: `user${id}`,
    nickname,
    avatar: { small: '', medium: '', large: '' },
    group: 2,
    sign: '',
    joinedAt: 0,
    isFriend: false,
  };
}

const ownComment: CommentWithReplies = {
  id: 3001,
  mainID: 0,
  creatorID: 1,
  relatedID: 0,
  createdAt: 1700000000,
  content: '我自己的吐槽',
  state: 0,
  user: makeUser(1, 'Sai'),
  replies: [],
};

const otherComment: CommentWithReplies = {
  id: 3002,
  mainID: 0,
  creatorID: 2,
  relatedID: 0,
  createdAt: 1700000001,
  content: '别人的吐槽',
  state: 0,
  user: makeUser(2, 'Chii'),
  replies: [],
};

function mockEpisodeAPI(comments: CommentWithReplies[]) {
  mockServer.use(
    http.get('http://localhost:3000/p1/episodes/1704816', () => HttpResponse.json(episodeFixture)),
    http.get('http://localhost:3000/p1/episodes/1704816/comments', () =>
      HttpResponse.json(comments),
    ),
    http.get('http://localhost:3000/p1/subjects/501963/episodes', () =>
      HttpResponse.json(subjectEpisodesFixture),
    ),
  );
}

describe('EpisodeDetail 评论写操作', () => {
  beforeEach(() => {
    mockedUseParams.mockReturnValue({ id: '1704816' });
  });

  const renderPage = async () => {
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
      render(<EpisodePage />, { wrapper });
    });
  };

  it('登录用户可见发帖表单', async () => {
    mockEpisodeAPI([otherComment]);
    await renderPage();

    expect(await screen.findByPlaceholderText('用 [mask] 标签隐藏剧透内容')).toBeInTheDocument();
  });

  it('发帖调用 createEpisodeComment', async () => {
    let postBody: unknown = null;
    mockServer.use(
      http.post('http://localhost:3000/p1/episodes/1704816/comments', async ({ request }) => {
        postBody = await request.json();
        return HttpResponse.json({ id: 3003 }, { status: 200 });
      }),
    );
    mockEpisodeAPI([otherComment]);
    await renderPage();

    const textarea = await screen.findByPlaceholderText('用 [mask] 标签隐藏剧透内容');
    await act(async () => {
      fireEvent.input(textarea, { target: { value: '新吐槽内容' } });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '写好了' }));
    });

    expect(postBody).toMatchObject({ content: '新吐槽内容', replyTo: 0 });
  });

  it('自己的评论可编辑、可删除；他人评论不可', async () => {
    let deleteRequested = false;
    mockServer.use(
      http.delete('http://localhost:3000/p1/episodes/-/comments/3001', () => {
        deleteRequested = true;
        return HttpResponse.json({}, { status: 200 });
      }),
    );
    mockEpisodeAPI([ownComment, otherComment]);
    await renderPage();

    expect(await screen.findByText('我自己的吐槽')).toBeInTheDocument();

    // 编辑/删除位于"更多"Popover 内（Topic.Comment 结构），jsdom 下以 hidden 查询
    const ownItem = screen.getByText('我自己的吐槽').closest('[id="post_3001"]') as HTMLElement;
    expect(within(ownItem).getByTitle('其他')).toBeInTheDocument();
    expect(within(ownItem).getByRole('button', { name: '编辑', hidden: true })).toBeInTheDocument();
    expect(within(ownItem).getByRole('button', { name: '删除', hidden: true })).toBeInTheDocument();

    // 他人的评论：更多菜单内无编辑/删除
    const otherItem = screen.getByText('别人的吐槽').closest('[id="post_3002"]') as HTMLElement;
    expect(
      within(otherItem).queryByRole('button', { name: '编辑', hidden: true }),
    ).not.toBeInTheDocument();
    expect(
      within(otherItem).queryByRole('button', { name: '删除', hidden: true }),
    ).not.toBeInTheDocument();

    // 删除确认后调用 DELETE
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    await act(async () => {
      fireEvent.click(within(ownItem).getByRole('button', { name: '删除', hidden: true }));
    });
    expect(deleteRequested).toBe(true);
    confirmSpy.mockRestore();
  });

  it('点击回复显示楼中楼表单', async () => {
    mockEpisodeAPI([otherComment]);
    await renderPage();

    await screen.findByText('别人的吐槽');
    await act(async () => {
      fireEvent.click(screen.getAllByRole('button', { name: '回复' })[0]!);
    });

    expect(screen.getByPlaceholderText('回复 @Chii：')).toBeInTheDocument();
  });
});
