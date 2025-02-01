import type { RenderResult } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { server as mockServer } from '@bangumi/website/mocks/server';
import GroupPage from '@bangumi/website/pages/index/group/[name]';
import { renderPage } from '@bangumi/website/utils/test-utils';

import GroupHome from '../index/index';
import RecentTopics from './fixtures/recent-topics.json';
import Sandbox from './fixtures/sandbox.json';
import sandboxMembers from './fixtures/sandbox-members.json';
import sandboxModMember from './fixtures/sandbox-mod-member.json';

vi.mock('react-router-dom', async () => {
  return {
    __esModule: true,
    ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
    useParams: vi.fn(),
  } as unknown;
});

const mockedUseParams = vi.mocked(useParams);

class GroupHomeTest {
  page: RenderResult;

  constructor(name: string) {
    mockedUseParams.mockReturnValue({
      name,
    });

    mockServer.use(
      rest.get(`http://localhost:3000/p1/groups/${name}`, async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(Sandbox));
      }),
    );

    mockServer.use(
      rest.get(`http://localhost:3000/p1/groups/${name}/topics`, async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(RecentTopics));
      }),
    );

    mockServer.use(
      rest.get(`http://localhost:3000/p1/groups/${name}/members`, async (req, res, ctx) => {
        const isAdmin = req.url.searchParams.get('moderator') === 'true';
        return res(ctx.status(200), ctx.json(isAdmin ? sandboxModMember : sandboxMembers));
      }),
    );

    this.page = renderPage(
      <Routes>
        <Route element={<GroupPage />}>
          <Route index element={<GroupHome />} />
        </Route>
      </Routes>,
    );
  }

  async assertHeader(expectedHeader: string): Promise<void> {
    const { getByText } = this.page;

    await waitFor(() => {
      expect(getByText(expectedHeader)).toBeInTheDocument();
    });
  }

  async assertMembersExist(expectMembers: string[]): Promise<void> {
    const { getByText } = this.page;

    await waitFor(() => {
      expectMembers.forEach((member) => {
        expect(getByText(member)).toBeInTheDocument();
      });
    });
  }

  async assertTopicExist(expectTopic: {
    title: string;
    creator: string;
    replies: number;
    updatedAt: string;
  }): Promise<void> {
    const { getByText } = this.page;

    await waitFor(() => {
      expect(getByText(expectTopic.title)).toBeInTheDocument();
      expect(getByText(expectTopic.creator)).toBeInTheDocument();
      expect(getByText(expectTopic.replies)).toBeInTheDocument();
      expect(getByText(expectTopic.updatedAt)).toBeInTheDocument();
    });
  }
}

it('should match snapshot properly', async () => {
  const test = new GroupHomeTest('sandbox');

  await test.assertHeader('沙盒');
});

it('should list group members', async () => {
  const test = new GroupHomeTest('sandbox');

  await test.assertMembersExist(['维基 bot', 'bangumi大西王']);
});

it('should list recent topics', async () => {
  const test = new GroupHomeTest('sandbox');

  await test.assertTopicExist({
    title: 'tes',
    creator: 'bangumi大西王',
    replies: 2,
    updatedAt: '2022-9-4',
  });
});
