import type { RenderResult } from '@testing-library/react';
import { act, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import React from 'react';
import { useParams } from 'react-router-dom';

import userFixture from '@bangumi/website/mocks/fixtures/p1/users/sai-GET.json';
import { server as mockServer } from '@bangumi/website/mocks/server';
import UserHomePage from '@bangumi/website/pages/index/user/[username]';
import { renderPage } from '@bangumi/website/utils/test-utils';

vi.mock('react-router-dom', async () => {
  return {
    __esModule: true,
    ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
    useParams: vi.fn(),
  } as unknown;
});

const mockedUseParams = vi.mocked(useParams);

class UserHomeTest {
  page!: RenderResult;

  async setup(username: string, userData: object = userFixture): Promise<void> {
    mockedUseParams.mockReturnValue({ username });

    mockServer.use(
      http.get(`http://localhost:3000/p1/users/${username}`, () => {
        return HttpResponse.json(userData, { status: 200 });
      }),
    );

    await act(async () => {
      this.page = renderPage(<UserHomePage />);
    });
  }

  static async create(username: string, userData?: object): Promise<UserHomeTest> {
    const instance = new UserHomeTest();
    await instance.setup(username, userData);
    return instance;
  }
}

describe('UserHomePage', () => {
  it('should render user header and stats', async () => {
    const test = await UserHomeTest.create('sai');

    expect(await test.page.findByText('Sai')).toBeInTheDocument();
    expect(screen.getByText('@sai')).toBeInTheDocument();
    expect(screen.getByText('测试签名')).toBeInTheDocument();
    // 网络服务与 bio
    expect(screen.getByText('2010-01-01 加入')).toBeInTheDocument();
    expect(screen.getByText('测试简介')).toBeInTheDocument();
    // 收藏统计：动画类型 20 条收藏
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('should render subject collect blocks', async () => {
    const test = await UserHomeTest.create('sai');

    // 收藏统计块与收藏块标题中都会出现“动画”
    expect((await test.page.findAllByText('动画')).length).toBeGreaterThan(0);
    // 收藏块中的条目
    await waitFor(() => {
      expect(screen.getAllByText('测试动画').length).toBeGreaterThan(0);
    });
    expect(screen.getAllByText('测试书籍').length).toBeGreaterThan(0);
  });

  it('should render friend, group, index and blog blocks', async () => {
    const test = await UserHomeTest.create('sai');

    expect(await test.page.findByText('Sai的好友')).toBeInTheDocument();
    expect(screen.getByText('好友甲')).toBeInTheDocument();
    expect(screen.getByText('Sai参加的小组')).toBeInTheDocument();
    expect(screen.getByText('沙盒')).toBeInTheDocument();
    expect(screen.getByText('Sai的目录')).toBeInTheDocument();
    expect(screen.getByText('我的测试目录')).toBeInTheDocument();
    expect(screen.getByText('Sai的日志')).toBeInTheDocument();
    expect(screen.getByText('测试日志')).toBeInTheDocument();
  });

  it('should show not found page when user does not exist', async () => {
    mockedUseParams.mockReturnValue({ username: 'ghost' });

    mockServer.use(
      http.get('http://localhost:3000/p1/users/ghost', () => {
        return HttpResponse.json({ message: 'user not found' }, { status: 404 });
      }),
    );

    await act(async () => {
      renderPage(<UserHomePage />);
    });

    expect(await screen.findByText('User Not found')).toBeInTheDocument();
  });
});
