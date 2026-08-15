import { act, fireEvent, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import type { PropsWithChildren } from 'react';
import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import type { SlimSubject } from '@bangumi/client/client';
import { CollectionType, SubjectType } from '@bangumi/client/client';
import { server as mockServer } from '@bangumi/website/mocks/server';

import { CollectionList } from './components/CollectionList';

vi.mock('@bangumi/website/hooks/use-user', async () => ({
  ...(await vi.importActual<typeof import('@bangumi/website/hooks/use-user')>(
    '@bangumi/website/hooks/use-user',
  )),
  useUser: () => ({ user: { id: 1, username: 'sai', nickname: 'Sai' } }),
}));

const collectedSubject: SlimSubject = {
  id: 12,
  type: SubjectType.Anime,
  name: 'Test Anime',
  nameCN: '测试动画',
  images: {
    large: '',
    common: '',
    medium: 'https://lain.bgm.tv/pic/cover/m/00/00/12.jpg',
    small: '',
    grid: '',
  },
  info: '',
  metaTags: [],
  rating: { rank: 100, total: 10, count: [3], score: 8 },
  locked: false,
  nsfw: false,
  interest: { id: 1, rate: 8, type: CollectionType.Collect, comment: '', tags: [], updatedAt: 0 },
};

function mockListAPI(subjects: SlimSubject[], username = 'sai') {
  mockServer.use(
    http.get(`http://localhost:3000/p1/users/${username}/collections/subjects`, () =>
      HttpResponse.json({ data: subjects, total: subjects.length }),
    ),
  );
}

describe('CollectionList 单条快捷操作', () => {
  const renderList = async (username: string) => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <MemoryRouter initialEntries={[`/${username}/list/${username}`]}>
          <Suspense fallback={null}>{children}</Suspense>
        </MemoryRouter>
      </SWRConfig>
    );
    await act(async () => {
      render(
        <CollectionList
          username={username}
          subjectType={SubjectType.Anime}
          type={CollectionType.Collect}
        />,
        { wrapper },
      );
    });
  };

  it('自己的列表每项显示收藏状态选择', async () => {
    mockListAPI([collectedSubject]);
    await renderList('sai');

    expect(await screen.findByText('测试动画')).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('切换状态调用 updateSubjectCollection', async () => {
    let putBody: unknown = null;
    mockServer.use(
      http.put('http://localhost:3000/p1/collections/subjects/12', async ({ request }) => {
        putBody = await request.json();
        return HttpResponse.json({}, { status: 200 });
      }),
    );
    mockListAPI([collectedSubject]);
    await renderList('sai');

    const select = await screen.findByRole('combobox');
    await act(async () => {
      fireEvent.change(select, { target: { value: '3' } });
    });

    expect(putBody).toEqual({ type: 3 });
  });

  it('查看他人列表时不显示状态选择', async () => {
    mockListAPI([collectedSubject], 'chii');
    await renderList('chii');

    expect(await screen.findByText('测试动画')).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
});
