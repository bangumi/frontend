import React from 'react';
import GroupHome from '..';
import { RenderResult, waitFor } from '@testing-library/react';
import { server as mockServer } from '@bangumi/website/mocks/server';
import { rest } from 'msw';
import Boring from './fixtures/boring.json';
import RecentTopics from './fixtures/recent-topics.json';
import { Route, Routes, useParams } from 'react-router-dom';
import { GroupProfile, ResponseWithPagination, Topic } from '@bangumi/types/group';
import GroupPage from '@bangumi/website/pages/index/group/[name]';
import { renderPage } from '@bangumi/website/utils/test-utils';

jest.mock('react-router-dom', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
  };
});

const mockedUseParams = jest.mocked(useParams);

class GroupHomeTest {
  page: RenderResult;
  constructor(
    name: string,
    mock: { group?: GroupProfile; topics?: ResponseWithPagination<Topic[]> },
  ) {
    mockedUseParams.mockReturnValue({
      name,
    });

    mockServer.use(
      rest.get(`http://localhost/p/groups/${name}`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mock.group ?? Boring));
      }),
    );

    mockServer.use(
      rest.get(`http://localhost/p/groups/${name}/topics`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mock.topics ?? RecentTopics));
      }),
    );

    this.page = renderPage(
      <>
        <Routes>
          <Route element={<GroupPage />}>
            <Route index element={<GroupHome />} />
          </Route>
        </Routes>
        <GroupHome />
      </>,
    );
  }

  async assertHeader(expectedHeader: string): Promise<void> {
    const { getByText } = this.page;

    await waitFor(() => {
      expect(getByText(expectedHeader)).toBeInTheDocument();
    });
  }

  async assertTopicExist(expectTopic: {
    title: string;
    creator: string;
    replyCount: number;
    updatedAt: string;
  }): Promise<void> {
    const { getByText } = this.page;

    await waitFor(() => {
      expect(getByText(expectTopic.title)).toBeInTheDocument();
      expect(getByText(expectTopic.creator)).toBeInTheDocument();
      expect(getByText(expectTopic.replyCount)).toBeInTheDocument();
      expect(getByText(expectTopic.updatedAt)).toBeInTheDocument();
    });
  }
}

it('should match snapshot properly', async () => {
  const test = new GroupHomeTest('test', { group: Boring as GroupProfile });

  await test.assertHeader('靠谱人生茶话会');
});

it('should list recent topics', async () => {
  const test = new GroupHomeTest('test', {
    group: Boring as GroupProfile,
    topics: RecentTopics as ResponseWithPagination<Topic[]>,
  });

  await test.assertTopicExist({
    title: '看了4000本漫画，大家有什么想问的',
    creator: 'brad',
    replyCount: 40,
    updatedAt: '2022-7-24',
  });
});
