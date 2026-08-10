import type { RenderResult } from '@testing-library/react';
import { act, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React from 'react';
import { useParams } from 'react-router-dom';

import userFixture from '@bangumi/website/mocks/fixtures/p1/users/sai-GET.json';
import { server as mockServer } from '@bangumi/website/mocks/server';
import UserCollectionsPage from '@bangumi/website/pages/index/user/collections/[username]';
import { renderPage } from '@bangumi/website/utils/test-utils';

vi.mock('react-router-dom', async () => {
  return {
    __esModule: true,
    ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
    useParams: vi.fn(),
  } as unknown;
});

const mockedUseParams = vi.mocked(useParams);

class UserCollectionsTest {
  page!: RenderResult;

  async setup(username: string, status?: string): Promise<void> {
    mockedUseParams.mockReturnValue({ username, status });

    mockServer.use(
      http.get(`http://localhost:3000/p1/users/${username}`, () => {
        return HttpResponse.json(userFixture, { status: 200 });
      }),
    );

    await act(async () => {
      this.page = renderPage(<UserCollectionsPage subjectType='anime' />);
    });
  }

  static async create(username: string, status?: string): Promise<UserCollectionsTest> {
    const instance = new UserCollectionsTest();
    await instance.setup(username, status);
    return instance;
  }
}

describe('UserCollectionsPage', () => {
  it('should render header, type tabs and stats in overview mode', async () => {
    const test = await UserCollectionsTest.create('sai');

    expect(await test.page.findByText('Sai')).toBeInTheDocument();
    // 类型 tabs（类型 tab 与右栏统计 tab 文本相同，允许重复）
    for (const label of ['动画', '书籍', '音乐', '游戏', '三次元']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    // 右栏收藏统计
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('should render status groups with subjects in overview mode', async () => {
    const test = await UserCollectionsTest.create('sai');

    // 有数据的收藏状态（状态 tab 与分组标题文本相同，允许重复）
    for (const label of ['想看 (5)', '看过 (10)', '在看 (3)', '搁置 (1)', '抛弃 (1)']) {
      expect((await test.page.findAllByText(label)).length).toBeGreaterThan(0);
    }
    // 每个状态分组都渲染同一份 mock 条目
    expect(screen.getAllByText('测试动画').length).toBeGreaterThan(0);
    expect(screen.getAllByText('测试书籍').length).toBeGreaterThan(0);
  });

  it('should render a paginated list in status mode', async () => {
    const test = await UserCollectionsTest.create('sai', 'doing');

    expect(await test.page.findByText('测试动画')).toBeInTheDocument();
    expect(screen.getByText('测试书籍')).toBeInTheDocument();
    // 状态 tab 处于激活态
    expect(screen.getByText('在看 (3)')).toBeInTheDocument();
  });
});
